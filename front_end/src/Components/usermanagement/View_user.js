import React,{ useEffect , useState , useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './view_user.css';
import api from '../../axios'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/context'
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';


export default function BasicTable() {

  const [ alert , setAlert ] = useState('');
  const { user } = useContext(AuthContext);
  let token = localStorage.getItem(`token+${user.email}`);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  //============ Edit user ====================
  const editUser = (id) => {
    console.log(id);
    setAlert("Successfully edited user");
    navigate(`/editUser/${id}`);
  }
//=================================================
//===================== delete User ================
  const deleteUser = (id) => {
    console.log(id);
    setAlert('SuccessFully Deleted User')
    let d = userDetails.filter((e) => {
      return e._id !== id
    })
    setUserDetails(d);
    api.delete('/deleteUser', { 
      headers : { 
        "authorization" : token 
      },
      data : {
        id
      }
     }).then((response) => {

    }).catch((err) => {
      console.log(err);
    })
  }
//========================================================
    const [ userDetails , setUserDetails ] = useState([]);
    const [ errorMessage , setErrorMessage ] = useState('');
    const getData = ()=>{

        api.get('/users' , { headers : { "authorization" : token } }).then((response) => {
            console.log(response);
            if(response.data.success){
                
              let usersD = response.data.users.filter((e)=>{
                return e.status !==true
              })
              setUserDetails(usersD);


            }else{
                
                setErrorMessage(response.data.error);

            }
    
        })
    
    }

    useEffect(()=>{

        getData();

    },[ ])


    const searchUser = ()=>{

      
      if(search.length > 0){

          api.post('/searchUser',{ search },
            {  headers: { "authorization": token } }
          ).then((response) => {
            console.log(response);
            if(response.data.success === true){

              let data = response.data.userData;
              setUserDetails(data);

            }else{

              setErrorMessage('User not found');

            }

          })

      }

    }

  return (
    <div className ="userTable" >
      { alert ?  
      <div style={{display:"flex",justifyContent:"center"}}>
        <Stack sx={{ width: '50%' }} style={{alignItems:"center",marginBottom:"10px"}} spacing={2}>
          <Alert severity="success" onClose={() => { setAlert(null) }} >{alert}!</Alert>
        </Stack>
      </div>
      : ""
      }
      <div>
        <input type="text" value={search} onChange={ (e)=>{ setSearch(e.target.value) } } className="searchBar" placeholder='Enter Username to search' />
        <button className='searchButton' onClick={ searchUser } >Search </button>
      </div>
    { errorMessage && <p style={{ color : "red" }} >{errorMessage}</p> }
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User name</TableCell>    
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          { userDetails.map((element) => (
            <TableRow
              key={element._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell>{element.username}</TableCell>
              <TableCell>{element.email}</TableCell>
              <TableCell>{element.phone}</TableCell>
              <TableCell style={{ cursor : "pointer" , color : "blue" }} onClick={ ()=> { editUser(element._id) } } ><EditIcon /></TableCell>
              <TableCell style={{ cursor : "pointer" , color : "red" }} onClick={ ()=> { if(window.confirm('Delete the item?')) deleteUser(element._id) } }  ><DeleteIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
