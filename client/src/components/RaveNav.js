import { useEffect } from "react"

import { Navbar, Nav } from "react-bootstrap/"
import { Link } from "react-router-dom";

const RaveNav = () => {
    useEffect(() => {

    }, [])


    return (
      <Navbar bg="light" fixed="top" style={{height: "60px"}}>
        <Navbar.Brand style={{marginLeft: "20%", height: "50px", width: "auto"}}>
          <Link to="/" style={{color: "black"}}>Rave </Link>
        </Navbar.Brand>
        <Navbar.Text style={{marginLeft: 30, height: "47px", width: "auto", whiteSpace: "nowrap"}}>
          A Real Time Music Player
        </Navbar.Text>
        <Nav style={{marginLeft: "40%", height: "50px"}}>
          <Nav.Link>
            <Link to="/login" style={{color: "black"}}>Login</Link>
          </Nav.Link>
          <span style={{paddingLeft: 20}}/>
          <Nav.Link>
            <Link to="/register" style={{color: "black"}}>Register</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default RaveNav;
