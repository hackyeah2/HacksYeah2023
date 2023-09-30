import os
from data.assets.resource import Resource

PATH = "API/static/resources/real_estate"


def fetch() -> [Resource]:
    absolute_path = os.path.join(os.getcwd(), PATH)
    files = os.listdir(absolute_path)
    return [Resource(name=file, source=PATH) for file in files]
