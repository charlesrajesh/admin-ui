import { createPortal } from 'react-dom'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  cancelConfirmation,
  confirmPendingAction
} from '../../actions/pendingConfirmationActions'
import React from 'react'

const ConfirmModal = ({
  showPopup,
  onConfirm,
  onCancel,
  confirmButtonTxt,
  cancelButtonTxt,
  children
}) => {
  const popupStyle = {
    boxShadow: '0px 0px 6px #0000003E',
    border: '1px solid #6990F8',
    height: '100%',
    width: '100%',
    borderRadius: '0.3rem'
  }
  const button = {
    width: '142px',
    height: '42px'
  }
  const modalRoot = document.getElementById('modal')
  return createPortal(
    <Modal show={showPopup} size="md">
      <Modal.Body className="p-5" style={popupStyle}>
        <Row>
          <Col className="d-flex justify-content-center mb-3">?</Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mb-3">{children}</Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="outline-primary"
              className="mr-3"
              style={button}
              onClick={onCancel}
            >
              {cancelButtonTxt}
            </Button>
            <Button
              variant="primary"
              className="ml-3"
              style={button}
              onClick={onConfirm}
            >
              <p>{confirmButtonTxt}</p>
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>,
    modalRoot
  )
}

function ConfirmationModal () {
  const dispatch = useDispatch()
  const pendingConfirmation = useSelector(
    (state) => state.pendingConfirmationReducer
  )

  function onCancelConfirmation () {
    dispatch(cancelConfirmation())
  }

  function onConfirmPendingAction () {
    dispatch(confirmPendingAction())
  }

  return (
    <>
      {pendingConfirmation && (
        <ConfirmModal
          onConfirm={onConfirmPendingAction}
          onCancel={onCancelConfirmation}
          showPopup={!!pendingConfirmation}
          confirmButtonTxt={pendingConfirmation.confirmButtonTxt}
          cancelButtonTxt={pendingConfirmation.cancelButtonTxt}
        >
          {pendingConfirmation.msg}
        </ConfirmModal>
      )}
    </>
  )
}
export default ConfirmationModal
