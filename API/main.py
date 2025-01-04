from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/rag/get")
async def get_response(query):
    response = requests.get("https://3065-35-230-38-63.ngrok-free.app", params={"query": query})
    return response.json()
