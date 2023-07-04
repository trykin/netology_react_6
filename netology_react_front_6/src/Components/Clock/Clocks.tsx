import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";

export function Clocks() {
  return (
    <>
      <Clock />
    </>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const timeString = `${hours}:${minutes}:${seconds}`;

  return (
    <>
      <Container>
        <h1>{timeString}</h1>
      </Container>
    </>
  );
}
