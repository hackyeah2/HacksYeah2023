from typing import Union
from fastapi import FastAPI
from logs.logs_wrapper import *
from models.question import question
from datetime import datetime

app = FastAPI()

@app.post("/")
def post_question(question:question):
    log(log=Log(timestamp=datetime.now(),userType='user',sessionId=question.sessionId,message=question.question))
    return {"Hello": "World"}
