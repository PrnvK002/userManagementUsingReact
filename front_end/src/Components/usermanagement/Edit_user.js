import React, { useEffect, useState , useContext } from "react";
import { useParams , useNavigate } from "react-router-dom";
import api from "../../axios";
import {AuthContext} from '../../context/context'


function EditUser() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ Id , setId ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');

  let { id } = useParams();
  let token = localStorage.getItem(`token+${user.email}`);
  console.log("Edit user",token);
  useEffect(() => {
    api.post("/getUser", 
        { id },
        {  headers: { "authorization": token } }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
            setId(response.data.userData._id);
            setUsername(response.data.userData.username);
            setEmail(response.data.userData.email);
            setPhone(response.data.userData.phone);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/editUser", 
       { id : Id, username : username , email : email , phone : phone  },
       { headers: { "authorization": token } }
    ).then((response) => {

        console.log(response);
        if(response.data.success === true){
            navigate('/users')
        }else{
            console.log(response.data.error);
        }

    })
  };

  return (<div>
      <div className="totalBody">
      <div className="container">
        <div className="boxLogin">
          {/* {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errorMessage}</p>
          )} */}
          <form onSubmit={handleSubmit}>
            <h1> Edit User </h1>
            <div className="input">
              { console.log(username , email , phone) }
              <input
                type="text"
                className="inputLogin"
                value={ username ? username : ""  }
                placeholder={ username ? username : 'username' }
                onChange = { (e)=> { setUsername(e.target.value) } }
                name="username"
              />

              <input
                type="email"
                className="inputLogin"
                value={ email ? email : "" }
                placeholder={ email ? email : 'username@gmail' }
                onChange = { (e)=> { setEmail(e.target.value) } }
                name="email"
              
              />

              <input
                type="number"
                className="inputLogin"
                value={ phone ? phone : "" }
                placeholder={ phone ? phone : 'username' }
                onChange = { (e)=> { setPhone(e.target.value) } }
                name="phone"
                
              />
              
            </div>

            <div className="submit">
              <button type="submit" className="submitButton">
                Submit
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>);
}

export default EditUser;
