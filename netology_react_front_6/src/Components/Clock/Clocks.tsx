import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";

interface IClock {
  zoneName: string;
}

export function Clocks() {
  const zone = moment.tz.names();
  const [searchZone, setSearchZone] = useState(zone);
  const [searchString, setSearchString] = useState<string>("");
  const [clock, setClock] = useState<IClock[]>([]);
  const [currentZone, setCurrentZone] = useState<number>(0);

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
      <FloatingLabel controlId="floatingInput" label="Поиск" className="mb-3">
        <Form.Control
          value={searchString}
          type="text"
          placeholder="Поиск"
          onChange={(e) => setSearchString(e.target.value)}
        />
      </FloatingLabel>
      <Form.Select
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
      {clock.map((item, number) => (
        <Clock zone={item.zoneName} />
      ))}
    </>
  );
}

function Clock({ zone }: { zone: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeOf =  moment.tz(time, zone);
  const hours = timeOf.hours()
  const minutes = timeOf.minutes();
  const seconds = timeOf.seconds();

  return (
    <>
      <Container>
        <h1>{`${hours}:${minutes}:${seconds}`} {zone} </h1>
        
      </Container>
    </>
  );
}
