from fastapi import FastAPI
from ..hermes import talk_with_hermes

app = FastAPI()

@app.get("/rag/get")
async def get_response(query):
    response = talk_with_hermes(query)
    return response
