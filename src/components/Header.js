import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  onLogin() {
    this.props.onLogin();
  }

  onLogout() {
    this.props.onLogout();
  }

  render(){

    let sessionLink;

    if (this.props.idToken) {
      sessionLink = <NavItem onClick={this.onLogout.bind(this)} href="#">Logout</NavItem>
    }
    else {
      sessionLink = <NavItem onClick={this.onLogin.bind(this)} href="#">Login</NavItem>
    }

    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Github Searcher
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {sessionLink}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
