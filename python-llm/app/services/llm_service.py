import os
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
from googletrans import Translator
from dotenv import load_dotenv
import uuid

load_dotenv()  # Load environment variables from a .env file

class LLMService:
    """
    LLMService is a class that provides translation and text summarization services using 
    the HuggingFace API (OpenAI) and Google Translate.
    """

    def __init__(self):
        """
        Initializes the LLMService class by setting up the HuggingFace LLM model and the Google Translator.
        """
        self.llm = OpenAI(
            temperature=0.7,
            top_p=0.7,
            api_key=os.getenv("HF_TOKEN"),  # type: ignore
            base_url="https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1",
        )
        self.translator = Translator()

    async def translate_text(self, text: str, lang: str) -> str:
        """
        Translates the given text into the specified language using the Google Translate API.
        """
        translated = await self.translator.translate(text, dest=lang)
        return translated.text

    async def summarize_text(self, text: str, lang: str) -> dict:
        """
        Summarizes the given text in the specified language using LangChain prompts and returns it in JSON format.

        Args:
            text (str): The text to be summarized.
            lang (str): The language code for translation and summarization (e.g., 'en', 'fr', 'es').

        Returns:
            dict: A dictionary with the summary and metadata in the requested language.
        """
        # Generate a unique ID for the task
        task_id = str(uuid.uuid4())

        # Translate the text to the requested language
        translated_text = await self.translate_text(text, lang)

        # Use a LangChain prompt to customize the summarization
        prompt_template = PromptTemplate(
            template=(
                "Summarize the following text in {lang} in no more than 20 words, "
                "keeping it clear and concise:\n\n{text}\n\nSummary:"
            )
        )
        prompt = prompt_template.format(lang=lang, text=translated_text)

        # Generate the summary using the OpenAI model
        summary = self.llm.invoke(prompt)

        # Ensure the summary is concise by taking the first 20 words, if needed
        summary_concise = " ".join(summary.split()[:20]).strip()

        # Return the result in JSON format
        return {
            "id": task_id,
            "text": text,
            "summary": summary_concise,
            "lang": summary_concise  
        }
