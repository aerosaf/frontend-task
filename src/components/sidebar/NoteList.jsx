import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

class NoteList extends Component {
  render() {
    return (this.props.notes.map(note => (
      <Note
        key={note.id}
        note={note}
      />
    ))
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
