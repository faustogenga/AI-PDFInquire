# AI PDF Inquire Fullstack

## React Frontend with LLamaIndex Integration

This project demonstrates the integration of a React frontend with a backend server built with FastAPI. It includes features such as uploading PDF files, querying text from PDFs using AI, and managing chat interactions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Project Outline](#project-outline)
  - [Backend Specification](#backend-specification)
  - [Frontend Specification](#frontend-specification)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project consists of a React frontend application that communicates with a backend server implemented using FastAPI. The frontend allows users to upload PDF files, which are then processed by the backend to extract text content. Additionally, it features a chat interface where users can interact with a chatbot.

## Features

- Upload PDF files
- Extract text content from uploaded PDFs
- Chat interface with a chatbot
- Clear uploaded PDFs and chat messages

## Setup

### Frontend Setup

1. Clone this repository.
2. Navigate to the `react_frontend` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the `backend` directory.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

## Usage

- Access the React frontend at [http://localhost:3000](http://localhost:xxxx).
- Access the FastAPI backend at [http://localhost:8000](http://localhost:8000).
- Access the FastAPI docs at [http://localhost:8000/docs](http://localhost:8000/docs).

## File Structure

```
react_frontend/    # React frontend directory
  ├── public/       # Public assets and index.html
  ├── src/          # React source files
  └── ...

my_app/           # FastAPI backend directory
  ├── main.py      # FastAPI application
  └── ...
```

## Project Outline

### Backend Specification

#### FastAPI Endpoints
- **Upload PDF Endpoint**: An endpoint for uploading PDF documents.
- **Query Endpoint**: An endpoint for receiving questions and returning answers based on the uploaded PDFs.

#### PDF Processing
- **Text Extraction**: Extract text from uploaded PDFs using a suitable library
- **NLP Processing**: Use the LLamaIndex to process natural language questions and generate answers based on the PDF content.

#### Data Management
- **Metadata Storage**: Store information about uploaded documents (e.g., filename, upload date) in a database.

### Frontend Specification

#### User Interface
- **Upload PDF**: A page for uploading PDF documents.
- **Question Interface**: A feature for asking questions on uploaded documents and viewing answers.

#### Interactivity
- **Feedback Mechanisms**: Implement feedback mechanisms while uploading documents and processing questions.
- **Error Handling**: Display error messages for unsupported file types or processing errors.
- **Clear Chats**: Allows users to delete indexes and documents uploaded in the backend from the interface.