from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.llm_service import LLMService

app = FastAPI()
llm_service = LLMService()

class SummarizeRequest(BaseModel):
    text: str
    lang: str

@app.get("/")
async def root():
    return {"message": "API is running"}

@app.post("/summarize")
async def summarize(request: SummarizeRequest):
    try:
        result = await llm_service.summarize_text(request.text, request.lang)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
