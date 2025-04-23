export default class DataExporter {
  export(data) {
    this.fetchData(); // Common step: Fetch data
    const formattedData = this.formatData(data); // Abstract step: Format data (implemented by subclasses)
    this.saveData(formattedData); // Abstract step: Save data (implemented by subclasses)
  }

  // Common step: Fetch data (can be overridden if needed)
  fetchData() {
    console.log('Fetching data...');
  }

  // Abstract step: Format data (must be implemented by subclasses)
  formatData(data) {
    throw new Error('Method "formatData" must be implemented');
  }

  // Abstract step: Save data (must be implemented by subclasses)
  saveData(formattedData) {
    throw new Error('Method "saveData" must be implemented');
  }
}
