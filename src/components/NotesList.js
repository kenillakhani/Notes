import React from 'react';
import NoteItem from './NoteItem';

const NotesList = ({ notes, onEditNote, onDeleteNote, onPinNote }) => {
  const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);

  return (
    <div className="notes-list">
      {sortedNotes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
          onPinNote={onPinNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
