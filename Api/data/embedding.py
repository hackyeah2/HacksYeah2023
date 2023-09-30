import os
import chromadb
import dotenv
from langchain.schema import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Milvus
from langchain.schema import Document
from langchain.retrievers.self_query.base import SelfQueryRetriever

from data.assets.asset import AssetType
from data.assets.resource import Resource

dotenv.load_dotenv()

ZILLIZ_CLOUD_URI = os.getenv("ZILLIZ_CLOUD_URI")
ZILLIZ_CLOUD_API_KEY = os.getenv("ZILLIZ_CLOUD_API_KEY")


persistent_client = chromadb.PersistentClient()
embeddings = OpenAIEmbeddings()


def generate(type: AssetType, resources: [Resource]):
    documents = [Document(page_content=resource.name, metadata={"source": resource.source, "type": type.value})
                 for resource in resources]

    Milvus.from_documents(
        documents,
        embeddings,
        connection_args={
            "uri": ZILLIZ_CLOUD_URI,
            "token": ZILLIZ_CLOUD_API_KEY,
            "secure": True,
        }
    )


def search(type: AssetType, query: str):
    store = Milvus(
        embeddings,
        connection_args={
            "uri": ZILLIZ_CLOUD_URI,
            "token": ZILLIZ_CLOUD_API_KEY,
            "secure": True,
        }
    )

    founds = store.similarity_search(
        query,
        filter={"type": type.value},
    )

    return [Resource(document.page_content, source=document.metadata["source"]) for document in founds]
