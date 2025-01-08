import os
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
from googletrans import Translator
from dotenv import load_dotenv

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
            lang (str): The language code for summarization output (e.g., 'en', 'fr', 'es').

        Returns:
            dict: A dictionary with the summary in the requested language.
        """
        # Translate the text to the requested language (optional if text is already in the desired language)
        translated_text = await self.translate_text(text, lang)

        # Use a LangChain prompt to customize the summarization
        prompt_template = PromptTemplate(
            template=(
                "Provide a concise summary of the following text in {lang}:\n\n"
                "{text}\n\n"
                "Summary:"
            )
        )
        prompt = prompt_template.format(lang=lang, text=text)

        # Generate the summary using the OpenAI model
        summary = self.llm.invoke(prompt)

        # Return the result in JSON format
        return {
            "summary": summary.strip(),
            "translated_text": translated_text
        }
