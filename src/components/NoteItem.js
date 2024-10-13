import React from 'react';
import { BsPinAngleFill, BsPinAngle } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import '../styles/App.css';

const NoteItem = ({ note, onEditNote, onDeleteNote, onPinNote }) => {
  return (
    <div className={`note-item ${note.isPinned ? 'pinned' : ''}`}>
      <div className="note-content" onClick={() => onEditNote(note)}>
        <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
      </div>
      <div className="note-actions">
        {/* Edit Button */}
        <button onClick={() => onEditNote(note)}>
          <MdEdit /> {/* Edit icon */}
        </button>
        {/* Pin/Unpin Button */}
        <button onClick={() => onPinNote(note.id)}>
          {note.isPinned ? <BsPinAngleFill /> : <BsPinAngle />}
        </button>
        {/* Delete Button */}
        <button className="delete-btn" onClick={() => onDeleteNote(note.id)}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
