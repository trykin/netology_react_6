import moment from "moment-timezone";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";

interface IClock {
  zoneName: string;
}

export function Clocks() {
  const zone = moment.tz.names();
  const [searchZone, setSearchZone] = useState(zone);
  const [searchString, setSearchString] = useState<string>("");
  const [clock, setClock] = useState<IClock[]>([]);
  const [currentZone, setCurrentZone] = useState<number>(0);

  console.log(clock);

  const deleteClock = (item: number) => {
    const updatedArray = [...clock];
    updatedArray.splice(item, 1);
    setClock(updatedArray);
  };

  useEffect(() => {
    setSearchZone(
      zone.filter(
        (value) => value.toLowerCase().indexOf(searchString.toLowerCase()) > -1
      )
    );
    setCurrentZone(0);
  }, [searchString]);

  return (
    <>
      <Container>
        <FloatingLabel
          controlId="floatingInput"
          label="Поиск"
          className="mx-3 my-3"
        >
          <Form.Control
            value={searchString}
            type="text"
            placeholder="Поиск"
            onChange={(e) => setSearchString(e.target.value)}
          />
        </FloatingLabel>
        <Form.Select
          className="mx-3 my-3"
          value={currentZone}
          onChange={(e) => setCurrentZone(Number(e.target.value))}
        >
          {searchZone.map((name: string, index: number) => (
            <option value={index} key={index}>
              {name}
            </option>
          ))}
        </Form.Select>
        <Button
          className="mx-3 my-3"
          variant="secondary"
          onClick={() =>
            setClock((oldDate) => [
              ...oldDate,
              { zoneName: searchZone[currentZone] },
            ])
          }
        >
          Добавить
        </Button>
      </Container>
      <Container>
        <Table striped className="mx-3 my-3">
          <tbody>
            {clock.map((item, number) => (
              <Clock
                zone={item.zoneName}
                index={number}
                deleteFun={deleteClock}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

function Clock({
  zone,
  index,
  deleteFun,
}: {
  zone: string;
  index: number;
  deleteFun: (item: number) => void;
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeOf = moment.tz(time, zone);
  const hours = timeOf.hours();
  const minutes = timeOf.minutes();
  const seconds = timeOf.seconds();

  return (
    <tr className="d-flex">
      <td className="col-3">
        <h2>{`${hours}:${minutes}:${seconds}`}</h2>
      </td>
      <td className="col-3">
        <h2>{zone}</h2>
      </td>
      <td className="col-3">
        <Button variant="secondary" onClick={() => deleteFun(index)}>
          Удалить
        </Button>
      </td>
    </tr>
  );
}
