import vertexai
from vertexai.preview.generative_models import GenerativeModel
class TokenMeasurer:
    """Class that measures the number of tokens in a string for Gemini."""
    @staticmethod
    def measureTokens(text: str) -> int:
        vertexai.init(project="qwiklabs-gcp-01-ec162502d964", location="us-central1")
        model = GenerativeModel("gemini-pro")
        return model.count_tokens(text).total_tokens