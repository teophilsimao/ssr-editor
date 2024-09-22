import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocument = async () => {
            if (id) {
                const response = await axios.get(`http://localhost:9000/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            }
        };

        fetchDocument();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const docData = { title, content };

        if (id) {
            await axios.put(`http://localhost:9000/${id}`, docData);
        } else {
            await axios.post('http://localhost:9000/', docData);
        }
        navigate('/');
    };

    return (
        <div>
        <h2>{id ? 'Edit Document' : 'Create New Document'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">{id ? 'Update' : 'Create'}</button>
        </form>
      </div>
    );
};

export default DocumentForm;