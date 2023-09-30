from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Milvus
from typing import Dict
from typing import List
from langchain.docstore.document import Document

# uri and token are required for connecting to the Milvus server
uri = ""
token = ""

def create_embedding_from_text(text_to_embed: str, metadata: Dict[str, str]):
    splitter = CharacterTextSplitter(chunk_size = 512, chunk_overlap = 0)
    embeddings = HuggingFaceEmbeddings()

    texts = splitter.split_text(text_to_embed)
    metadata_list = [metadata]

    vector_db = Milvus.from_texts(
        texts,
        embeddings,
        metadatas = metadata_list,
        connection_args={
            "uri": uri,
            "token": token, 
            "secure": True,
        },
        collection_name = "sample_collection"
    )

def search_for_document(question: str) -> List[Document]:
    embeddings = HuggingFaceEmbeddings()

    vector_db = Milvus(
        embeddings,
        connection_args={
            "uri": uri,
            "token": token, 
            "secure": True,
        },
        collection_name = "test_stats_pl"
    )

    documents = vector_db.similarity_search(query=question, k = 3)

    return documents

#run create_embedding method created above with samle text and metadata
if __name__ == "__main__":
    docs = search_for_document("Raport pracujący")
    print(docs)
    # text = "This is a sample text"
    # metadata = {"sample": "samplemetadata"}
    # create_embedding_from_text(text, metadata)

        