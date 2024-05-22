from fastapi import FastAPI
from api.routes.routes import router
from fastapi.middleware.cors import CORSMiddleware

# Create a new FastAPI instance
app = FastAPI()

# Define the origins that should be allowed to make requests to the API
origins = [
    "http://localhost:5173", 
    "https://aipdfinquire.netlify.app" # Your frontend local development URL from Vite
    # Add more origins as needed
]

# Add the CORS middleware to the FastAPI instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes from the router
app.include_router(router)

# Define the main function to run the FastAPI application for HOSTING IN KEYOBE
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")