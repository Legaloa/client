import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../../services/auth.service";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class UserNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
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
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    console.log(currentUser);

    
    return (

        <Navbar
          className="navbar-horizontal navbar-dark bg-default"
          expand="lg"
        >
          <Container>
            <NavbarBrand  to="/home" tag={Link}>
              Legaloa
            </NavbarBrand>
            <button
              aria-controls="navbar-primary"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-primary"
              data-toggle="collapse"
              id="navbar-primary"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-primary">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/blue.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-primary"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-primary"
                      data-toggle="collapse"
                      id="navbar-primary"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-lg-auto" navbar>
              {showAdminBoard && (
                  <NavLink href="/board-admin" to={"/board-admin"} className="nav-link">
                    Ajouter documents 
                  </NavLink>
                  
              )}
              {currentUser ? (
                  <div className="navbar-nav ml-auto">     
                      <NavLink href="board-search" to={"/board-search"} className="nav-link">
                        Chercher
                      </NavLink>
                      <NavLink href="profile-page" to={"/profile-page"} className="nav-link">
                        {currentUser.username}
                      </NavLink>
                      <NavLink
                    aria-expanded={false}
                    aria-haspopup={true}
                    data-toggle="dropdown"
                    id="navbar-primary_dropdown_1"
                    onClick={this.logOut}
                    href="/home"
                    role="button"
                  >
                    LogOut
                  </NavLink>
                  </div>
                ): (
                  <div className="navbar-nav ml-auto">
                    <NavLink href="login-page">
                      Connexion
                    </NavLink>
                  </div>
                )}
                
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
    );
  }
}

export default UserNavbar;