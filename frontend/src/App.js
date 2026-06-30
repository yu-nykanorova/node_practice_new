import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5555/users').then(({data}) => setUsers(data))
  }, []);

  return (
      <div>
        <h1>Users:</h1>
        {
          users.map(user => <div key={user._id}><h2 style={{color: "darkmagenta"}}>{user.name} {user.surname}</h2></div>)
        }
      </div>
  );
};

export {App};