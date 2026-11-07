import fitz  # PyMuPDF
import sys
import os
import json

def analyze_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    results = {
        "filename": os.path.basename(pdf_path),
        "total_pages": total_pages,
        "pages": []
    }
    
    for i, page in enumerate(doc):
        text = page.get_text("text").strip()
        blocks = page.get_text("blocks")
        images = page.get_images(full=True)
        
        page_info = {
            "page_number": i + 1,
            "text": text,
            "image_count": len(images),
            "blocks": [b[4].strip() for b in blocks if len(b) > 4 and b[4].strip()]
        }
        results["pages"].append(page_info)
        
    return results

if __name__ == "__main__":
    if len(sys.argv) > 1:
        path = sys.argv[1]
        res = analyze_pdf(path)
        print(f"File: {res['filename']} ({res['total_pages']} pages)")
        for p in res["pages"][:5]:
            print(f"--- Page {p['page_number']} ({p['image_count']} images) ---")
            print(p['text'][:200])
