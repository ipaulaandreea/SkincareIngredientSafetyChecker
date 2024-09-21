import './App.css';
import Message from './components/Message/Message.js'
import OptionBoxes from "./components/OptionBoxes/OptionBoxes";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Navbar} from "react-bootstrap";
function App() {
  return (
    <div className="App">

        <Navbar className="navbar">
            <Container>
                <Navbar.Brand>SkincareChecker</Navbar.Brand>
            </Container>
        </Navbar>
<Message/>
<OptionBoxes/>

    </div>
  );
}

export default App;
