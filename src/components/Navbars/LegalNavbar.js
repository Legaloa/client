import React from 'react'
import { Link } from 'react-scroll';
import Logo from "assets/img/brand/Logo.png";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import AuthService from "../../services/auth.service";

class LegaNavbars extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.roles.includes("ROLE_USER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  logOut() {
    AuthService.logout();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };
  render() {
    const { currentUser} = this.state;
    console.log(currentUser);
    return (
      <>
         {/* Navbar primary */}
         <header className="header-global">
         <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
          <Container>     
          <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={Logo}
                />Legaloa
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
            <UncontrolledCollapse 
            navbar 
            toggler="#navbar_global">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={Logo}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-lg-auto" navbar>   
                <NavItem>
                <div className="navbar-nav ml-auto">   
                <Link  className="nav-link"
                  href="" 
                  onClick={this.handleScroll}        
                  to="about"
                  spy={true} 
                  smooth={true}>
                    À propos <span className="sr-only">(current)</span>
                </Link >
                
                <Link  className="nav-link"
                  href="" 
                  onClick={this.handleScroll}        
                  to="test"
                  spy={true} 
                  smooth={true}>
                    Test gratuit<span className="sr-only">(current)</span>
                </Link >

                <Link  className="nav-link"
                  href="" 
                  onClick={this.handleScroll}        
                  to="tarifs"
                  spy={true} 
                  smooth={true}>
                    Tarifs <span className="sr-only">(current)</span>
                </Link >

                <Link  className="nav-link"
                  href="" 
                  onClick={this.handleScroll}        
                  to="contact"
                  spy={true} 
                  smooth={true}>
                    Nous contacter <span className="sr-only">(current)</span>
                </Link >
                {currentUser ? ( 
                  <>     
                      <NavLink href="/board-search" to={"/board-search"} className="nav-link">
                        Mon espace
                      </NavLink>
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        Déconnexion
                      </a>
                  </>
                ) : (
                  <div>
                    <NavLink href="login-page">
                      Connexion
                    </NavLink>
                  </div>
                )}
                </div>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
        </header>
      </>
    );
  }
}

export default LegaNavbars;