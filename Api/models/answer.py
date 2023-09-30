import json
from pandas import DataFrame
from data.assets.resource import Resource


class Answer:
    def __init__(self, answer: str, data: DataFrame, sessionId: str):
        self.answer: str = answer
        self.data: any = json.loads(data.to_json(orient="columns"))
        self.sessionId: str = sessionId
