import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
//
function ModalBack({ selectedPainting, show, handleClose }) {
  const [fullscreen, setFullscreen] = useState("md - down");

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
  }
  console.log("test passing info to the modal", selectedPainting);

  return (
    <Modal
      show={show}
      fullscreen={fullscreen}
      onHide={handleClose}
      onShow={() => handleShow("md-down")}
    >
      <Modal.Header closeButton>
        <Modal.Title>Comments related to</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {selectedPainting.title}
          {/* {selectedPainting && selectedPainting.title} */}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis sed
          assumenda perferendis, aliquam commodi nam corporis officia. Voluptate
          veniam voluptates quibusdam. Nesciunt, quas dolorum iste autem sit at
          eius architecto!
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default ModalBack;
