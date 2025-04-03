import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ReadingProgressContext = createContext();

export const useReadingProgress = () => useContext(ReadingProgressContext);

export const ReadingProgressProvider = ({ children }) => {
  const userId = "user123";  // Tạm thời đặt cứng (có thể thay bằng dữ liệu từ Auth)
  const bookId = "book456";
  const [progress, setProgress] = useState({ chapter: 1, page: 1 });

  // Lấy tiến trình đọc khi mở app
  useEffect(() => {
    axios.get(`http://localhost:3000/api/progress/${userId}/${bookId}`)
      .then((res) => setProgress(res.data))
      .catch(() => setProgress({ chapter: 1, page: 1 }));
  }, []);

  // Hàm cập nhật tiến trình đọc
  const updateProgress = (chapter, page) => {
    setProgress({ chapter, page });

    // Gửi tiến trình lên server
    axios.post("http://localhost:3000/api/progress", { userId, bookId, chapter, page })
      .catch(err => console.error("Error updating progress:", err));
  };

  return (
    <ReadingProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ReadingProgressContext.Provider>
  );
};
