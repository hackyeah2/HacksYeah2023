import os
import pandas
from data.assets.asset import AssetType
from models.answer import Answer
from models.question import Question
import data.embedding as embedding


def answer(question: Question):
    type = AssetType.REAL_ESTATE

    related_resources = embedding.search(type, question.question)

    if len(related_resources) == 0:
        return Answer('No resources found', None, question.sessionId)

    top_resource = related_resources[0]

    top_resource_absolute_path = os.path.join(os.getcwd(), top_resource.source)
    data = pandas.read_csv(top_resource_absolute_path, delimiter=";")

    return Answer('Found resources:', data, question.sessionId)
