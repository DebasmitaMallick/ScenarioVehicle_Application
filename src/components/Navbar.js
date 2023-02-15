import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './navStyles.css';
function Navbar() {
  const [homeIsActive, setHomeIsActive] = useState(true)
  const changeActive = (currElement) => {
    
  }
  return (
    <>
        <nav className="navigation">
          <div className="navigation-menu">
            <ul>
              <li><Link className='active' to="/">Home</Link></li>
              <li><Link onClick={() => changeActive(this)} to="/addscenario">Add Scenarios</Link></li>
              <li><Link onClick={() => changeActive(this)} to="/allscenarios">All Scenarios</Link></li>
              <li><Link onClick={() => changeActive(this)} to="/addvehiclesform">Add Vehicles</Link></li>
            </ul>
          </div>
        </nav>
    </>
  )
}

export default Navbar