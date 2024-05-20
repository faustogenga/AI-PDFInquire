import pymupdf

# Define a function to extract text from a PDF file
def extract_text_from_pdf(filename):
    # Open the PDF file
    doc = pymupdf.open(f'my_app/files/{filename}')
    # Extract the text from the PDF file
    out = open(f'my_app/extracted_text/{filename}_TextExtracted.txt', "wb+")
    # Loop through the pages
    for page in doc:
        text = page.get_text().encode("utf8")
        out.write(text)
    # Close the PDF file
        out.write(bytes((12,)))
    out.close()
    return "Text extracted successfully!"