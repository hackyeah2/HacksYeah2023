from models.question import Question
from langchain.llms import OpenAI
from langchain.prompts.few_shot import FewShotPromptTemplate
from langchain.prompts.prompt import PromptTemplate
import re


examples = [
    {
        "question": "`",
        "answer": "false"
    },
    {
        "question": "Jak ugotować sernik?",
        "answer": "false"
    },
    {
        "question": "Czy warto zainwestować w nieruchomości?",
        "answer": "false"
    },
    {
        "question": "Ile mieszkań zostało kupionych?",
        "answer": "true"
    },
    {
        "question": "Wygeneruj wykres słupkowy",
        "answer": "true"
    }
]

requirements = """Czy pytanie jest skupione na danych o tematyce
ekonomicznej, finansowej, gospodarczej nawiązującej do wykorzystanych danych
otwartych i pojęć z nimi związanych, zwłaszcza w zakresie mieszkalnictwa i nieruchomości,
oraz nie wprowadza kontekstu doradczego?"""

violation_error_message = """Przepraszam, ale nie mogę odpowiedzieć na to pytanie.

Wyłączenie odpowiedzialności
Wszelkie informacje uzyskane za pomocą chatbota Financzeska służą jedynie celom
informacyjnym i nie mogą być traktowane jako porada prawna w konkretnej sprawie.
Jeżeli chcesz uzyskać wiążącą informację w indywidualnej sprawie skontaktuj się z Krajową
Informacją Skarbową
Ministerstwo finansów nie ponosi odpowiedzialności za żadne ze stwierdzeń zawartych
w chatbocie Financzeska.
"""


def check_for_violation(question: Question) -> (bool, str):
    template = PromptTemplate(input_variables=[
        "question", "answer"], template=requirements + "\nQuestion: {question}\n{answer}")

    prompt = FewShotPromptTemplate(
        examples=examples,
        example_prompt=template,
        suffix=requirements + "\nQuestion: {input}",
        input_variables=["input"]
    ).format(input=question.question)

    llm = OpenAI(temperature=0)
    response = llm.predict(prompt)

    if re.search(r'true', response, re.IGNORECASE):
        return True, None

    return False, violation_error_message
