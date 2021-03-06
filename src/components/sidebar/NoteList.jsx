import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

class NoteList extends Component {
  render() {
    return (this.props.notes.map(note => (
      <Note
        key={note.id}
        note={note}
        selectNote={this.props.selectNote}
        deleteNote={this.props.deleteNote}
      />
    ))
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default NoteList;
