from data.assets.asset import AssetType
from models.answer import Answer
from models.question import Question
import data.embedding as embedding


def answer(question: Question):
    type = AssetType.REAL_ESTATE

    related_resources = embedding.search(type, question.question)

    return Answer('Found resources:', related_resources, question.sessionId)
