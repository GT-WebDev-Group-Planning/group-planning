import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Group from "../components/Group";

const Groups = () => {
  const [groups, setGroups] = useState([
    {
      name: "Test Group",
      code: "1234",
      description: "Test Group Description"
    }, 
    {
      name: "Test Group 2",
      code: "5678",
      description: "Test Group Description 2"
    },
    {
      name: "Test Group 3",
      code: "91011",
      description: "Test Group Description 3"
    }
  ]);

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