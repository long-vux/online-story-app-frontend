import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

const ChapterManagement = ({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState('');
  const [stories, setStories] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState({
    story_id: '',
    chapter_number: '',
    title: '',
    content: '',
  });
  const [editingChapter, setEditingChapter] = useState(null);
  const [chapterToDelete, setChapterToDelete] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_URL}stories/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStories(response.data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchChapters = async (storyId) => {
    try {
      const url = `${API_URL}stories/${storyId}/chapters`;
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setChapters(response.data);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  useEffect(() => {
    fetchStories();
    console.log('selectedStory: ', selectedStory)
  }, [selectedStory]);

  const handleAddChapter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}chapters`,
        newChapter,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          data: {
            story_id: newChapter.story_id,
            title: newChapter.title, 
            content: newChapter.content,
            chapter_number: newChapter.chapter_number,
          }
        }
      );

      if (response.status === 201) {
        toast.success('Chapter added successfully');
        fetchChapters(selectedStory);
        setIsModalOpen(false);
        setNewChapter({ story_id: '', chapter_number: '', title: '', content: '' });
      }
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
  };

  const handleEditChapter = (chapter) => {
    setEditingChapter(chapter);
    setIsEditModalOpen(true);
  };

  const handleUpdateChapter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}chapters/${editingChapter._id}`,
        editingChapter,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Chapter updated successfully');
        fetchChapters(selectedStory);
        setIsEditModalOpen(false);
        setEditingChapter(null);
      }
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };

  const handleDeleteClick = (chapter) => {
    setChapterToDelete(chapter);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteChapter = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}chapters/${chapterToDelete._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Chapter deleted successfully');
        fetchChapters(selectedStory);
        setIsDeleteModalOpen(false);
        setChapterToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting chapter:', error);
      toast.error('Failed to delete chapter');
    }
  };

  return (
    <div className="p-6 pt-0 flex-1 relative">
      <h3 className="text-2xl font-semibold mb-4">Chapter Management</h3>

      {/* Dropdown chọn story */}
      <div className="mb-4">
        <select
          value={selectedStory}
          onChange={(e) => setSelectedStory(e.target.value)}
          onClick={() => fetchChapters(selectedStory)}
          className="w-full max-w-xs p-2 border rounded"
        >
          <option>Select story</option>
          {stories.map((story) => (
            <option key={story._id} value={story._id}>
              {story.title}
            </option>
          ))}
        </select>
      </div>

      {/* Bảng hiển thị chapter */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Story</th>
            <th className="p-2 border">Chapter Number</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Content</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter._id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">{chapter.story_id?.title}</td>
              <td className="p-2 border text-center">{chapter.chapter_number}</td>
              <td className="p-2 border text-center">{chapter.title}</td>
              <td className="p-2 border text-center max-w-xs truncate">{chapter.content}</td>

              <td className="p-2 border text-center">
                <button 
                  onClick={() => handleEditChapter(chapter)}
                  className="bg-blue-500 text-white px-2 py-2 rounded mr-2"
                >
                  <FiEdit />
                </button>
                <button 
                  onClick={() => handleDeleteClick(chapter)}
                  className="bg-red-500 text-white px-2 py-2 rounded"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút Thêm mới */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600"
      >
        +
      </button>

      {/* Modal Thêm mới */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Chapter</h3>
            <form onSubmit={handleAddChapter}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Story</label>
                <select
                  value={newChapter.story_id}
                  onChange={(e) => setNewChapter({ ...newChapter, story_id: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select story</option>
                  {stories.map((story) => (
                    <option key={story._id} value={story._id}>
                      {story.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Chapter Number</label>
                <input
                  type="number"
                  value={newChapter.chapter_number}
                  onChange={(e) => setNewChapter({ ...newChapter, chapter_number: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newChapter.title}
                  onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={newChapter.content}
                  onChange={(e) => setNewChapter({ ...newChapter, content: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && editingChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Chapter</h3>
            <form onSubmit={handleUpdateChapter}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Story</label>
                <select
                  value={editingChapter.story_id?._id || ''}
                  onChange={(e) => setEditingChapter({
                    ...editingChapter,
                    story_id: { ...editingChapter.story_id, _id: e.target.value }
                  })}
                  className="w-full p-2 border rounded"
                  required
                >
                  {stories.map((story) => (
                    <option key={story._id} value={story._id}>
                      {story.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Chapter Number</label>
                <input
                  type="number"
                  value={editingChapter.chapter_number}
                  onChange={(e) => setEditingChapter({ ...editingChapter, chapter_number: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editingChapter.title}
                  onChange={(e) => setEditingChapter({ ...editingChapter, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={editingChapter.content}
                  onChange={(e) => setEditingChapter({ ...editingChapter, content: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận xóa */}
      {isDeleteModalOpen && chapterToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure to delete<strong> chapter {chapterToDelete.chapter_number}: {chapterToDelete.title}</strong> ?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteChapter}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterManagement;