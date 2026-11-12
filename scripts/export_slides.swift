import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
if args.count < 3 {
    print("Usage: swift export_slides.swift <pdf_path> <output_dir>")
    exit(1)
}

let pdfPath = args[1]
let outputDir = args[2]

let fileManager = FileManager.default
try? fileManager.createDirectory(atPath: outputDir, withIntermediateDirectories: true, attributes: nil)

guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else {
    print("Failed to open PDF at \(pdfPath)")
    exit(1)
}

let count = doc.pageCount
print("Exporting \(count) pages from \(pdfPath) to \(outputDir)...")

for i in 0..<count {
    guard let page = doc.page(at: i) else { continue }
    let pageNum = i + 1
    let bounds = page.bounds(for: .mediaBox)
    let scale: CGFloat = 1.2
    let targetSize = NSSize(width: bounds.width * scale, height: bounds.height * scale)
    
    let image = NSImage(size: targetSize)
    image.lockFocus()
    guard let ctx = NSGraphicsContext.current?.cgContext else {
        image.unlockFocus()
        continue
    }
    
    ctx.setFillColor(NSColor.white.cgColor)
    ctx.fill(CGRect(origin: .zero, size: targetSize))
    ctx.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: ctx)
    image.unlockFocus()
    
    if let tiff = image.tiffRepresentation,
       let rep = NSBitmapImageRep(data: tiff),
       let jpg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.82]) {
        let destPath = "\(outputDir)/page-\(pageNum).jpg"
        try? jpg.write(to: URL(fileURLWithPath: destPath))
    }
}

print("Done exporting \(count) pages.")
