import React from "react";
import { Link } from "react-router-dom";
import Logo from "assets/img/brand/Logo.png";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
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

const user = AuthService.getCurrentUser();
class UserNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
    const user = AuthService.getCurrentUser();
    if (!user) {
      return this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.retrieveUserInformation()

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.roles.includes("ROLE_USER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  retrieveUserInformation() {
    console.log("retriveInformation");
    const user = AuthService.getCurrentUser();
    UserService.findByUsername(user.username)
      .then(response => {
        this.setState({
          currentUser: response.data[0]
        });
        var dateToday = new Date(Date.now());
        var dateCreation = new Date(this.state.currentUser.createdAt);
        var dateLimit = new Date(this.state.currentUser.createdAt);
        dateLimit.setDate(dateCreation.getDate() + 7);

        if (dateToday > dateLimit) {
          console.log("Test gratuit finalisée");
          AuthService.update(this.state.currentUser.username, 2);
        } else {
          console.log("Vous avez encore le tems");
          AuthService.update(this.state.currentUser.username, 1);
        }
        console.log("Today: " + dateToday);
        console.log("Limit: " + dateLimit);
        console.log("Creation: " + dateCreation);
      })
      .catch(e => {
        console.log(e);
      });
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    console.log(currentUser);

    return (

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
                      src={Logo}
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
                <div className="navbar-nav ml-auto">
                  <NavLink href="/document-page" to={"/document-page"} className="nav-link">
                    Ajouter documents
                  </NavLink>
                  <NavLink href="/article-page" to={"/article-page"} className="nav-link">
                    Ajouter articles
                  </NavLink>
                </div>

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
              ) : (
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