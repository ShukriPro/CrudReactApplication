// App.js
import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from './database/firebase';
import DataTable from './components/DataTable';
import CreateEntryForm from './components/CreateEntryForm';
import { Box } from '@mui/material';

const App = () => {
  const [data, setData] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  const handleNewEntry = async (entry) => {
    if (entry.id) {
      await updateDoc(doc(db, 'users', entry.id), entry);
      setData(data.map((item) => (item.id === entry.id ? entry : item)));
    } else {
      const docRef = await addDoc(collection(db, 'users'), entry);
      setData([...data, { ...entry, id: docRef.id }]);
    }
    setCurrentEntry(null);
  };

  const handleEdit = (entry) => {
    setCurrentEntry(entry);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', margin: '20px' }}>
      <CreateEntryForm existingEntry={currentEntry} onEntryComplete={handleNewEntry} />
      <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </Box>
  );
};

export default App;
