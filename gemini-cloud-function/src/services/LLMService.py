import os
from langchain_google_vertexai import ChatVertexAI

class LLMService:
    """Class that manages the LLM and generates responses to chat messages."""
    def __init__(self):
        self.model = self._initModel()

    def _initModel(self) -> ChatVertexAI:
        """Initializes the Gemini model."""
        if "GOOGLE_APPLICATION_CREDENTIALS" not in os.environ:
            raise ValueError("GOOGLE_APPLICATION_CREDENTIALS not found in environment variables.")
        
        return ChatVertexAI(model="gemini-pro", location="us-central1", max_output_tokens=1000)
    
    def getResponse(self, text: str) -> str:
        return self.model(text)
    
    def getModel(self) -> ChatVertexAI:
        return self.model