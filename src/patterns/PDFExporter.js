// src/exporters/PDFExporter.js
import DataExporter from './DataExporter';
import { jsPDF } from 'jspdf';

export default class PDFExporter extends DataExporter {
  formatData(data) {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height; // Get page height
    const lineHeight = 10; // Approximate height of one line of text
    const margin = 10; // Margin from the top and bottom
    let y = margin; // Start position for text

    data.forEach((item, index) => {
      const text = JSON.stringify(item, null, 2); // Format data as JSON text
      const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 2 * margin); // Split text into lines

      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage(); // Add a new page if the current page is full
          y = margin; // Reset y position for the new page
        }
        doc.text(line, margin, y);
        y += lineHeight; // Move y position for the next line
      });

      if (index < data.length - 1) {
        y += lineHeight; // Add spacing between items
      }
    });

    return doc; // Return the jsPDF document object
  }

  saveData(doc) {
    doc.save('data.pdf'); // Save the PDF document
  }
}
