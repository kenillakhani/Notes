import React from 'react';

const GlossaryTooltip = ({ term, explanation }) => {
  return (
    <div className="glossary-tooltip">
      <strong>{term}</strong>: {explanation}
    </div>
  );
};

export default GlossaryTooltip;
