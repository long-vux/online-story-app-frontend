import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiPlus, FiUpload } from "react-icons/fi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;
const ROOT_URL = process.env.REACT_APP_ROOT_URL;
const PageManagement = ({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [stories, setStories] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState({
    chapter_id: '',
    images: [],
  });
  const [editingPage, setEditingPage] = useState(null);
  const [pageToDelete, setPageToDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Fetch all stories
  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_URL}stories/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  // Fetch chapters by story ID
  const fetchChapters = async (storyId) => {
    if (!storyId) return;
    try {
      const response = await axios.get(`${API_URL}stories/${storyId}/chapters`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setChapters(response.data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  // Fetch pages by chapter ID
  const fetchPages = async (chapterId) => {
    if (!chapterId) return;
    try {
      const response = await axios.get(`${API_URL}chapter-image/${chapterId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPages(response.data.images);
        console.log('Fetched Pages:', pages);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Failed to fetch pages');
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewPage({ ...newPage, images: files });
  };

  // Handle edit file change
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setEditingPage({ ...editingPage, image: file });
  };

  // Add new page with images
  const handleAddPage = async (e) => {
    e.preventDefault();
    if (!newPage.chapter_id || newPage.images.length === 0) {
      toast.error('Please fill all fields and upload at least one image');
      return;
    }

    const formData = new FormData();
    formData.append('chapter_id', newPage.chapter_id);
    console.log('New Page Data:', newPage); // Log the newPage data t
    newPage.images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      setUploading(true);
      const response = await axios.post(`${API_URL}chapter-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success('Page added successfully');
        fetchPages(selectedChapter);
        setIsModalOpen(false);
        setNewPage({ chapter_id: '', images: [] });
      }
    } catch (error) {
      console.error('Error adding page:', error);
      toast.error('Failed to add page');
    } finally {
      setUploading(false);
    }
  };

  // Update page
  const handleUpdatePage = async (e) => {
    e.preventDefault();
    if (!editingPage.chapter_id) {
      toast.error('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('chapter_id', editingPage.chapter_id);
    formData.append('image', editingPage.image);

    try {
      setUploading(true);
      const response = await axios.put(
        `${API_URL}chapter-image/${editingPage._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Page updated successfully');
        fetchPages(selectedChapter);
        setIsEditModalOpen(false);
        setEditingPage(null);
      }
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error('Failed to update page');
    } finally {
      setUploading(false);
    }
  };

  // Delete page
  const handleDeletePage = async () => {
    try {
      const response = await axios.delete(`${API_URL}chapter-image/${pageToDelete._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Page deleted successfully');
        fetchPages(selectedChapter);
        setIsDeleteModalOpen(false);
        setPageToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Failed to delete page');
    }
  };

  // Initialize data
  useEffect(() => {
    fetchStories();
  }, []);

  // Fetch chapters when story changes
  useEffect(() => {
    fetchChapters(selectedStory);
    setSelectedChapter('');
    setPages([]);
  }, [selectedStory]);

  // Fetch pages when chapter changes
  useEffect(() => {
    fetchPages(selectedChapter);
  }, [selectedChapter]);

  return (
    <div className="p-6 pt-0 flex-1 relative">
      <h3 className="text-2xl font-semibold mb-4">Page Management</h3>

      {/* Story and Chapter selection */}
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Story</label>
          <select
            value={selectedStory}
            onChange={(e) => setSelectedStory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select story</option>
            {stories.map((story) => (
              <option key={story._id} value={story._id}>
                {story.title}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Chapter</label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!selectedStory}
          >
            <option value="">Select chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                {chapter.chapter_number}: {chapter.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pages table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Page Number</th>
            <th className="p-2 border">Images</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.length > 0 ? pages?.map((page) => (

            <tr key={page._id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">{page.image_order}</td>
              <td className="p-2 border text-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  <img
                    src={`${ROOT_URL}${page.image_url}`}
                    className="h-16 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setPreviewUrl(`${ROOT_URL}${page.image_url}`)}
                  />
                </div>

                {previewUrl && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                      <img src={previewUrl} alt="Preview" className="max-h-[80vh] max-w-[90vw]" />
                      <button onClick={() => setPreviewUrl(null)} className="mt-4 text-red-500 font-bold">Close</button>
                    </div>
                  </div>
                )}
              </td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => {
                    setEditingPage({
                      ...page,
                      images: [] // Reset images for edit
                    });
                    setIsEditModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-2 rounded mr-2"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => {
                    setPageToDelete(page);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-2 py-2 rounded"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          )) : <tr>No pages found</tr>}
        </tbody>
      </table>

      {/* Add button */}
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={!selectedChapter}
        className={`fixed bottom-6 right-6 text-white p-4 rounded-full hover:bg-blue-600 ${!selectedChapter ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
      >
        <FiPlus />
      </button>

      {/* Add Page Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Page</h3>
            <form onSubmit={handleAddPage}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Chapter</label>
                <select
                  value={newPage.chapter_id}
                  onChange={(e) => setNewPage({ ...newPage, chapter_id: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select chapter</option>
                  {chapters.map((chapter) => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.chapter_number}: {chapter.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Images</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        {newPage.images.length > 0
                          ? `${newPage.images.length} file(s) selected`
                          : 'Upload one or multiple images'}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                {newPage.images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newPage.images.map((file, index) => (
                      <div key={index} className="text-xs bg-gray-100 p-1 rounded">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Page Modal */}
      {isEditModalOpen && editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Page</h3>
            <form onSubmit={handleUpdatePage}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Chapter</label>
                <select
                  value={editingPage.chapter_id?._id || ''}
                  onChange={(e) => setEditingPage({
                    ...editingPage,
                    chapter_id: { ...editingPage.chapter_id, _id: e.target.value }
                  })}
                  className="w-full p-2 border rounded"
                  required
                >
                  {chapters.map((chapter) => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.chapter_number}: {chapter.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Current Images</label>
                <div className="flex flex-wrap gap-2">
                  <img
                    src={`${ROOT_URL}${editingPage.image_url}`}
                    alt={`Page ${editingPage.image_order}`}
                    className="h-16 object-cover rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Add New Images (Optional)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        {editingPage.images && editingPage.images.some(img => img instanceof File)
                          ? 'New files selected'
                          : 'Upload new images to replace existing ones'}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleEditFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                  disabled={uploading}
                >
                  {uploading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && pageToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure to delete page {pageToDelete.image_order} from chapter {pageToDelete.chapter_id?.chapter_number}?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePage}
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

export default PageManagement;