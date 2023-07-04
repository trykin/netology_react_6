import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CloseButton, Container } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { RxUpdate, RxPlusCircled } from "react-icons/rx";
import { AddNote } from "./AddNote";

export interface INote {
  id: string;
  content: string;
}

export function Notes() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [openAddWindows, setOpenAddWindows] = useState<boolean>(false);
  const reloadFun = () => setReload(!reload);
  useEffect(() => {
    axios
      .get<INote[]>("https://localhost:5001/Notes")
      .then((p) => setNotes(p.data));
  }, [reload]);
  return (
    <>
      <AddNote
        show={openAddWindows}
        setShow={setOpenAddWindows}
        setReload={reloadFun}
      />
      <Container className="text-center">
        <Button
          variant="success"
          className="mx-3 my-3"
          onClick={() => setOpenAddWindows(true)}
        >
          <RxPlusCircled className="mx-2 my-2" size={25} />
          Добавить
        </Button>
        <Button
          variant="success"
          className="mx-3 my-3"
          onClick={() => reloadFun()}
        >
          <RxUpdate className="mx-2 my-2" size={25} />
          Обновить
        </Button>
      </Container>
      <div style={{display: "flex", whiteSpace: "normal"}}>
        {notes?.map((note) => (
          <Card key={note.id} className="mx-2 my-2" style={{ width: "18rem" }}>
            <Card.Body>
              <Container className="text-end">
                <BsFillPencilFill className="mx-1" />
                <BsFillTrashFill className="ms-1" />
              </Container>
            </Card.Body>
            <Card.Text className="mx-2 my-2" style={{wordWrap: "break-word"}}>{note.content}</Card.Text>
          </Card>
        ))}
      </div>
    </>
  );
}
