import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Logo from "assets/img/brand/Logo.png";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  InputGroup,
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand
} from "reactstrap";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ceci n'est pas un email valide.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit comporter entre 3 et 20 caractères.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit comporter entre 6 et 40 caractères.
      </div>
    );
  }
};


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeDateNaissance = this.onChangeDateNaissance.bind(this);
    this.onChangeEntreprise = this.onChangeEntreprise.bind(this);
    this.onChangeProfil = this.onChangeProfil.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);

    this.onChangeCheckTerm = this.onChangeCheckTerm.bind(this);


    this.state = {
      username: "",
      email: "",
      password: "",
      genre: "",
      prenom: "",
      nom: "",
      dateNaissance: "",
      entreprise: "",
      profil: "",
      code: "",
      phone: "",
      successful: false,
      message: "",
      checkTerm: false,
      currentUser: undefined
    };
  }

  onChangeCheckTerm() {
    this.setState({
      checkTerm: !this.state.checkTerm
    });


  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    });
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }

  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangeDateNaissance(e) {
    this.setState({
      dateNaissance: e.target.value
    });
  }

  onChangeEntreprise(e) {
    this.setState({
      entreprise: e.target.value
    });
  }

  onChangeProfil(e) {
    this.setState({
      profil: e.target.value
    });
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if(this.state.checkTerm == false || this.state.genre == 0){
      alert("vous devez remplir tous les champs et accepter les conditions générales pour continuer");
    }else{
      if (this.checkBtn.context._errors.length === 0) {
        AuthService.register(
          this.state.nom,
          this.state.prenom,
          this.state.dateNaissance,
          this.state.code,
          this.state.phone,
          this.state.genre,
          this.state.entreprise,
          this.state.profil,
          this.state.username,
          this.state.email,
          this.state.password
        ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
    }

    
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  render() {
    const { currentUser, genre } = this.state;
    console.log(genre);
    return (
      <>
        {currentUser ? (<Redirect to='/board-search' />) : null}
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
            </Container>
          </Navbar>
        </header>

        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <Container className="py-md">
              <Row className="row-grid justify-content-between align-items-center">
                <Col lg="6">
                  <h3 className="display-3 text-white">
                    Testez gratuitement Legaloa.com pendant 7 jours.
                    <h6 className="lead text-white">Accéder gratuitement à l’ensemble des textes pour vous faire une idée.
                    </h6>
                  </h3>

                  <ul className="text-white">
                    <li>Accès illimitée à la base et aux fonctionnalités</li>
                    <li>Accès au moteur de recherche</li>
                    <li>Recherche avancée grâce aux filtres et consultation de
                      la base documentaire</li>
                    <li>Veille jurisprudentielle et actualités juridiques</li>
                  </ul>
                </Col>

                <Col className="mb-lg-auto" lg="6">
                  <div className="transform-perspective-right">
                    <Card className="bg-secondary shadow border-0">
                      <CardBody className="px-lg-12 py-lg-12">
                        <div className="text-center text-muted mb-4">
                          <small>S'enregistrer</small>
                        </div>
                        <Form onSubmit={this.handleRegister}
                          ref={c => {
                            this.form = c;
                          }}>
                          {!this.state.successful && (
                            <div>
                              <Row>
                                <Col md="6">
                                  <FormGroup>
                                    <select className="form-control" name="genre" value={this.state.genre} onChange={this.onChangeGenre}>
                                      <option value="0">Choisir genre</option>
                                      <option key="1" value="Monsieur">Monsieur</option>
                                      <option key="2" value="Madame">Madame</option>
                                    </select>
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                    <InputGroup > 
                                      <Input type="DATE"
                                        placeholder="Date de naissance"
                                        className="form-control"
                                        name="dateNaissance"
                                        value={this.state.dateNaissance}
                                        validations={[required]} 
                                        onChange={this.onChangeDateNaissance} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="6">
                                  <FormGroup >
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Prénom"
                                        className="form-control"
                                        name="prenom"
                                        value={this.state.prenom}
                                        validations={[required]} 
                                        onChange={this.onChangePrenom} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Nom"
                                        className="form-control"
                                        name="nom"
                                        value={this.state.nom}
                                        validations={[required]} 
                                        onChange={this.onChangeNom} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Addresse e-mail"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Numéro de téléphone"
                                        className="form-control"
                                        name="phone"
                                        value={this.state.phone}
                                        validations={[required]} 
                                        onChange={this.onChangePhone} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Entreprise"
                                        className="form-control"
                                        name="entreprise"
                                        value={this.state.entreprise}
                                        validations={[required]} 
                                        onChange={this.onChangeEntreprise} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Métier"
                                        className="form-control"
                                        name="profil"
                                        value={this.state.profil}
                                        validations={[required]} 
                                        onChange={this.onChangeProfil} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Username"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row className="my-4">
                                <Col xs="12">
                                  <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                      className="custom-control-input"
                                      id="customCheckRegister"
                                      onChange={this.onChangeCheckTerm}
                                      type="checkbox" 
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="customCheckRegister"
                                    >
                                      <span>
                                        J’accepte les conditions générales {" "}
                                        <a
                                          href="#"
                                          onClick={e => e.preventDefault()}
                                        >
                                          d’utilisation et de vente.
                                        </a>
                                      </span>
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                              <div className="text-center">
                                <Button color="default" >J’essaye gratuitement</Button>
                              </div>
                            </div>
                          )}
                          {this.state.message && (
                            <div className="form-group">
                              <div
                                className={
                                  this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                                }
                                role="alert"
                              >
                                {this.state.message}
                              </div>
                            </div>
                          )}
                          <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                              this.checkBtn = c;
                            }}
                          />
                        </Form>
                        <Link style={{ color: "blue" }} to={"/login-page"} className="nav-link text-center">
                        Se connecter à son compte
                        </Link>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Container>

          </section>
        </main>
      </>
    );
  }
}

export default Register;
