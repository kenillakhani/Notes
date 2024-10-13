import React, { useState, useEffect } from 'react';
import EditorToolbar from './components/EditorToolbar';
import RichTextEditor from './components/RichTextEditor';
import NotesList from './components/NotesList';
import './styles/App.css';

function App() {
  const [notes, setNotes] = useState([]); // Holds all notes
  const [currentNote, setCurrentNote] = useState({ id: null, content: '', isPinned: false }); // Holds the currently active note being edited
  const [isEditing, setIsEditing] = useState(false); // Toggles editor mode

  // Load notes from localStorage when the app first loads
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Update localStorage when notes array changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Function to handle creating a new note
  const addNewNote = () => {
    setCurrentNote({ id: null, content: '', isPinned: false }); // Reset the editor for a new note
    setIsEditing(true); // Switch to editing mode
  };

  // Function to save a note (either adding a new one or updating an existing one)
  const saveNote = (content) => {
    const newNote = { ...currentNote, content };

    // Check if it's an existing note (edit mode) or a new note
    if (currentNote.id) {
      setNotes(notes.map(note => note.id === currentNote.id ? newNote : note));
    } else {
      setNotes([...notes, { ...newNote, id: Date.now() }]); // Add new note with unique ID
    }
    
    setIsEditing(false); // Exit editing mode
  };

  // Function to handle deleting a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id)); // Filter out the deleted note
    if (currentNote.id === id) {
      setIsEditing(false); // If the deleted note is currently being edited, close the editor
    }
  };

  // Function to edit a note (load it into the editor)
  const editNote = (note) => {
    setCurrentNote(note); // Load the selected note into the editor
    setIsEditing(true); // Switch to editing mode
  };

  // Function to pin/unpin a note
  const pinNote = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, isPinned: !note.isPinned } : note)); // Toggle pin status
  };

  return (
    <div className="App">
      <div className="notes-list-panel">
        <button onClick={addNewNote} className="Add-Button">Add New Note</button>

        <NotesList
          notes={notes}
          onEditNote={editNote}
          onDeleteNote={deleteNote}
          onPinNote={pinNote}
        />
      </div>
      
      <div className="editor-panel">
        <EditorToolbar />
        <RichTextEditor
          noteContent={currentNote.content}
          isEditing={isEditing}
          onSaveNote={saveNote}
        />
      </div>
    </div>
  );
}

export default App;
