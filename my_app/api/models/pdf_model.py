from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///my_app/PDFDataBase.db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class PDFDocument(Base):
    __tablename__ = 'PDF_DETAILS'
    id = Column(Integer, primary_key=True, autoincrement=True)
    file_name = Column(String, nullable=False, unique=True)
    upload_date = Column(String, nullable=False)