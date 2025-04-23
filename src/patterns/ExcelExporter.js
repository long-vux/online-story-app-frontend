// src/exporters/ExcelExporter.js
import DataExporter from './DataExporter';
import * as XLSX from 'xlsx';

export default class ExcelExporter extends DataExporter {
  formatData(data) {
    const ws = XLSX.utils.json_to_sheet(data); // Convert JSON to Excel sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    return wb; // Return the workbook object
  }

  saveData(workbook) {
    XLSX.writeFile(workbook, 'data.xlsx'); // Save the workbook as an Excel file
  }
}
