// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import app from "./firebase-init";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth(app);
function App() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

  const hadleEmailBlur = (e) => {
    //ekta parameter er jonno na dile o cholto
    setEmail(e.target.value);
  };
  const hadlePasswordBlur = (e) => {
    //ekta parameter er jonno na dile o cholto
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage)
    // ..
  });



    console.log("submitted",email,password);
    e.preventDefault();
  };
  return (
    <div >
      {/* <form onSubmit={handleFormSubmit}>
           <input onBlur={hadleEmailBlur} type="email" />
           <input onBlur={hadlePasswordBlur} type="password" name="" id="" />
           <br />
           <input type="submit"  vlaue="login" name="" id="" /> 
       </form> */}

     <div className="registration w-50 mx-auto mt-3">
      <h2>Registration Form!! </h2>
     <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={hadleEmailBlur} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={hadlePasswordBlur} type="password" placeholder="Password" />
        </Form.Group>
     
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
     </div>
    </div>
  );
}

export default App;
