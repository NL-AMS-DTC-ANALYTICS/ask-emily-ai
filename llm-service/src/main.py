# init the aiplatform package
import json
import os
import time
from typing import Dict, Tuple

import google.auth
import pytz
from google.cloud import aiplatform
from google.cloud.aiplatform import MatchingEngineIndex, MatchingEngineIndexEndpoint

AMSTERDAM_TZ = pytz.timezone("Europe/Amsterdam")
_, PROJECT_ID = google.auth.default()
PROJECT_ID = "lotte-development"
LOCATION: str = "europe-west1"

GOOGLE_APPLICATION_CREDENTIALS = os.getenv(
    "GOOGLE_APPLICATION_CREDENTIALS",
    "llm-service/src/services/lotte-development-6ac5ec1cc495.json",
)
BUCKET_NAME = "vertex-ai-vector-search-test"
BUCKET_URI = os.getenv("BUCKET_URI", f"gs://{BUCKET_NAME}-{PROJECT_ID}")
ENV: str = PROJECT_ID.split("-")[1]


DEPLOYED_INDEX_ID = f"{BUCKET_NAME}_deployed".replace("-", "_")

aiplatform.init(project=PROJECT_ID, location=LOCATION)


def log_time(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start} seconds")
        return result

    return wrapper


## the init part of vector search
### we need an index for mobile, app and b2b (basically dialogflow M, T and B2b)
@log_time
def create_index(bucket_name: str, bucket_uri: str = BUCKET_URI) -> MatchingEngineIndex:
    # create Index
    my_index = aiplatform.MatchingEngineIndex.create_tree_ah_index(
        display_name=bucket_name,
        contents_delta_uri=bucket_uri,
        dimensions=768,
        approximate_neighbors_count=10,
    )

    return my_index


@log_time
def create_endpoint(bucket_name: str = BUCKET_URI) -> MatchingEngineIndexEndpoint:
    ## create `IndexEndpoint`
    my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint.create(
        display_name=f"{bucket_name}-index-endpoint", public_endpoint_enabled=True
    )
    return my_index_endpoint


@log_time
def deploy_index(
    my_index: MatchingEngineIndex, my_index_endpoint: MatchingEngineIndexEndpoint
):
    # deploy the Index to the Index Endpoint
    my_index_endpoint.deploy_index(index=my_index, deployed_index_id=DEPLOYED_INDEX_ID)


def load_embeddings() -> Tuple[Dict[str, str], Dict[str, list]]:

    # build dicts for product names and embs
    product_names = {}
    product_embs = {}
    with open(
        "/home/enrico/repos/lotte-cloud-functions/llm-service/src/data/product-embs.json"
    ) as f:
        for l in f.readlines():
            p = json.loads(l)
            id = p["id"]
            product_names[id] = p["name"]
            product_embs[id] = p["embedding"]

    return product_names, product_embs


# def load_intents() -> Tuple[Dict[str, str], Dict[str, list]]:
#     res = json.loads(
#         "/home/enrico/repos/lotte-cloud-functions/llm-service/src/data/tps_izzi_mobiel.json"
#     )
#     return res


def run_query(
    my_index_endpoint: MatchingEngineIndexEndpoint,
    query_emb: list,
    product_names: Dict[str, str],
):
    # run query
    response = my_index_endpoint.find_neighbors(
        deployed_index_id=DEPLOYED_INDEX_ID, queries=[query_emb], num_neighbors=10
    )

    # show the results
    for idx, neighbor in enumerate(response[0]):
        print(f"{neighbor.distance:.2f} {product_names[neighbor.id]}")


def run_query_against_already_deployed_index() -> None:
    from google.cloud import aiplatform_v1

    # Set variables for the current deployed index.
    API_ENDPOINT = "1200364266.europe-west1-989457140251.vdb.vertexai.goog"
    INDEX_ENDPOINT = "projects/989457140251/locations/europe-west1/indexEndpoints/4188567555780116480"
    DEPLOYED_INDEX_ID = "vertex_ai_vector_search_test_deployed"

    # Configure Vector Search client
    client_options = {"api_endpoint": API_ENDPOINT}
    vector_search_client = aiplatform_v1.MatchServiceClient(
        client_options=client_options,
    )

    # Build FindNeighborsRequest object
    datapoint = aiplatform_v1.IndexDatapoint(feature_vector=query_emb)
    query = aiplatform_v1.FindNeighborsRequest.Query(
        datapoint=datapoint,
        # The number of nearest neighbors to be retrieved
        neighbor_count=10,
    )
    request = aiplatform_v1.FindNeighborsRequest(
        index_endpoint=INDEX_ENDPOINT,
        deployed_index_id=DEPLOYED_INDEX_ID,
        # Request can have multiple queries
        queries=[query],
        return_full_datapoint=False,
    )

    # Execute the request
    response = vector_search_client.find_neighbors(request)

    # Handle the response
    print(response)


from typing import List

from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel


def embed_text(
    texts: List[str] = ["banana muffins? ", "banana bread? banana muffins?"],
    task: str = "CLASSIFICATION",
    model_name: str = "textembedding-gecko-multilingual@001",
) -> List[List[float]]:
    """Embeds texts with a pre-trained, foundational model."""
    model = TextEmbeddingModel.from_pretrained(model_name)
    inputs = [TextEmbeddingInput(text, task) for text in texts]
    embeddings = model.get_embeddings(inputs)
    return [embedding.values for embedding in embeddings]


def intent_name_to_numeric_id(intent_name: str, max_id: int = 1000000) -> str:
    """
    Convert an intent_name to a numeric ID within the range [1, max_id].

    Args:
        intent_name (str): The intent name to convert.
        max_id (int): The maximum numeric ID to map to.

    Returns:
        int: The numeric ID corresponding to the intent_name.
    """
    # Calculate a hash value for the intent_name
    hash_value = hash(intent_name)

    # Convert the hash value to a positive number within the range [0, max_id)
    positive_hash = hash_value % max_id

    # Map the positive_hash to a numeric ID within the range [1, max_id]
    numeric_id = positive_hash + 1

    return str(numeric_id)


import hashlib


class IntentMapper:
    def __init__(self, seed=0):
        """
        Initialize IntentMapper with a specified seed for hash function.

        Args:
            seed (int): Seed value for hash function (default is 0).
        """
        self.seed = seed
        self.intent_map = {}
        self.next_id = 1

    def _get_hash(self, s):
        """
        Compute a deterministic hash value for the input string using a seeded hash function.

        Args:
            s (str): Input string to be hashed.

        Returns:
            int: Deterministic hash value based on the input string and seed.
        """
        # Concatenate the string with the seed and hash using SHA-256
        hash_obj = hashlib.sha256((s + str(self.seed)).encode())
        # Convert the hash digest to an integer
        return int.from_bytes(hash_obj.digest(), byteorder="big")

    def get_numeric_id(self, intent_name):
        """
        Retrieve the numeric ID associated with the given intent_name.
        If the intent_name is encountered for the first time, assign a new ID.
        """
        if intent_name not in self.intent_map:
            # Calculate a deterministic hash value for the intent_name
            hash_value = self._get_hash(intent_name)
            # Assign a new numeric ID based on the hash value
            self.intent_map[intent_name] = self.next_id
            self.next_id += 1

        # Return the numeric ID corresponding to the intent_name
        return self.intent_map[intent_name]


if __name__ == "__main__":
    # product_names, product_embs = load_embeddings()

    # # my_index = create_index(BUCKET_NAME)
    # # my_index_endpoint = create_endpoint(BUCKET_NAME)
    # # deploy_index(my_index, my_index_endpoint)
    # # index_enpoint = "projects/989457140251/locations/europe-west1/indexEndpoints/4188567555780116480"
    # # my_index = aiplatform.MatchingEngineIndexEndpoint(index_enpoint)
    # first_key = list(product_embs.keys())[0]
    # query_emb = product_embs[first_key]

    # run_query(my_index, query_emb, product_names)
    intents = [{"id": "M_BLOKKADE_SIM", "name": "simkaart afgesloten"}]
    # convert the id to a numeric one, univocally identifying the intent

    # Example usage:
    intent_mapper = IntentMapper(
        seed=123
    )  # Initialize IntentMapper with a specific seed

    # Retrieve numeric ID for a specific intent name
    # intent_name = "M_BLOKKADE_SIM"
    # numeric_id = intent_mapper.get_numeric_id(intent_name)

    # print(f"Numeric ID for '{intent_name}' is {numeric_id}")

    # Retrieve numeric ID for the same intent name again (should return the same ID)

    for intent in intents:
        intent["old_id"] = intent["id"]
        intent["id"] = intent_mapper.get_numeric_id(intent["name"])
    texts = [intent["name"] for intent in intents]
    intents = embed_text(texts)

    # {"id":"14474","name":"motherhood maternity: 3 pack maternity hipster panties","embedding":[
    print(intents)
