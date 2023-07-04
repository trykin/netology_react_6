import { Tab, Tabs } from "react-bootstrap";
import { Notes } from "./Components/Notes/Notes";
import { Clocks } from "./Components/Clock/Clocks";

function App() {
  return (
      <Tabs
          defaultActiveKey="Notes"
          id="uncontrolled-tab-example"
          className="mb-3"
      >

          <Tab eventKey="Notes" title="Notes">
              <Notes />
          </Tab>
          <Tab eventKey="Clock" title="Clock">
              <Clocks/>
          </Tab>
          </Tabs>
  );
}

export default App;