import os
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage
)
from dotenv import load_dotenv

load_dotenv()

PERSIST_DIR = "./storage"

# Load OpenAI API key from environment variables
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')

def index_documents(directory_path):
    documents = SimpleDirectoryReader(directory_path).load_data()
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=PERSIST_DIR)
    return index

def load_or_create_index():
    if not os.path.exists(PERSIST_DIR):
        os.makedirs(PERSIST_DIR)
        return index_documents("my_app/files")
    else:
        storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
        return load_index_from_storage(storage_context)

def query_pdf_text(query):
    index = load_or_create_index()
    query_engine = index.as_query_engine()
    response = query_engine.query(query)
    return response.response
