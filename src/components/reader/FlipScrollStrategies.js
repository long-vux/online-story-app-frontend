const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// Lớp trừu tượng cho chiến lược đọc
class ReadingStrategy {
  renderContent(pages, currentPage, themeClasses) {
    throw new Error("renderContent must be implemented by subclass");
  }

  handleNavigation(direction, setCurrentPage, totalPages) {
    throw new Error("handleNavigation must be implemented by subclass");
  }
}

// Chiến lược: Lật trang (Page Flip)
class PageFlipStrategy extends ReadingStrategy {
    renderContent(pages, currentPage, contentClasses) {
      console.log('current flip page', currentPage)
      return (
        <div className={`w-full h-[500px] bg-white shadow-lg rounded-lg p-6 overflow-hidden ${contentClasses}`}>
          <img
            src={`${ROOT_URL}${pages[currentPage]?.image_url}`}
            alt={`Page ${currentPage + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }
  
    handleNavigation(direction, setCurrentPage, totalPages) {
      setCurrentPage((prev) => {
        if (direction === "next" && prev < totalPages - 1) return prev + 1;
        if (direction === "prev" && prev > 0) return prev - 1;
        return prev;
      });
    }
  }

// Chiến lược: Cuộn trang (Scroll)
class ScrollStrategy extends ReadingStrategy {
  renderContent(pages, contentClasses) {
    return (
      <div className={`w-full max-h-[600px] shadow-lg rounded-lg p-6 overflow-y-auto ${contentClasses}`}>
        {pages.map((page, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <img
              src={`${ROOT_URL}${page?.image_url}`}
              alt={`Page ${index + 1}`}
              className="w-full max-h-[400px] object-contain"
            />
          </div>
        ))}
      </div>
    );
  }

  handleNavigation(direction) {
    // Cuộn lên/xuống
    if (direction === "next") {
      window.scrollBy({ top: window.innerHeight / 2, behavior: "smooth" });
    } else if (direction === "prev") {
      window.scrollBy({ top: -window.innerHeight / 2, behavior: "smooth" });
    }
  }
}

export { PageFlipStrategy, ScrollStrategy };