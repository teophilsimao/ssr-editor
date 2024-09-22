import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await axios.get('http://localhost:9000/');
            setDocuments(response.data);
        };

        fetchDocuments();
    }, []);

    return (
        <div>
            <h2>Documents</h2>
            <Link to="/document/new">Create New Document</Link>
            <ul>
                {documents.map((doc) => (
                    <li key={doc._id}>
                        <strong>{doc.title}</strong>
                        <Link to={`/document/${doc._id}/edit`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;