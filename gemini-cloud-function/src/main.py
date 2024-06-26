
from flask import jsonify
import functions_framework


from markupsafe import escape

from dto.GenerationRequestDto import GenerationRequestDto
from dto.GenerationResponseDto import GenerationResponseDto
from services.PromptingService import PromptingService

@functions_framework.http
def listen(request) -> str:
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    if request.method == "OPTIONS":
    # Allows GET requests from any origin with the Content-Type
    # header and caches preflight response for an 3600s
        headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "3600",
    }

        return ("", 204, headers)

    request_json = request.get_json(silent=True)
    
    body = GenerationRequestDto.fromJson(request_json)

    promptingService = PromptingService()
    responseLLM = promptingService.prompt(body.chatMessages, body.language, body.medicalKnowledge)
    response = GenerationResponseDto(responseLLM).toJson()

    # add headers for CORS
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    return (jsonify(response), 200, headers)

    

