import React from 'react'

type Icon = React.ReactNode;

interface NoteProps {
  icons?: Icon[]; // Allow multiple icons to be passed as an array
  children?: React.ReactNode;
}

const Note: React.FC<NoteProps> = ({ icons, children }) => (
  <div className="note">
    <div className="note-icons">
      {icons && icons.map((icon, idx) => (
        <span key={idx} className="note-icon">{icon}</span>
      ))}
    </div>
    <div className="note-content">
      {children}
    </div>
  </div>
);

export default Note