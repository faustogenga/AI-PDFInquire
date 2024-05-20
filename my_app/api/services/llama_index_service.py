import os
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage
)
# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Define the directory to store the index
PERSIST_DIR = "./storage"

# Load OpenAI API key from environment variables
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')

# Define the function to index the documents
def index_documents(directory_path):
    # Load the documents
    documents = SimpleDirectoryReader(directory_path).load_data()
    # Check if documents are loaded
    index = VectorStoreIndex.from_documents(documents)
    # Persist the index
    index.storage_context.persist(persist_dir=PERSIST_DIR)
    return index

# Define the function to load or create the index
def load_or_create_index():
    # Check if the storage directory exists
    if not os.path.exists(PERSIST_DIR):
        os.makedirs(PERSIST_DIR)
        # Index the documents
        index = index_documents("my_app/files")
        if index:
            return index
        else: 
            return None
    else:
        # Load the documents
        documents = SimpleDirectoryReader(PERSIST_DIR).load_data()
        if not documents:
            return None
        # Load the index
        storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
        return load_index_from_storage(storage_context)

# Define the function to query the indexed PDFs
def query_pdf_text(query):
    # Check if the index is empty
    index_documents = os.listdir(PERSIST_DIR)
    # Check if the files directory is empty
    files = os.listdir("my_app/files")
    # Check if there are no documents or files
    if(len(index_documents) == 0 or len(files) == 0):
        return "Please add a PDF File to start querying."
    else: 
        # Query the indexed PDFs
        index = load_or_create_index()
        query_engine = index.as_query_engine()
        # Query the engine
        response = query_engine.query(query)
        return response.response

# Define the function to clear the files directory
def clear_files_directory():
    try:
        # Clear the files directory
        directory = "my_app/files"
        for filename in os.listdir(directory):
            # Check if the file is a file
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                # Remove the file
                os.remove(file_path)
        # Return the response
        # Clear the storage directory
        for filename in os.listdir(PERSIST_DIR):
            # Check if the file is a file
            file_path = os.path.join(PERSIST_DIR, filename)
            if os.path.isfile(file_path):
                # Remove the file
                os.remove(file_path)
        return {"message": "All files deleted successfully."}
    except Exception as e:
        return {"error": f"Error deleting files: {e}"}
