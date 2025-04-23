// src/exporters/PDFExporter.js
import DataExporter from './DataExporter';
import { jsPDF } from 'jspdf';

export default class PDFExporter extends DataExporter {
  formatData(data) {
    const doc = new jsPDF();
    doc.text(JSON.stringify(data, null, 2), 10, 10); // Format data as JSON text
    return doc; // Return the jsPDF document object
  }

  saveData(doc) {
    doc.save('data.pdf'); // Save the PDF document
  }
}
