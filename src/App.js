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
 const [validated, setValidated] = useState(false);
 const [error, setError] = useState('');


  const hadleEmailBlur = (e) => {
    //ekta parameter er jonno na dile o cholto
    setEmail(e.target.value);
  };
  const hadlePasswordBlur = (e) => {
    //ekta parameter er jonno na dile o cholto
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)){
      setError('password should contain at least one special character') // jodi regex na match khay  aita dekhabe
       return;
    }

    setValidated(true);
    setError(""); //jodi error na pay




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
     <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={hadleEmailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={hadlePasswordBlur} type="password" placeholder="Password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
         <p className="text-danger">{error}</p>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
     </div>
    </div>
  );
}

export default App;
