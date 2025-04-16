// dayNightStrategies.js

// Lớp trừu tượng cho chiến lược giao diện
class DayNightStrategies {
  applyTheme() {
    throw new Error("applyTheme must be implemented by subclass");
  }

  getContentClasses() {
    throw new Error("getContentClasses must be implemented by subclass");
  }
}

// Chiến lược: Ban ngày (Day Mode)
class DayModeStrategy extends DayNightStrategies {
  applyTheme() {
    document.body.className = "bg-gray-100 text-black"; // Theme sáng
  }

  getContentClasses() {
    return "bg-white text-black shadow-lg rounded-lg";
  }
}

// Chiến lược: Ban đêm (Night Mode)
class NightModeStrategy extends DayNightStrategies {
  applyTheme() {
    document.body.className = "bg-gray-900 text-white backdrop-blur-md"; // Theme tối, làm mờ background
  }

  getContentClasses() {
    return "bg-gray-800 text-white shadow-lg rounded-lg relative z-10"; // Nội dung chính không bị mờ
  }
}

export { DayModeStrategy, NightModeStrategy };