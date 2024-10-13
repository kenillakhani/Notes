import React, { useEffect, useRef, useState } from 'react';
import '../styles/App.css';

// Simulated Groq AI response
const mockGroqResponse = {
  terms: [
    {
      term: "React",
      definition: "A JavaScript library for building user interfaces."
    },
    {
      term: "State",
      definition: "A built-in object in React to store data."
    }
  ]
};

const RichTextEditor = ({ noteContent, isEditing, onSaveNote }) => {
  const editorRef = useRef(null);
  const [highlightedContent, setHighlightedContent] = useState(noteContent);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Function to get key terms from Groq AI (mocked here)
  const fetchKeyTerms = async (content) => {
    try {
      const response = await fetch('https://groq.ai/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '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'
        },
        body: JSON.stringify({ text: content })
      });
      const data = await response.json();
      return data.terms;
    } catch (error) {
      console.error('Error fetching key terms from Groq AI:', error);
      return [];
    }
  };

  // Highlight the key terms in the content
  const highlightTerms = (content, terms) => {
    let updatedContent = content;
    terms.forEach(({ term }) => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      updatedContent = updatedContent.replace(regex, `<span class="highlight-term" data-term="${term}">$1</span>`);
    });
    return updatedContent;
  };

  // Handle hover to show tooltip
  const handleMouseOver = (e) => {
    const termElement = e.target.closest('.highlight-term');
    if (termElement) {
      const term = termElement.getAttribute('data-term');
      const definition = mockGroqResponse.terms.find(t => t.term === term)?.definition;

      if (definition) {
        const { clientX: x, clientY: y } = e;
        setTooltipPosition({ x, y });
        setTooltipContent(definition);
        setShowTooltip(true);
      }
    } else {
      setShowTooltip(false);
    }
  };

  // Fetch key terms and update the note content with highlighted terms
  useEffect(() => {
    const updateHighlightedContent = async () => {
      const terms = await fetchKeyTerms(noteContent);
      const updatedContent = highlightTerms(noteContent, terms);
      setHighlightedContent(updatedContent);
    };
    if (!isEditing) {
      updateHighlightedContent();
    }
  }, [noteContent, isEditing]);

  // Handle saving the note
  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onSaveNote(content);
    }
  };

  return (
    <div className="rich-text-editor">
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable={isEditing}
        onMouseOver={handleMouseOver}
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      ></div>
      {isEditing && <button className="save-button" onClick={handleSave}>Save Note</button>}

      {showTooltip && (
        <div
          className="tooltip"
          style={{ top: tooltipPosition.y + 20, left: tooltipPosition.x + 20 }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
