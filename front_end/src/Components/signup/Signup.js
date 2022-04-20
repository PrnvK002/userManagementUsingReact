import React, { useState, useContext , useRef , useEffect } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../axios";
import { AuthContext } from "../../context/context";

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setError] = useState();

  const { setUser } = useContext(AuthContext);

  //====================== Validation ===========================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

// ===================== useref settting ==============
  
  const inputRef = useRef();
  const { ref , ...rest } = register("username", {
    required: "Full name must be filled",
  });

  useEffect(()=>{
    inputRef.current.focus();
  },[])

//=====================================================
 

  const onSubmit = (data) => {
    api.post("/signup", { ...data }).then((response) => {
      if (response.data.success === true) {
        setUser(response.data.userData);
        localStorage.setItem(`token+${response.data.userData.email}`, "Bearer " + response.data.accessToken);
        navigate("/");
      } else {
        setError(response.data.error);
      }
    })
      .catch((err)=> {
        console.log(err);
      })
  };
  return (
    <div className="totalBody">
      <div className="container">
        <div className="boxLogin">
          {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1> Signup Form </h1>
            <div className="input">
              {errors.username && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.username.message}
                </p>
              )}
              <input
                type="text"
                className="inputLogin"
                placeholder="Enter your full name"
                name="username"
                {...rest}
                ref = { (e)=>{
                  ref(e)
                  inputRef.current = e
                } }
              />

              {errors.email && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.email.message}
                </p>
              )}

              <input
                type="email"
                className="inputLogin"
                placeholder="Enter your email Address"
                name="email"
                {...register("email", {
                  required: "Email must be filled",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />

              {errors.phone && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.phone.message}
                </p>
              )}

              <input
                type="number"
                className="inputLogin"
                placeholder="Enter your phone"
                name="phone"
                {...register("phone", {
                  required: "Phone is required",
                  minLength: {
                    value: 10,
                    message: "phone must have length of 10",
                  },
                  maxLength: {
                    value: 10,
                    message: "phone must have length of 10",
                  },
                })}
              />

              {errors.password && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.password.message}
                </p>
              )}

              <input
                type="password"
                className="inputLogin"
                placeholder="Enter the password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must contain atleast 6 characters",
                  },
                })}
              />

              {errors.confirmPassword && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.confirmPassword.message}
                </p>
              )}

              <input
                type="password"
                className="inputLogin"
                placeholder="Confirm the password"
                name="password"
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must contain atleast 6 characters",
                  },
                })}
              />
            </div>

            <div className="submit">
              <button type="submit" className="submitButton">
                {" "}
                Sign Up{" "}
              </button>
              <p
                onClick={() => {
                  navigate("/login");
                }}
                style={{ fontSize: "0.8rem", cursor: "pointer" }}
              >
                Already Have an Account ? Login Now
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
