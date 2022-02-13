import React from "react";
import { Link } from 'react-scroll';
import CheckButton from "react-validation/build/button";
import img from "assets/img/brand/accueil.png";
import img2 from "assets/img/brand/BigData.png";
import img3 from "assets/img/brand/Acces.png";
import img4 from "assets/img/brand/Apropos.png";
import emailjs from 'emailjs-com';
import "./Home.css";

import  Input from "react-validation/build/input";
import { isEmail } from "validator";
import Form from "react-validation/build/form";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import LegalNavbar from "components/Navbars/LegalNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

const required = value => {
  console.log("se aplica el required");
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




// new index page sections

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.sendEmail = this.sendEmail.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);

    this.state = {
      message: "",
      loading: false,
      successful: false,

    };
  }

  
  onChangeMessage(e) {
    this.setState({
      message: e.target.value
    });
  }


  sendEmail(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      emailjs.sendForm('service_1yt9tqw', 'template_lxed5wc', e.target, 'user_G5zQkiM0RYs1ctpJGQUH5')
      .then((result) => {
        this.setState({
          message: "Message envoyé",
          successful: true,
          loading: false
        });
        console.log(result.text);
        console.log(this.message);
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
      console.log(error.text);
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <LegalNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250" style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              paddingTop: '160px'
            }}>

              <Container className="py-lg-md d-flex">
                <div className="col px-0" >
                  <Row>
                    <Col lg="6">
                      <h2 className="display-3 text-black" >
                        VOTRE PLATEFORME JURIDIQUE 100% digitalisée! {" "}
                        <span style={{"font-weight": "bold"}}>Simple - Rapide - Efficace</span>
                      </h2>

                      <p className="text-black" align="justify" style={{"font-weight": "bolder"}} >
                        LEGALOA, la LegalTech dédiée aux professionnels du droit de l’espace
                        OHADA et aux chercheurs de la diaspora africaine en France et
                        d’ailleurs. C’est une plateforme juridique utilisant l’intelligence
                        artificielle pour permettre de retrouver plus facilement et de façon
                        intuitive le contenu des textes juridiques nationaux (Lois,
                        règlements, décrets, arrêtés...) et de la jurisprudence des pays
                        membres de l’OHADA à commencer par le Burkina Faso.
                      </p>
                      <div >
                        <Button
                          type="button"
                          color="default"
                          href="register-page"
                        >
                          <span className="btn-inner--text">Testez gratuitement</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
            {/* 1st Hero Variation */}
          </div>

          <section className="section section-lg" id="test">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src={img2}
                  />
                  <br></br>
                  <br></br>
                  <h6>Testez gratuitement votre plateforme
                    pendant 7 jours.</h6>
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h3>BIG DATA ET VEILLE JURIDIQUES</h3>
                    <p align="justify">
                      LEGALOA regroupe toute la règlementation juridique disponible
                      et la rend accessible directement via son moteur de recherche
                      intelligent. Faites vos recherches en utilisant également notre
                      filtre en choisissant les types de documents, domaines du droit,
                      organismes , ou simplement en tapant une date de référence.
                    </p>
                    <p align="justify">
                      Grâce à son outil de veille intégré, restez informer sur l'actualité
                      juridique.
                    </p>
                    <ul className="list-unstyled mt-2">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0" align="justify">
                              - Accéder au plus grand fonds juridique burkinabè en un
                              seul clic.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0" align="justify"> - Tous les textes de l’OHADA (Traités, Règlements &
                              jurisprudences) ainsi que d’autres organisations régionales
                              et internationales</p>
                          </div>
                        </div>
                      </li>
                      <div className="btn-wrapper">
                        <Button block
                          size="lg"
                          color="default"
                          href="login-page"
                        >
                          <span className="btn-inner--text">Testez gratuitement.</span>
                        </Button>
                      </div>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section bg-secondary">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="6">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={img3}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h4 className="display-3 font-weight-bold text-white">
                        LEGALOA.
                      </h4>
                      <p className="lead text-italic text-white" align="justify">
                        Votre temps est précieux. Gagnez un temps fou
                        dans vos recherches.
                      </p>
                    </blockquote>
                  </Card>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                      <i className="ni ni-settings" />
                    </div>
                    <h3>Avoir l'information juridique à portée de mains.</h3>
                    <p align="justify">
                      Grace à son moteur de recherche, Legaloa vous permet de retrouver rapidement le contenu de n'importe quel texte juridique
                      ainsi que de la jurisprudence en toute simplicité.
                    </p>
                    <p align="justify">
                      Plus besoin de se perdre dans les supports papiers, les recherches infructueuses et les déplacements incessantes.
                      Accéder simplement aux décisions de justice de la première instance à la cour de cassation,  aux lois, règlements, décrets, circulaires... n'importe où que vous soyez.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section pb-0 bg-gradient-default" id="about">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-lg-1" lg="6">
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                        <i className="ni ni-building text-primary" />
                      </div>
                    </div>
                    <div className="pl-4">
                      <h4 className="display-3 text-white">À-propos</h4>
                      <p className="text-white" align="justify">
                      LEGALOA est une plateforme qui rassemble et met à la disposition des hommes de lois 
                      (Avocats, Services juridiques des entreprises, universitaires...),
                      les textes juridiques et jurisprudences spécifiques aux pays d’Afrique del’Ouest, quelque soit la juridiction.
                      </p>
                      <p className="text-white" align="justify">
                        Nous collectons et numérisons les textes juridiques en vigueurs dans les Etats membres
                        de l’OHADA en Commençant par le Burkina Faso et les rendons accessibles via un
                        moteur de recherche puissant utilisant l’intelligence artificielle et compresser ainsi le
                        temps de recherche.
                      </p>
                      <p className="text-white" align="justify">
                      LEGALOA c’est aussi, un outil de veille juridique pour vous permettre de rester informer
                      sur l’actualité juridique.
                    </p>
                    <p className="text-white" align="justify">
                      Notre mission est de rendre le droit ouest-africain transparent pour tous les acteurs
                      aussi bien au plan national qu’international.
                    </p>
                    </div>
                  </div>
                </Col>
                <Col className="order-lg-2 ml-lg-auto" md="6">
                  <div className="position-relative pl-4">
                    <img
                      alt="..."
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      className="img-center img-fluid"
                      src={img4}
                    />
                    <br></br>
                  </div>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section section-lg" id="equipe">
            <Container>
              <Row className="justify-content-center text-center mb-lg">
                <Col lg="8">
                  <h2 className="display-3">Notre équipe </h2>
                  <p className="lead text-muted">
                   Une équipe dynamique pour vous satisfaire
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src="https://scontent-cdg2-1.xx.fbcdn.net/v/t1.6435-9/205611501_4138286209585599_7730833340706338022_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Yf-pCBmrIoEAX8sWhvP&tn=5U11Ihbp5_PWQS_J&_nc_ht=scontent-cdg2-1.xx&oh=00_AT_CrBvOfDSFQlrorOk1bVSgKOZ5rra8MCXlg2t_Pg5Hag&oe=622F8230"
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Sadam</span>
                        <small className="h6 text-muted">CEO</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="warning"
                          href="https://twitter.com/SadamSiby?t=lC-FzQu1_JxjraroEcJWlw&s=08"
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="https://www.facebook.com/sadam.Siby"
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="https://www.linkedin.com/in/sadam-siby-43134b123/"
                        >
                          <i className="fa fa-linkedin" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="6" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src="https://lh5.googleusercontent.com/proxy/PigxOVqG50fy57LwMQ2bBdvp09o93GgNLwLYLxUsW-9IW7MEkeJySNjZX_ikleNQalqnso0L8RJ3212xKWdkhAiuMmCvFQCkIkFyUT9kaTwlJyg=s0-d"
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Dante</span>
                        <small className="h6 text-muted">
                          Developpeur Web
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="primary"
                          href=""
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="primary"
                          href=""
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="primary"
                          href=""
                        >
                          <i className="fa fa-linkedin" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="section section-lg bg-gradient-default" id="tarifs">
            <Container className="pt-lg pb-300">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h2 className="display-3 text-white">Tarifs</h2>
                  <p className="lead text-white">
                    Nous vous proposons des tarifs adaptés et personnalisés selon votre profils .
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            Avocat/Cabinet
                            d’avocat
                          </h6>
                          <p className="description mt-3">
                            Offre personnalisée
                          </p>
                          <Link className="nav-link"
                            href=""
                            onClick={this.handleScroll}
                            to="contact"
                            spy={true}
                            smooth={true}>
                            <Button
                              className="mt-4"
                              color="primary"
                              href=""
                            >
                              Nous contacter
                            </Button>
                          </Link >
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            Entreprises et autres
                            professions
                          </h6>
                          <p className="description mt-3">
                            Offre personnalisée
                          </p>

                          <Link className="nav-link"
                            href=""
                            onClick={this.handleScroll}
                            to="contact"
                            spy={true}
                            smooth={true}>
                            <Button
                              className="mt-4"
                              color="success"
                              href=""
                            >
                              Nous contacter
                            </Button>
                          </Link >
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-warning text-uppercase">
                            Offre étudiante
                          </h6>
                          <p className="description mt-3">
                            Offre adaptée
                          </p>
                          <Link className="nav-link"
                            href=""
                            onClick={this.handleScroll}
                            to="contact"
                            spy={true}
                            smooth={true}>
                            <Button
                              className="mt-4"
                              color="warning"
                              href=""
                            >
                              Nous contacter
                            </Button>
                          </Link >

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>

          <section className="section section-lg pt-lg-0 section-contact-us" id="contact">
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
            <Container>
              <Row className="justify-content-center text-center mb-lg">
                <Col lg="8">
                  <h2 className="display-3">Nous contacter </h2>
                </Col>
              </Row>
              <Row className="justify-content-center mt--30" >
                <Col lg="6">
                  <h6 className="display-4 text-black">
                    Grace à votre abonnement, bénéficiez:
                  </h6>
                  <ul className="text-black">
                    <li>Accès au moteur de recherche, recherche
                      avancée grâce aux filtres et consultation de la
                      base documentaire</li>
                    <li>Espace personnel</li>
                    <li>Veille jurisprudentielle et actualités juridiques</li>
                    <li>Ajout de vos décisions à LEGALOA</li>
                    <li>Assistance personnalisée</li>
                  </ul>
                </Col>
                <Col lg="6">
                    <Card className="bg-gradient-secondary shadow">
                      <CardBody className="p-lg-5">
                        <h4 className="display-6 text-black">Puisque votre temps est précieux, rejoignez-nous !</h4>
                        <p className="mt-0">
                          Entrée en contact avec l’un de nos experts
                        </p>
                        <Form onSubmit={this.sendEmail}
                    ref={c => {
                      this.form = c;
                    }}>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup>
                                <Input type="text"
                                  placeholder="Nom de la structure"
                                  className="form-control"
                                  validations={[required]}
                                  name="entreprise" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup>
                                <Input type="number"
                                  placeholder="Nombre d'utilisateurs"
                                  className="form-control"
                                  validations={[required]}
                                  name="nomUtilisateurs" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup>
                                <Input type="text"
                                  placeholder="Nom"
                                  className="form-control"
                                  validations={[required]}
                                  name="nom" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup>
                                <Input type="text"
                                  placeholder="Prénom"
                                  className="form-control"
                                  validations={[required]}
                                  name="prenom" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup>
                                <Input type="text"
                                  placeholder="Profession"
                                  className="form-control"
                                  validations={[required]}
                                  name="profession" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup>
                                <Input type="text"
                                  placeholder="Pays"
                                  className="form-control"
                                  validations={[required]}
                                  name="pays" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <InputGroup>
                                <Input type="text"
                                  placeholder="Téléphone"
                                  className="form-control"
                                  validations={[required]}
                                  name="telephone" />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                                  <FormGroup>
                                    <InputGroup>
                                      <Input type="text"
                                        placeholder="Addresse e-mail"
                                        className="form-control"
                                        name="email"
                                        validations={[required, email]} />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                        </Row>
                        
                        <Row>
                          <Col md="12">
                            <FormGroup>
                            <InputGroup>
                              <textarea 
                              style={{height: "200px"}}
      
                              type="text"
                                cols="45"
                                name="message"
                                placeholder="Autres commentaires.."
                                className="form-control"
                                rows="12"
                                validations={[required]}
                              />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <div>
                        <div className="form-group">
                          <button
                            className="btn btn-default btn-block"
                            type="submit"
                            disabled={this.state.loading}
                          >
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span className="spam_title">ENVOYEZ</span>
                          </button>
                        </div>
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
                        </div>
                        </Form>
                      </CardBody>
                    </Card>


                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Landing;
