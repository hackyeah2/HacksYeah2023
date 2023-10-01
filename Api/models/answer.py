import json
import os
from pandas import DataFrame
import pandas
from data.assets.resource import Resource


class Answer:
    def __init__(self, answer: str, source: Resource, sessionId: str):
        self.answer: str = answer
        self.source: Resource = source
        self.sessionId: str = sessionId
        self.data = self._get_data(source)

    def _get_data(self, source: Resource):
        if source is None:
            return None

        absolute_path = os.path.join(os.getcwd(), source.source)
        data = pandas.read_csv(absolute_path, delimiter=";")
        return json.loads(data.to_json(orient='columns'))
