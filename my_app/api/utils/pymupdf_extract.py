import pymupdf

def extract_text_from_pdf(filename):
    doc = pymupdf.open(f'my_app/files/{filename}')
    out = open(f'my_app/extracted_text/{filename}_TextExtracted.txt', "wb+")
    for page in doc:
        text = page.get_text().encode("utf8")
        out.write(text)
        out.write(bytes((12,)))
    out.close()
    return "Text extracted successfully!"