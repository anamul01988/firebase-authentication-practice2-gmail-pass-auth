import { getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase-init";
const auth = getAuth(app);
function App() {
  const hadleEmailBlur = e =>{ //ekta parameter er jonno na dile o cholto 
    console.log(e.target.value)
  }
  const hadlePasswordBlur = e =>{ //ekta parameter er jonno na dile o cholto 
    console.log(e.target.value)
  }

  const handleFormSubmit = e =>{
    console.log("submitted")
    e.preventDefault();
  }
  return (
    <div className="App">
       <form onSubmit={handleFormSubmit}>
           <input onBlur={hadleEmailBlur} type="email" />
           <input onBlur={hadlePasswordBlur} type="password" name="" id="" />
           <br />
           <input type="submit"  vlaue="login" name="" id="" /> 
       </form>
    </div>
  );
}

export default App;
