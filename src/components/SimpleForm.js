import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '../database/firebase';

const SimpleForm = () => {
  const [formData, setFormData] = useState({ fullName: '' });
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCollection = await getDocs(collection(db, 'formData'));
        setDataList(dataCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      // Update existing document
      try {
        const docRef = doc(db, 'formData', formData.id);
        await updateDoc(docRef, { fullName: formData.fullName });
        setDataList(dataList.map(item => item.id === formData.id ? { ...item, fullName: formData.fullName } : item));
      } catch (error) {
        console.error('Error updating document:', error);
      }
    } else {
      // Add new document
      try {
        const docRef = await addDoc(collection(db, 'formData'), formData);
        setDataList([...dataList, { ...formData, id: docRef.id }]);
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }

    setFormData({ fullName: '' }); // Clear the form
  };

  const handleEdit = (data) => {
    setFormData(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'formData', id));
      setDataList(dataList.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: '20px' }}>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
          {formData.id ? 'Update' : 'Add'}
        </Button>
      </form>

      <ul>
        {dataList.map((data, index) => (
          <li key={index}>
            {data.fullName} 
            <Button onClick={() => handleEdit(data)}>Edit</Button>
            <Button onClick={() => handleDelete(data.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleForm;
