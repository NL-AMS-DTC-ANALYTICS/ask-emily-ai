#%%
import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, FinishReason
import vertexai.preview.generative_models as generative_models

# Extract conversation context from context.json file in data field
def generate(user_msg: str):
    vertexai.init(project="qwiklabs-gcp-01-ec162502d964", location="us-central1")
    model = GenerativeModel("gemini-1.0-pro-002")
    responses = model.generate_content(
        [f"""The system is a chatbot named Emily that answers questions from the user. The user is a parent that asks questions about their child. The system will answer this. The system is provided with the doctor-patient transcript. Formulate the response based on the medical knowledge, basic, and language, Dutch. The system checks if there is enough information in the transcript related to the question. If not, the system asks the user to try again. 
         ### Context ### 

        ## Doctor-Patient Transcript## 

        Doctor	 “I want to thank you for your trust in us during this challenging time. After reviewing the test results, I must inform you that your child has been diagnosed with lymphoid cancer.” 

        Parent	 “Lymphoid cancer? Can you explain what that is?” 

        Doctor	 “Certainly. Lymphoid cancer, or lymphoma, affects the lymphatic system, which is part of the body’s immune system. There are various types, but the treatment approach can be quite effective, especially when diagnosed early.” 

        Parent	 “What does the treatment involve?” 

        Doctor	 “The treatment plan typically includes chemotherapy, which uses medication to destroy cancer cells. Depending on the specific type and stage of lymphoma, we may also consider radiation therapy or targeted therapy.” 

        Parent	 “How long will the treatment last?” 

        Doctor	 “The duration of treatment can vary. It usually consists of multiple cycles spread over several months. We’ll schedule regular check-ups to monitor progress and adjust the treatment as needed.” 

        Parent	 “Will there be side effects?” 

        Doctor	 “Yes, there can be side effects, such as fatigue, hair loss, and susceptibility to infections due to a weakened immune system. Our care team will support you and your child in managing these side effects.” 

        Parent	 “Is the treatment painful?” 

        Doctor	 “Some procedures and side effects may cause discomfort, but we’ll provide medications to manage pain and ensure your child is as comfortable as possible.” 

        Parent	 “What are the chances of recovery?” 

        Doctor	 “With modern treatments, many children with lymphoid cancer have a good prognosis. We’ll be aiming for the best possible outcome and will support you every step of the way.” 

        Parent	 “Thank you, Doctor. It’s overwhelming, but I’m relieved to know there’s a plan and support.” 

        Doctor	 “We’re here for you and your child. Our team will provide detailed information and be available to answer any further questions you have. Let’s schedule a follow-up appointment to discuss the next steps.” 
        
        ## User Question ##
        Answer the following user question: {user_msg} """],

        generation_config=generation_config,
        safety_settings=safety_settings,
        stream=True,
    )
    print(responses)
    # Build a list of responses
    response_list = []
    for response in responses:
        response_list.append(response.text)
        print(response.text, end="")
    
    return response_list


generation_config = {
    "max_output_tokens": 2048,
    "temperature": 1,
    "top_p": 1,
}

safety_settings = {
    generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
}

response = generate(user_msg="What is Lymphoid cancer?")
response
