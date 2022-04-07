// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import app from "./firebase-init";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');

  const handleNameBlur = (e) => {
    setName(e.target.value);
  }
  const hadleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  const hadlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisteredChange = event =>{
     setRegistered(event.target.checked)  //ai checked ta critical tobe input a jemon value check box er khetre checked use hoy
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password
      )
    ) {
      setError("password should contain at least one special character"); // jodi regex na match khay  aita dekhabe
      return;
    }

    setValidated(true);
    setError(""); //jodi error na pay


    if(registered){
      console.log(email,password)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
        
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        //... register hower por empty korte
        setEmail('');
        setPassword('');
        verifyEmail();
        setUserName();
      })
      .catch((error) => {
        console.error(error)
        setError(error.message);
      });
    }


    console.log("submitted", email, password);
  }
  const handlePasswordReset = ()=>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
    
      console.log('email sent')
    })
  
  }

  const setUserName = () =>{
    updateProfile(auth.currentUser,{
      displayName: name
    })
    .then(() =>{
      console.log('updating name')
    })
    .catch(error =>{
      setError(error.message)
    }) 
  }


 const verifyEmail = () =>{
   sendEmailVerification(auth.currentUser)
   .then(()=>{
     console.log('email verification sent')
   })
 }

  return (
    <div>
      <div className="registration w-50 mx-auto mt-3">
        <h2>Please {registered ? 'login' : 'Register'}!! </h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
           
     { !registered &&  <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name: </Form.Label>
            <Form.Control
              onBlur={handleNameBlur }
              type="text"
              placeholder="Enter name"
              required
            />
        
            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={hadleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={hadlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered?" />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button onClick = {handlePasswordReset} variant="link">Forgot Password?</Button>
          <Button variant="primary" type="submit">
             {registered ? "Login" : "Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
