import sys
from dotenv import load_dotenv

load_dotenv()
sys.path = sys.path + ["./app"]

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.llm_service import LLMService
from googletrans import Translator  

app = FastAPI()
llm_service = LLMService()
translator = Translator()

class TextData(BaseModel):
    """
    TextData is a Pydantic model that defines the structure for the input data to be received in the 
    '/summarize' API endpoint.
    
    Attributes:
        text (str): The text that needs to be summarized and translated.
        lang (str): The target language to which the text will be translated.
    """
    text: str
    lang: str  # The language code for translation (e.g., 'pt' for Portuguese, 'en' for English)

@app.post("/summarize")
async def summarize(data: TextData):
    """
    Summarizes the given text and translates it into the specified language.
    
    This API endpoint first validates the target language, then translates the text into the specified 
    language using Google Translate and generates a summary of the original text using the LLM service.
    
    Args:
        data (TextData): The input data containing the text to summarize and the target language for translation.
        
    Returns:
        dict: A dictionary containing the following keys:
            - 'summary': The summary of the original text generated by the LLM service.
            - 'translated_text': The translated text in the specified language.
            
    Raises:
        HTTPException: If the provided language is not supported (i.e., not 'pt', 'en', or 'es'), a 400 error is raised.
        
    Example:
        Request:
        {
            "text": "This is a sample text.",
            "lang": "es"
        }
        
        Response:
        {
            "summary": "Summary of the text...",
            "translated_text": "Este es un texto de ejemplo."
        }
    """
    text = data.text
    lang = data.lang.lower()

    # Language validation
    if lang not in ['pt', 'en', 'es']:
        raise HTTPException(status_code=400, detail="Language not supported")

    # Translate the text
    translated = await translator.translate(text, dest=lang)
    translated_text = translated.text

    # Generate the summary of the original text
    summary = await llm_service.summarize_text(text, lang)

    return {
        "summary": summary,
        "translated_text": translated_text
    }

@app.get("/")
async def root():
    """
    Root endpoint to check if the API is running.
    
    Returns:
        dict: A dictionary containing a message indicating that the API is running.
        
    Example:
        Response:
        {
            "message": "API is running"
        }
    """
    return {"message": "API is running"}
