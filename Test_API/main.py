from fastapi import FastAPI
import requests
import re

app = FastAPI()

@app.get("test_talk")
async def get_response(query: str):
    return {"query": "Ваш запрос: " + query}
