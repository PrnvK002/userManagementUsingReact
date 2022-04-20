import React, { useEffect , useState,useContext , useRef } from "react";
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import api from '../../axios'
import { AuthContext } from "../../context/context";


function Login() {
  
  const { register, handleSubmit ,  formState: { errors } } = useForm();


  const navigate = useNavigate();
  const [errorMessage, setError] = useState();
  const { setUser } = useContext(AuthContext);

  //======================= Using of ref ===============

  const inputRef = useRef();
  const { ref , ...rest } = register("email",{ required:"email must be filled",  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "invalid email address"
  } });

  useEffect(()=>{
    inputRef.current.focus();
  },[])

  // ====================== Form submit section ===================

  const onSubmit = (data) => {


    api.post("/login", { ...data })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setUser(response.data.userData);
          localStorage.setItem(`token+${response.data.userData.email}`, "Bearer " + response.data.accessToken);
          console.log("------------Not working------------");
          navigate("/");
        } else {
          console.log(response.data.error);
          setError(response.data.error);
        }
      })
      .catch((err)=> {
        console.log(err);
      })

  }


  return (
    <div className="totalBody">
    <div className="container">
      <div className="boxLogin">
        {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errorMessage}</p>
          )}
        <form onSubmit={ handleSubmit(onSubmit) }>
          <h1> Login Form </h1>
        <div className="input">

        { errors.email && <p style={{ color : "red" , fontSize:"0.8rem" }} >{errors.email.message}</p>  }

          <input
            type="email"
            className="inputLogin"
            placeholder = "Enter your email Address"
            name="email"
            { ...rest }
            ref={(e) => {
              ref(e)
              inputRef.current = e // you can still assign to ref
            }}
          />

        { errors.password && <p style={{ color : "red" , fontSize:"0.8rem" }} >{errors.password.message}</p> }

          <input
            type="password"
            className="inputLogin"
            placeholder="Enter the password"
            name="password"
            { ...register("password", { required : "password must be filled" , minLength : { value : 6 , message : "Password must contain atlest 6 characters" } }) }

          />
        </div>

        <div className="submit">
          <button type="submit" className="submitButton"> Login </button>
          <p onClick={ ()=>{ navigate('/signup') } } style = {{ fontSize : "0.8rem" , cursor:"pointer" }} >Don't Have an Account ? Signup Now</p>
        </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
