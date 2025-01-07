# test/python/llm_service_test.py

import pytest
from unittest.mock import patch

from app.services.llm_service import LLMService
# Mockando a resposta da API do Hugging Face
@patch('src.services.llm_service.requests.post')
def test_summarize(mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {"summary": "Texto resumido mockado"}

    llm_service = LLMService()
    text = "Texto de exemplo para teste."
    summary = llm_service.summarize_text(text) # type: ignore

    assert summary == "Texto resumido mockado"
