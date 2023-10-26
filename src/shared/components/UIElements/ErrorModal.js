import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = (props) => {
  console.log('Came inside error modal');
  console.log(props.error);
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Has Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
