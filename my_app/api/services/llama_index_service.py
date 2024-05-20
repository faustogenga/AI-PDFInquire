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
        index = index_documents("my_app/files")
        if index:
            return index
        else: 
            return None
    else:
        print("Loading index from storage.")
        documents = SimpleDirectoryReader(PERSIST_DIR).load_data()
        if not documents:
            print("No documents found in the document store.")
            return None
        storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
        return load_index_from_storage(storage_context)

def query_pdf_text(query):
    index_documents = os.listdir(PERSIST_DIR)
    files = os.listdir("my_app/files")
    if(len(index_documents) == 0 or len(files) == 0):
        return "Please add a PDF File to start querying."
    else: 
        index = load_or_create_index()
        query_engine = index.as_query_engine()
        response = query_engine.query(query)
        return response.response

def clear_files_directory():
    try:
        directory = "my_app/files"
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
        for filename in os.listdir(PERSIST_DIR):
            file_path = os.path.join(PERSIST_DIR, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
        return {"message": "All files deleted successfully."}
    except Exception as e:
        return {"error": f"Error deleting files: {e}"}
