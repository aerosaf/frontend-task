import React from 'react';
import PropTypes from 'prop-types';

function TextArea(props) {
  return (
    <div className="ui form">
      <div className="field">
        <textarea
          value={props.textArea.body}
          onChange={event => props.editText(event, props.textArea.id)}
        />
      </div >
    </div>
  );
}

TextArea.propTypes = {
  textArea: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  editText: PropTypes.func.isRequired,
};

export default TextArea;
