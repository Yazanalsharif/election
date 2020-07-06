import React, { Component } from "react";
import logo from "../imgs/download.jpg";



class Navbar extends Component {
    render(){
        return(    
     <nav className="navbar navbar-light bg-light">
       <div className="navbar-brand" >
     
       <img src={logo} width="35" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
       Election
       </div>
     </nav>

        )
    }
}
export default Navbar;
