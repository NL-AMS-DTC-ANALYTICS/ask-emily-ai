class GenerationResponseDto:
    def __init__(self, responseText: str):
        self.responseText = responseText

    def toJson(self) -> dict:
        return {
            "responseText": self.responseText
        }