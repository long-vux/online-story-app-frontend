import IReadingStrategy from "./IReadingStrategy";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// Chiến lược: Lật trang (Page Flip)
class PageFlipStrategy extends IReadingStrategy {
    renderContent(pages, currentPage) {
      console.log('current flip page', currentPage)
      return (
        <div className="w-full h-[500px] bg-white shadow-lg rounded-lg p-6 overflow-hidden">
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
class ScrollStrategy extends IReadingStrategy {
  renderContent(pages) {
    return (
      <div className="w-full max-h-[600px] bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
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