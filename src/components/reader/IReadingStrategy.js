// Định nghĩa interface cho các chiến lược đọc
class IReadingStrategy {
  // Phương thức trừu tượng (phải được triển khai bởi lớp con)
  renderContent(content, currentPage) {
    throw new Error("renderContent must be implemented by subclass");
  }

  // Phương thức trừu tượng cho điều hướng
  handleNavigation(direction, setCurrentPage, totalPages) {
    throw new Error("handleNavigation must be implemented by subclass");
  }
}

export default IReadingStrategy;