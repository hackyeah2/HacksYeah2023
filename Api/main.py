import uvicorn
from fastapi import FastAPI
from logs.logs_wrapper import *
from models.question import Question
from datetime import datetime
import chat.qa as qa

app = FastAPI()


@app.post("/")
def post_question(question: Question):
    log(Log(timestamp=datetime.now(),
            userType='user',
            sessionId=question.sessionId,
            message=question.question))

    return qa.answer(question)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
