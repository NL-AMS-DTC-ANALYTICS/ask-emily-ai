from model.ChatMessage import ChatMessage
from prompts.MainPrompt import MainPrompt
from services.LLMService import LLMService
from services.TokenMeasurer import TokenMeasurer

from langchain.chains import LLMChain
import functools
import logging


class PromptingService:
    """Class that constructs the prompt"""
    def __init__(self):
        self.model = LLMService()

    def prompt(self, chatMessages: list[ChatMessage]) -> str:
        prompt = chatMessages[-1].message
        logging.info(f"Prompting LLM with prompt: {prompt}")

        # Assemble prompt
        NUM_TOKENS = 2600
        conversation_history = self._getConversationHistory(chatMessages, NUM_TOKENS)
        chain = LLMChain(llm=self.model.getModel(), prompt=MainPrompt)

        # 4. Get response from LLMService
        logging.info(f"LLM prompt: {MainPrompt.format_prompt(conversation_history=conversation_history)}")
        response = chain.run(conversation_history=conversation_history)
        logging.info(f"LLM response: {response}")
        return response
    
    def _getConversationHistory(self, chatMessages: list[ChatMessage], nTokens: int) -> str:
        """Get the conversation history from the chat messages, limited by a number of tokens"""
        # 1. Get chat messages that fit in nTokens
        messages_to_include = []
        tokens = 0
        reversed_chatMessages = chatMessages[::-1]
        for chatMessage in reversed_chatMessages:
            tokens += TokenMeasurer.measureTokens(chatMessage.message)
            if tokens > nTokens:
                break
            messages_to_include.append(chatMessage)
        messages_to_include.reverse()

        # 2. Concatenate messages into chat log
        conversation_history = functools.reduce(lambda a, b: a + "\n" + f"{b.user}: {b.message}", messages_to_include, "")
        return conversation_history