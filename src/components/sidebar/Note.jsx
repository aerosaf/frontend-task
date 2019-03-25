import React from 'react';
import PropTypes from 'prop-types';

function Note(props) {
  return (
    <div className="item">
      <div
        role="menuitem"
        onKeyPress={() => props.selectNote(props.note.id)}
        tabIndex={props.note.id}
        onClick={() => props.selectNote(props.note.id)}
      >
        <h4>
          {
            props.note.body != null ?
              props.note.body.substring(0, 20) :
              props.note.body
          }...
        </h4>
      </div>
      <i
        className="window close icon"
        onKeyPress={() => props.deleteNote(props.note.id)}
        tabIndex={props.note.id}
        onClick={() => props.deleteNote(props.note.id)}
        role="button"
      />
    </div>
  );
}

Note.propTypes = {
  note: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  selectNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default Note;
