import { getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase-init";
const auth = getAuth(app);
function App() {
  const hadleEmailChange = e =>{ //ekta parameter er jonno na dile o cholto 
    console.log(e.target.value)
  }
  return (
    <div className="App">
       <form action="#">
           <input onChange={hadleEmailChange} type="email" />
           <input type="password" name="" id="" />
       </form>
    </div>
  );
}

export default App;
