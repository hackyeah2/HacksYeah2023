from models.question import Question
from langchain.prompts import PromptTemplate
from langchain.prompts.few_shot import FewShotPromptTemplate
from langchain.llms import OpenAI

examples = [
    {
        "input": "Jak kreują się ceny mieszkań w Polsce?",
        "question": "Ceny mieszkań w Polsce",
    },
    {
        "input": "Ile wynosi średnia cena mieszkań w Polsce?",
        "question": "Średnia cena mieszkań w Polsce",
    },
    {
        "input": "Ile mieszkań zostało kupionych we wrocławiu w 2021?",
        "question": "Liczba mieszkań kupionych we wrocławiu w 2021",
    }
]


def reformat(question: Question):
    task = "Na podstawie podanego wejścia, przekształć je w zapytanie o odpowiednie dane do otwartego zasobu danych. Korzystaj z języka polskiego."
    template = PromptTemplate(input_variables=[
        "input", "question"], template=task + "\nPytanie: {input}\n{question}")

    prompt = FewShotPromptTemplate(
        examples=examples,
        example_prompt=template,
        suffix=task + "\nPytanie: {input}",
        input_variables=["input"]
    ).format(input=question.question)

    llm = OpenAI(temperature=0)
    return llm.predict(prompt.format(question=question.question))
