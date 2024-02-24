import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Group from "../components/Group";
import axios from 'axios';

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/groups', { withCredentials: true })
        .then(response => {
            setGroups(response.data);
        })
        .catch(error => {
            console.error('Error fetching group data:', error);
        });
}, []);

  return (
    <div className="groups">
      <Navbar />
      <div className="groups--top">
        <input type="text" placeholder="Search Groups"></input>
        <div>
          <button className="groups--buttons">
            <Link to="/joingroup">Join</Link>
          </button>
          <button className="groups--buttons">
            <Link to="/creategroup">Create</Link>
          </button>
        </div>
      </div>
      <div className="groups--gridcontainer">
        {groups
          // .filter((group) => group.members.some((member) => member === userEmail))
          .map((group) => (
            <Group
              name={group.name}
              code={group.code}
              description={group.description}
            />
          ))}
      </div>
    </div>
  )
}

export default Groups