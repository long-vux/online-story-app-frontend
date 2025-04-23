// src/exporters/CSVExporter.js
import DataExporter from './DataExporter';
import Papa from 'papaparse';

export default class CSVExporter extends DataExporter {
  formatData(data) {
    return Papa.unparse(data); // Convert JSON to CSV string
  }

  saveData(csv) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv'; // Set the file name
    link.click(); // Trigger the download
  }
}
