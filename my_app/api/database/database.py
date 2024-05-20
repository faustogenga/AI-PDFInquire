from api.models.pdf_model import SessionLocal
#get the database session
def get_db():
    # Create a new session
    db = SessionLocal()
    try:
        # Yield the session
        yield db
    finally:
        db.close()