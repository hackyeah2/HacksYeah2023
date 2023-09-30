from data.assets.resource import Resource


class Answer:
    def __init__(self, answer: str, resourses: [Resource], sessionId: str):
        self.answer: str = answer
        self.resourses: [Resource] = resourses
        self.sessionId: str = sessionId
