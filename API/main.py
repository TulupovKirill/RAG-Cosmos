from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return 200


@app.get("/rag/get")
async def get_response():
    return 200