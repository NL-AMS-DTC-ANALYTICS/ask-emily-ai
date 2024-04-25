from langchain.prompts.prompt import PromptTemplate

template = """
### Instruction ###

### Chat Log ###
{conversation_history}
system:
"""

MainPrompt = PromptTemplate.from_template(template)