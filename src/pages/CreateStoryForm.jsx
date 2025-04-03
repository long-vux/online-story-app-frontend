import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoryFactory from '../utils/StoryFactory';

const CreateStoryForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    category_id: '',
    number_of_chapters: 0,
    latest_chapter: 0,
    status: 'ongoing',
    type: 'Action', // Mặc định là Action
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Lấy danh sách categories từ API (giả sử có endpoint /categories)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Tạo story object bằng Factory
      const story = StoryFactory.createStory(formData.type, formData);
      
      // Gửi request POST đến API
      const response = await axios.post(
        'http://localhost:5000/api/stories',
        story.toJSON(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Token từ localStorage
          },
        }
      );

      setSuccess('Story created successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        author: '',
        category_id: '',
        number_of_chapters: 0,
        latest_chapter: 0,
        status: 'ongoing',
        type: 'Action',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create story');
    }
  };

  return (
    <div className="container">
      <h2>Create New Story</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Story Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Action">Action</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Detective">Detective</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Story
        </button>
      </form>
    </div>
  );
};

export default CreateStoryForm;