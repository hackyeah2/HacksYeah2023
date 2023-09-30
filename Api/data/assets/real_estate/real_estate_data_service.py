import os
from data.assets.resource import Resource

PATH = "Api/static/resources/real_estate"


def fetch() -> [Resource]:
    absolute_path = os.path.join(os.getcwd(), PATH)
    files = os.listdir(absolute_path)
    return [Resource(name=file, source=os.path.join(PATH, file)) for file in files]
