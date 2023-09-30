from pydantic import BaseModel


class Question(BaseModel):
    question: str
    sessionId: str
