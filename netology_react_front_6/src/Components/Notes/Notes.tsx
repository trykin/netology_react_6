import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CloseButton, Container } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { RxUpdate, RxPlusCircled } from "react-icons/rx";
import { AddNote } from "./AddNote";
import { ChangeNode } from "./ChangeNote";

export interface INote {
  id: string;
  content: string;
}

export function Notes() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [openAddWindows, setOpenAddWindows] = useState<boolean>(false);
  const reloadFun = () => setReload(!reload);

  const [openChangeWindows, setOpenChangeWindows] = useState<boolean>(false);
  const [changeItem, setChangeItem] = useState<INote>({ id: "", content: "" });

  useEffect(() => {
    axios
      .get<INote[]>("https://localhost:5001/Notes")
      .then((p) => setNotes(p.data));
  }, [reload]);

  return (
    <>
      <ChangeNode
        show={openChangeWindows}
        setShow={setOpenChangeWindows}
        setReload={reloadFun}
        id={changeItem.id}
        currentComment={changeItem.content}
      />
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
      <div style={{ display: "flex", whiteSpace: "normal" }}>
        {notes?.map((note) => (
          <Card key={note.id} className="mx-2 my-2" style={{ width: "18rem" }}>
            <Card.Body>
              <Container className="text-end">
                <BsFillPencilFill
                  className="mx-1"
                  onClick={async () => {
                    setChangeItem({ id: note.id, content: note.content });
                    setOpenChangeWindows(true);
                  }}
                />
                <BsFillTrashFill
                  className="ms-1"
                  onClick={async () => {
                    await axios.delete("https://localhost:5001/Notes", {
                      data: { id: note.id },
                    });
                    reloadFun();
                  }}
                />
              </Container>
            </Card.Body>
            <Card.Text className="mx-2 my-2" style={{ wordWrap: "break-word" }}>
              {note.content}
            </Card.Text>
          </Card>
        ))}
      </div>
    </>
  );
}
