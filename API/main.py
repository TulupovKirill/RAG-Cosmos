from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/rag/get")
async def get_response(query):
    response = requests.get("URL", params={"query": query})
    return response.json()
