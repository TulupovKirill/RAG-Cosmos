from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import requests
import re

app = FastAPI()
templates = Jinja2Templates(directory='../chat_Bot_practbca')
app.mount("/css", StaticFiles(directory="../chat_Bot_practbca/css"))
app.mount("/js", StaticFiles(directory="../chat_Bot_practbca/js"))
app.mount("/img", StaticFiles(directory="../chat_Bot_practbca/img"))
app.mount("/fonts", StaticFiles(directory="../chat_Bot_practbca/fonts"))

@app.get('/', response_class=HTMLResponse)
async def main(request: Request):
    return templates.TemplateResponse(request=request, name='index.html')


@app.get('/chat', response_class=HTMLResponse)
async def chat(request: Request):
    return templates.TemplateResponse(request=request, name='Chatbot.html')


@app.get('/help', response_class=HTMLResponse)
async def help(request: Request):
    return templates.TemplateResponse(request=request, name='Help.html')


@app.get('/system', response_class=HTMLResponse)
async def help(request: Request):
    return templates.TemplateResponse(request=request, name='spacesystem.html')

@app.get("/talk")
async def get_response(query: str):
    return requests.get('https://a781-34-169-62-112.ngrok-free.app/test_talk', params={"query": query}).json()["response"]
