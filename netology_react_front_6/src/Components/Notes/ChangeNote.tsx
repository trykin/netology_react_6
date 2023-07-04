import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

export function ChangeNode({
  show,
  setShow,
  setReload,
  id,
  currentComment,
}: {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
  setReload: () => void;
  id: string;
  currentComment: string;
}) {
  const handleClose = () => setShow(false);
  const [comment, setComment] = useState<string>(currentComment);
  const buttonDisable: boolean =
    comment === null || comment === "" ? true : false;

  useEffect(() => {
    setComment(currentComment);
  }, [show]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавление новой заметки
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            const json = JSON.stringify({ id: id, content: comment });
            await axios
              .put("https://localhost:5001/Notes", json, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((p) => console.log(p.data));
            setReload();
            handleClose();
          }}
          disabled={buttonDisable}
        >
          Изменить
        </Button>
        <Button
          onClick={() => {
            handleClose();
            setComment("");
          }}
        >
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
