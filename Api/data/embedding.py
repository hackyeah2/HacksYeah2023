import os
import chromadb
import dotenv
from langchain.schema import Document
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.schema import Document

from data.assets.asset import AssetType
from data.assets.resource import Resource

dotenv.load_dotenv()

persistent_client = chromadb.PersistentClient()
embeddings = HuggingFaceEmbeddings()

db = Chroma(embedding_function=embeddings, client=persistent_client)


def generate(type: AssetType, resources: [Resource]):
    documents = [Document(page_content=resource.name, metadata={"source": resource.source, "type": type.value})
                 for resource in resources]

    db.from_documents(
        documents,
        embeddings,
        client=persistent_client,
    )


def search(type: AssetType, query: str):
    founds = db.similarity_search(
        query,
        filter={"type": type.value},
        timeout=30,
        verbose=True
    )

    return [Resource(document.page_content, source=document.metadata["source"]) for document in founds]


def clear():
    persistent_client.reset()
