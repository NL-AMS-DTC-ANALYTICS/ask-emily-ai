class ChatMessage:
    def __init__(self, message: str, user: str):
        self.message = message
        self.user = user # can be "user" or "system"

    @staticmethod
    def fromJson(json: dict):
        message = json["message"]
        user = json["user"]
        return ChatMessage(
            message=message,
            user=user
        )