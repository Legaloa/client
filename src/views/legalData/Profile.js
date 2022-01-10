import React from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import UserNavbar from "components/Navbars/UserNavbar";
const user = AuthService.getCurrentUser();
class Profile extends React.Component {

  constructor(props){
    super(props);
    this.retrieveUserInformation= this.retrieveUserInformation.bind(this);
    this.state = {
      currentUser: undefined
    }
  }


  componentDidMount() {
    console.log("didmount");
    this.retrieveUserInformation()
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  retrieveUserInformation() {
    console.log("retriveInformation");
    UserService.findByUsername(user.username)
      .then(response => {
        this.setState({
          currentUser: response.data[0]
        });
        console.log(this.state.currentUser.username);
 
    
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    console.log("render");
    return (
      <>
        <UserNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0" style={{ height: '300px' }} >

          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src="https://lh5.googleusercontent.com/proxy/PigxOVqG50fy57LwMQ2bBdvp09o93GgNLwLYLxUsW-9IW7MEkeJySNjZX_ikleNQalqnso0L8RJ3212xKWdkhAiuMmCvFQCkIkFyUT9kaTwlJyg=s0-d"
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                       {this.state.currentUser ? (
                         <div className="card-profile-actions py-4 mt-lg-0">
                         {this.state.currentUser.statusId == 1 
                         ? <Button
                         className="mr-4"
                         color="success"
                         href="#"
                         onClick={e => e.preventDefault()}
                         size="sm"
                       >
                         Gratuit: 7 jours
                       </Button> : <Button
                         className="mr-4"
                         color="danger"
                         href="#"
                         onClick={e => e.preventDefault()}
                         size="sm"
                       >
                         Mettre à jour votre plan
                       </Button> }

                       
                       <Button
                         className="float-right"
                         color="default"
                         href="#"
                         onClick={e => e.preventDefault()}
                         size="sm"
                       >
                          {this.state.currentUser.createdAt}
                       </Button>
                     </div>
                       ) : (
                        <div>
                          <p>Please cleck db...</p>
                        </div>
                      )}
                      
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">Email</span>
                          <span className="description">{user.email}</span>
                        </div>
                        <div>
                          <span className="heading">Phone</span>
                          <span className="description">{user.phone}</span>
                        </div>
                        <div>
                          <span className="heading">Username</span>
                          <span className="description">{user.username}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h4>
                      Entrepise -{user.entreprise}{" "}
                    </h4>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Profile -<span className="description">{user.profil}</span>
                    </div>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Date de naissance -<span className="description">{user.dateNaissance}</span>
                    </div>
                    <div className="h6 font-weight-300">
                      <i className="ni business_briefcase-24 mr-2" />
                      Nom - {user.nom}
                    </div>
                    <div className="h6 font-weight-300">
                      <i className="ni education_hat mr-2" />
                      Prenom - {user.prenom}
                    </div>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Profile;
