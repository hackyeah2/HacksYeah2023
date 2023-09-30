import os
import pandas
from data.assets.resource import Resource
from data.assets.asset import AssetType
from models.answer import Answer
from models.question import Question
import data.embedding as embedding


def answer(question: Question):
    type = AssetType.REAL_ESTATE

    related_resources = embedding.search(type, question.question)
    top_resource = get_top_resource(question, related_resources)

    if top_resource is None:
        return Answer('No resources found', None, question.sessionId)

    top_resource_absolute_path = os.path.join(os.getcwd(), top_resource.source)
    data = pandas.read_csv(top_resource_absolute_path, delimiter=";")

    return Answer('Found resources:', data, question.sessionId)


def get_top_resource(question: Question, resources: [Resource]):
    if len(resources) == 0:
        return None

    top_resource = resources[0]
    return top_resource
