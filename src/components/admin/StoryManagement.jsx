import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';

const StoryManagement = ({ token }) => {
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Để phân biệt giữa thêm và chỉnh sửa
  const [currentStoryId, setCurrentStoryId] = useState(null); // Lưu ID của story đang chỉnh sửa
  const [newStory, setNewStory] = useState({
    title: '',
    description: '',
    author: '',
    genre: '',
    thumbnailFile: null,
    status: 'ongoing', 
    number_of_chapters: 0,
  });

  const genreList = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Detective' },
    { id: 4, name: 'Horror' }
  ]

  const API_URL = process.env.REACT_APP_API_URL;

  // Lấy danh sách stories và genres khi component mount
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_URL}stories/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200)
        setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleAddStory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newStory).forEach(([key, value]) => {
        if (key !== 'thumbnailFile') {
          formData.append(key, value);
        }
      });
      if (newStory.thumbnailFile) {
        formData.append('thumbnail', newStory.thumbnailFile);
      }
  
      const response = await axios.post(`${API_URL}stories`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 201) {
        toast.success('Story added successfully');
        fetchStories();
        setIsModalOpen(false);
        
        setNewStory({ title: '', description: '', author: '', status: 'ongoing', genre: '', thumbnailFile: null, number_of_chapters: 0 });
      } else {
        toast.error('Failed to add story');
      }
    } catch (error) {
      console.error('Error adding story:', error);
      toast.error('Error adding story');
    }
  };
  

  const handleEditStory = (story) => {
    setIsEditMode(true);
    setCurrentStoryId(story._id);
    setNewStory({
      title: story.title,
      description: story.description,
      author: story.author,
      status: story.status,
      genre: story.genre,
      thumbnailFile: null,
      number_of_chapters: story.number_of_chapters
    });
    setIsModalOpen(true);
  };

  const handleUpdateStory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}stories/${currentStoryId}`, newStory, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success('Story updated successfully');
        fetchStories(); // Làm mới danh sách stories
        setIsModalOpen(false);
        setIsEditMode(false);
        setNewStory({ title: '', description: '', author: '', status: 'ongoing', genre: '', number_of_chapters: 0 });
      } else {
        toast.error('Failed to update story');
      }
    } catch (error) {
      console.error('Error updating story:', error);
      toast.error('Error updating story');
    }
  };

  const handleDeleteStory = async (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        const response = await axios.delete(`${API_URL}stories/${storyId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          toast.success('Story deleted successfully');
          fetchStories(); // Làm mới danh sách stories
        } else {
          toast.error('Failed to delete story');
        }
      } catch (error) {
        console.error('Error deleting story:', error);
        toast.error('Error deleting story');
      }
    }
  };

  return (
    <div className="p-6 pt-0 flex-1 relative">
      <h3 className="text-2xl font-semibold mb-4">Story Management</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Authors</th>
            <th className="p-2 border">Genre</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Number of chapters</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story._id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">{story.title}</td>
              <td className="p-2 border text-center">{story.author}</td>
              <td className="p-2 border text-center">{story.genre}</td>
              <td className="p-2 border text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${story.status === 'ongoing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'}
                    `}
                >
                  {story.status}
                </span>
              </td>
              <td className="p-2 border text-center">{story.number_of_chapters || 0}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleEditStory(story)}
                  className="bg-blue-500 text-white px-2 py-2 rounded mr-2"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDeleteStory(story._id)}
                  className="bg-red-500 text-white px-2 py-2 rounded"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút Thêm mới ở góc phải dưới */}
      <button
        onClick={() => {
          setIsEditMode(false);
          setNewStory({ title: '', description: '', author: '', status: 'ongoing', genre: '', thumbnailFile: null, number_of_chapters: 0 });
          setIsModalOpen(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 ">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Edit Story' : 'Add New Story'}
            </h3>
            <form onSubmit={isEditMode ? handleUpdateStory : handleAddStory}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newStory.description}
                  onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  type="text"
                  value={newStory.author}
                  onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Genre</label>
                <select
                  value={newStory.genre}
                  onChange={(e) => setNewStory({ ...newStory, genre: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a genre</option>
                  {genreList.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Number of chapters</label>
                <input
                  type="number"
                  value={newStory.number_of_chapters}
                  onChange={(e) => setNewStory({ ...newStory, number_of_chapters: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newStory.status}
                  onChange={(e) => setNewStory({ ...newStory, status: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {!isEditMode && <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewStory({ ...newStory, thumbnailFile: e.target.files[0] })
                  }                  
                  className="w-full p-2 border rounded"
                />
              </div>}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {isEditMode ? 'Update' : 'Add'}
                </button>
              </div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryManagement;