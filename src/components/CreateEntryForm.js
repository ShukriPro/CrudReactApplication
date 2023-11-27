import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { db, collection, addDoc, doc, updateDoc } from '../database/firebase';

const CreateEntryForm = ({ existingEntry, onEntryComplete }) => {
  const [entry, setEntry] = useState({
    name: '',
    email: '',
    phone: '',
    active: false,
  });

  // When the component receives an existingEntry prop, it enters 'edit' mode.
  useEffect(() => {
    if (existingEntry) {
      setEntry(existingEntry);
    }
  }, [existingEntry]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEntry({
      ...entry,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (entry.id) {
        // Update existing document
        await updateDoc(doc(db, 'users', entry.id), entry);
      } else {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, 'users'), entry);
        console.log('Document written with ID: ', docRef.id);
      }

      onEntryComplete(entry); // Notify the parent component of the operation's completion
      setEntry({ name: '', email: '', phone: '', active: false }); // Reset the form
    } catch (error) {
      console.error('Error handling document: ', error);
    }
  };

  const formTitle = entry.id ? 'Edit Entry' : 'Add Entry';

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>{formTitle}</h2>
      <TextField
        name="name"
        label="Name"
        value={entry.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="email"
        label="Email"
        value={entry.email}
        onChange={handleChange}
        required
      />
      <TextField
        name="phone"
        label="Phone"
        value={entry.phone}
        onChange={handleChange}
        required
      />
      <FormControlLabel
        control={<Checkbox checked={entry.active} onChange={handleChange} name="active" />}
        label="Active"
      />
      <Button type="submit" variant="contained">
        {entry.id ? 'Update' : 'Add'}
      </Button>
    </form>
  );
};

export default CreateEntryForm;
