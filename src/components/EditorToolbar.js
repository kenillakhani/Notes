import React, { useState } from 'react';
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignRight, FaAlignCenter } from "react-icons/fa";
import { MdOutlineTextIncrease, MdOutlineTextDecrease } from "react-icons/md";

const EditorToolbar = () => {
  const [fontSize, setFontSize] = useState(3);  // Initial size

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const changeFontSize = (change) => {
    let newSize = fontSize + change;

    if (newSize >= 1 && newSize <= 7) {
      setFontSize(newSize);
      document.execCommand('fontSize', false, newSize);
    }
  };

  return (
    <div className="editor-toolbar">
      <button onClick={() => applyFormat('bold')}>
        <FaBold />
      </button>
      <button onClick={() => applyFormat('italic')}>
        <FaItalic />
      </button>
      <button onClick={() => applyFormat('underline')}>
        <FaUnderline />
      </button>
      <button onClick={() => applyFormat('justifyLeft')}>
        <FaAlignLeft />
      </button>
      <button onClick={() => applyFormat('justifyCenter')}>
        <FaAlignCenter />
      </button>
      <button onClick={() => applyFormat('justifyRight')}>
        <FaAlignRight />
      </button>

      {/* Font Increase Button */}
      <button 
        onClick={() => changeFontSize(1)} 
      >
        <MdOutlineTextIncrease />
      </button>
      
      <button 
        onClick={() => changeFontSize(-1)} 
      >
        <MdOutlineTextDecrease />
      </button>
    </div>
  );
};

export default EditorToolbar;