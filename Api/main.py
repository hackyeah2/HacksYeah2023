from fastapi.concurrency import asynccontextmanager
import uvicorn
from fastapi import FastAPI
from seed import dispose, seed
from logs.logs_wrapper import *
from models.question import Question
from datetime import datetime
import chat.qa as qa


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed()
    yield
    dispose()

app = FastAPI(lifespan=lifespan)


@app.post("/")
def post_question(question: Question):
    result = qa.answer(question)
    
    log(Log(timestamp=datetime.now(),
            userType='user',
            sessionId=question.sessionId,
            message=question.question,response = result))
    
    return result



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
