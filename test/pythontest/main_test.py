# test/python/main_test.py

from fastapi.testclient import TestClient
from  app.main import app 

client = TestClient(app)

def test_summarize():
    response = client.post("/summarize", json={"text": "Texto de teste para sumarizar."})
    assert response.status_code == 200
    assert response.json() == "OK"
