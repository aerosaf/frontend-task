import React from 'react';
import PropTypes from 'prop-types';
import TextArea from './TextArea';

function NotePad(props) {
  if (typeof props.textArea.id === 'undefined') {
    return null;
  }

  return (
    <div>
      <TextArea textArea={props.textArea} editText={props.editText} />
    </div>
  );
}

NotePad.propTypes = {
  textArea: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]).isRequired,
  editText: PropTypes.func.isRequired,
};

export default NotePad;
