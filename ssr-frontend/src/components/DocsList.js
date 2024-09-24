import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const DocumentList = () => {
    const [documents, setDocs] = useState([]);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await axios.get('http://localhost:9000/');
                setDocs(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocs();
    }, []);

    const deleteDoc = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/${id}`);
            setDocs(documents.filter(doc => doc._id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    return (
        <div>
            <h2>Documents</h2>
            <Link to="/document/new">Create New Document</Link>
            <ul>
                {documents.map((doc) => (
                    <li key={doc._id}>
                        {/* <strong>{doc.title}</strong> */}
                        <Link to={`/document/${doc._id}/edit`}>{doc.title}</Link>
                        <button onClick={() => deleteDoc(doc._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;