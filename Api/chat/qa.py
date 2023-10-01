import os
from data.assets.resource import Resource
from data.assets.asset import AssetType
from models.answer import Answer
from models.question import Question
import data.embedding as embedding
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_types import AgentType
from langchain.agents import create_csv_agent


def answer(question: Question):
    type = AssetType.REAL_ESTATE

    related_resources = embedding.search(type, question.question)
    top_resource = get_top_resource(question, related_resources)

    if top_resource is None:
        return Answer('No resources found', None, question.sessionId)

    answer = answer_question_based_on_resource(question, top_resource)

    return Answer(answer, top_resource, question.sessionId)


def get_top_resource(question: Question, resources: [Resource]):
    if len(resources) == 0:
        return None

    top_resource = resources[0]
    return top_resource


def answer_question_based_on_resource(question: Question, resource: Resource):
    resource_absolute_path = os.path.join(os.getcwd(), resource.source)

    agent = create_csv_agent(
        ChatOpenAI(temperature=0),
        resource_absolute_path,
        verbose=True,
        agent_type=AgentType.OPENAI_FUNCTIONS,
        pandas_kwargs={'delimiter': ';'}
    )

    return agent.run(question.question)
