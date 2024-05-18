from llama_index_service import index_documents, query_pdf_text
from fastapi import APIRouter, File, HTTPException, UploadFile, Depends
import os
import shutil
from datetime import datetime

from sqlalchemy.orm import Session

from database import get_db
from models import PDFDocument
from pymupdf_extract import extract_text_from_pdf


router = APIRouter()

import pymupdf

@router.get("/")
async def root():
    return {"Hello Fausto": "World"}

@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        file_location = f"my_app/files/{file.filename}"
        if os.path.exists(file_location):
            raise HTTPException(status_code=400, detail="File already exists")
        
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)

        extract_text_from_pdf(file.filename)
        new_document = PDFDocument(file_name=file.filename, upload_date=str(datetime.utcnow()))
        db.add(new_document)
        db.commit()
        db.refresh(new_document)
        index_documents("my_app/files")
        return {"status": "success", "message": "File uploaded and indexed successfully"}
    
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Define a route to query the indexed PDFs
@router.post("/query/")
async def query_pdf(query: str):
    try:
        response = query_pdf_text(query)
        return {"status": "success", "response": response}
    except Exception as e:
        return {"status": "error", "message": str(e)}