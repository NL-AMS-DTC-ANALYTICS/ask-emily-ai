from model.ChatMessage import ChatMessage


class GenerationRequestDto:
    def __init__(self, chatMessages: list[ChatMessage], medicalKnowledge: str, language: str):
        self.chatMessages = chatMessages
        self.medicalKnowledge = medicalKnowledge
        self.language = language

    @staticmethod
    def fromJson(json: dict):
        chatMessages = []
        for chatMessage in json["chatMessages"]:
            chatMessages.append(ChatMessage.fromJson(chatMessage))
        
        return GenerationRequestDto(
            chatMessages=chatMessages,
            medicalKnowledge=json["medicalKnowledge"],
            language=json["language"]
        )