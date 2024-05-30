import axios from "axios";
import { useContext, useEffect } from "react";
import { myContext } from "../user/Context";
import Adminnavbar from "./Adminnavbar";

export default function Alluser() {
  const { user, setUser } = useContext(myContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/getusers');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const confirmDelete = (id,name) => {
    if (window.confirm(`Are you sure you want to delete this user, ${name}?`)) {
      deleteUser(id);
      console.log("delete",id);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/dltuser/${id}`);
      fetchUser();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Adminnavbar/>
      
      <h2>All Users</h2>
      {user.map((val) => (
        <div key={val._id} className="divpro">

          <ul style={{borderBottom:'solid 1px #ddd',paddingBottom:'20px'}}>
            
            Name: {val.name} <br />
            Email: {val.mail}

            <button onClick={() => confirmDelete( val._id, val.name)} style={{marginLeft:' 100px',borderRadius:'8px'}}>Delete</button>

          </ul>
        </div>
      ))}
    </div>
  );
}