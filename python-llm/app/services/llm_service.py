import os
from langchain_openai import OpenAI
from googletrans import Translator
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from a.env file

class LLMService:
    """
    LLMService is a class that provides translation and text summarization services using 
    the HuggingFace API (OpenAI) and Google Translate.

    This service allows you to:
    - Translate text into a specified language using Google Translate.
    - Generate a summary of text using the OpenAI model via HuggingFace API.
    """

    def __init__(self):
        """
        Initializes the LLMService class by setting up the HuggingFace LLM model and the Google Translator.
        
        The HuggingFace LLM model is configured with the following parameters:
        - temperature: Controls the randomness of the response (0.5).
        - top_p: Controls the cumulative probability for token sampling (0.7).
        
        The HuggingFace API key is retrieved from the environment variable `HF_TOKEN`. 
        The base URL for the HuggingFace model is configured to the specific endpoint for Qwen2.5-72B-Instruct model.
        Additionally, the Google Translator service is initialized without requiring any specific credentials.
        """
        self.llm = OpenAI(
            temperature=0.5,
            top_p=0.7,
            api_key=os.getenv("HF_TOKEN"),  # type: ignore
            base_url="https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1",
        )
        self.translator = Translator()

    async def translate_text(self, text: str, lang: str) -> str:
        """
        Translates the given text into the specified language using the Google Translate API.
        
        This method sends the text to the Google Translate API and retrieves the translated version in the 
        specified target language.

        Args:
            text (str): The text to be translated.
            lang (str): The language code to translate the text to (e.g., 'en' for English, 'fr' for French).
        
        Returns:
            str: The translated text in the specified language.
            
        Example:
            translated_text = await llm_service.translate_text("Hello, world!", "es")
            print(translated_text)  # Outputs: "¡Hola, mundo!"
        """
        translated = await self.translator.translate(text, dest=lang)
        return translated.text

    async def summarize_text(self, text: str, lang: str) -> dict:
        """
        Translates the given text into the specified language and generates a summary of the text using the LLM model.
        
        The process involves two main steps:
        1. Translate the provided text into the target language using the Google Translate API.
        2. Summarize the original text using the HuggingFace LLM model.

        Args:
            text (str): The text to be summarized and translated.
            lang (str): The language code to translate the text to (e.g., 'en' for English, 'fr' for French).
        
        Returns:
            dict: A dictionary containing two keys:
                - 'summary': The summary generated by the LLM model for the original text.
                - 'translated_text': The translated version of the original text in the specified language.
        
        Example:
            result = await llm_service.summarize_text("This is a test sentence.", "fr")
            print(result["summary"])  # Outputs a summary of the original text.
            print(result["translated_text"])  # Outputs the translated text in French.
        """
        translated_text = await self.translate_text(text, lang)

        prompt = f"Summarize the following text: {text}"
        
        response = self.llm.invoke(prompt)

        return {
            "summary": response,
            "translated_text": translated_text
        }
