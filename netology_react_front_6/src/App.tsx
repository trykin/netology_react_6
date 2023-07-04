import { Tab, Tabs } from "react-bootstrap";
import { Notes } from "./Components/Notes/Notes";

function App() {
  return (
      <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
      >
          <Tab eventKey="Notes" title="Notes">
              <Notes />
          </Tab>
          <Tab eventKey="profile" title="Profile">
              Tab content for Profile
          </Tab>
          </Tabs>
  );
}

export default App;