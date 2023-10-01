import os
from chat.violtation import check_for_violation
from data.assets.resource import Resource
from data.assets.asset import AssetType
from models.answer import Answer
from models.question import Question
import data.embedding as embedding
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_types import AgentType
from langchain.agents import create_csv_agent
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

def answer(question: Question):
    type = AssetType.REAL_ESTATE

    is_valid, violation_message = check_for_violation(question)
    if not is_valid:
        return Answer(violation_message, None, question.sessionId)

    related_resources = embedding.search(type, question.question)

    top_resource = get_top_resource(question, related_resources)

    if top_resource is None:
        return Answer('No resources found', None, question.sessionId)

    answer = answer_question_based_on_resource(question, top_resource)

    return Answer(answer, top_resource, question.sessionId)


def get_top_resource(question: Question, resources: [Resource]):
    if len(resources) == 0:
        return None

    # template = """Recources: {resources}

    # Answer: Rank recources prior to question"""

    # prompt = PromptTemplate(template=template, input_variables=["resources"])

    # llm = OpenAI()
    
    # llm_chain = LLMChain(prompt=prompt, llm=llm)

    # resources_rank = ' '.join(resources)

    # for i in range(len(resources)):
    #     resources_rank += f"{i}." +  resources[i].source + "\n"

    # text = llm_chain.run(resources_rank)

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
