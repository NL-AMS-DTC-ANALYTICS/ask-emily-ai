
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
    request_json = request.get_json(silent=True)
    
    body = GenerationRequestDto.fromJson(request_json)

    promptingService = PromptingService()
    responseLLM = promptingService.prompt(body.chatMessages)

    response = GenerationResponseDto(responseLLM)

    return jsonify(response.toJson())

    

