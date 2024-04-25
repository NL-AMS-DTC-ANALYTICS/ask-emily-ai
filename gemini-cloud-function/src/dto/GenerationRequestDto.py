from model.ChatMessage import ChatMessage


class GenerationRequestDto:
    def __init__(self, chatMessages: list[ChatMessage]):
        self.chatMessages = chatMessages

    @staticmethod
    def fromJson(json: dict):
        chatMessages = []
        for chatMessage in json["chatMessages"]:
            chatMessages.append(ChatMessage.fromJson(chatMessage))
        return GenerationRequestDto(
            chatMessages=chatMessages
        )