from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL
DATABASE_URL = "sqlite:///my_app/PDFDataBase.db"
# Create a new database engine
engine = create_engine(DATABASE_URL)
# Create a new session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Create a new base class
Base = declarative_base()

# Define the PDFDocument class
class PDFDocument(Base):
    __tablename__ = 'PDF_DETAILS'
    id = Column(Integer, primary_key=True, autoincrement=True)
    file_name = Column(String, nullable=False, unique=True)
    upload_date = Column(String, nullable=False)