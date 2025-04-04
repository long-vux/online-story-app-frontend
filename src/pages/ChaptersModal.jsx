import React from "react";
import messageIcon from "../assets/message.svg";
import downloadIcon from "../assets/download.svg";
import eyeicon from "../assets/eye.svg";

const ChaptersModal = ({ onClose }) => {
  const chapters = [
    { number: 1012 },
    { number: 1011 },
    { number: 1010 },
    { number: 1009 },
    { number: 1008 },
    { number: 1007 },
    { number: 1006 },
    { number: 1005 },
    { number: 1004 },
    { number: 1003 },
    { number: 1002 },
    { number: 1001 },
    { number: 1000 },
    { number: 999 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] border-2 border-[#1f1f1f] rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Chapters</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {chapters.map((chapter, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center bg-white p-4 rounded shadow-sm"
            >
              <div className="text-lg font-bold text-[#1f1f1f]">
                Chapter {chapter.number}
              </div>
              <div className="flex gap-4">
                <img src={messageIcon} alt="Message" className="w-6 h-6" />
                <img src={downloadIcon} alt="Download" className="w-6 h-6" />
                <img src={eyeicon} alt="View" className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChaptersModal;