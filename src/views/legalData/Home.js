import React from "react";
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import LegalNavbar from "components/Navbars/LegalNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

// new index page sections

class Landing extends React.Component {
  state = {};
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
              backgroundImage: `url("https://i1.sndcdn.com/artworks-000210928947-bata5q-t500x500.jpg")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}>

              <Container className="py-lg-md d-flex">
                <div className="col px-0" >
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                        VOTRE PLATEFORME JURIDIQUE 100% en ligne {" "}
                        <span>Simple - Rapide - Efficace</span>
                      </h1>
                      <p className="lead text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque
                        id diam at porttitor. Nam quis felis tellus. Phasellus sit amet purus elit.
                        Sed tincidunt at urna vel hendrerit. Donec convallis nibh id volutpat bibendum. .
                      </p>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          href="login-page"
                        >
                          <span className="btn-inner--text">Testez gratuitement</span>
                        </Button>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          href="register-page"
                        >
                          <span className="btn-inner--text">
                            S'enregistrer
                          </span>
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
                    src="https://img.freepik.com/free-photo/man-home-working-laptop_23-2148560379.jpg?size=626&ext=jpg"
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                      <i className="ni ni-settings-gear-65" />
                    </div>
                    <h3>BIG DATA et VEILLE JURIDIQUES</h3>
                    <p>
                      Accéder à toute l'information juridique  en seul clic.
                      Legaloa regroupe toute la règlementation juridique disponible et la rend accessible directement via son moteur de recherche puissant.
                      C'est aussi un outil de veille permettant de rester informer sur l'actualité juridique.
                    </p>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-settings-gear-65" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                              Accéder à toute l'information juridique  en seul clic.
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-html5" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0"> Accéder à toute l'information juridique  en seul clic.</h6>
                          </div>
                        </div>
                      </li>
                      <div className="btn-wrapper">
                        <Button block
                          size="lg"
                          color="default"
                          href="login-page"
                        >
                          <span className="btn-inner--text">Testez gratuitement</span>
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
                      src="https://cdn.clinicabaviera.com/blog/wp-content/uploads/2016/09/iStock_89119321_SMALL.jpg"
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
                        Legaloa.
                      </h4>
                      <p className="lead text-italic text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam pellentesque id diam at porttitor.
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
                    <p className="lead">
                      Grace à son moteur de recherche, Legaloa vous permet de retrouver rapidement le contenu de n'importe quel texte juridique
                      ainsi que de la jurisprudence en toute simplicité.
                    </p>
                    <p>
                      Plus besoin de se perdre dans les supports papiers, les recherches infructueuses et les déplacements incessantes.
                      Accéder simplement aux décisions de justice de la première instance à la cour de cassation,
                    </p>
                    <p>
                      aux lois, règlements, décrets, circulaires... n'importe où que vous soyez.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section pb-0 bg-gradient-default" id="about">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-lg-2 ml-lg-auto" md="6">
                  <div className="position-relative pl-md-5">
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src="https://media.istockphoto.com/photos/cropped-image-of-man-with-coffee-cup-and-doughnut-working-at-table-picture-id1011411270?b=1&k=6&m=1011411270&s=170667a&w=0&h=8joiE9tn7Ko-4XPCsVo_cR3uogkQC0a1jhorph9r3DU="
                    />
                  </div>
                </Col>
                <Col className="order-lg-1" lg="6">
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                        <i className="ni ni-building text-primary" />
                      </div>
                    </div>
                    <div className="pl-4">
                      <h4 className="display-3 text-white">à-propos</h4>
                      <p className="text-white">
                        Grace à son moteur de recherche, Legaloa vous permet de retrouver rapidement
                        le contenu de n'importe quel texte juridique
                        ainsi que de la jurisprudence en toute simplicité.
                      </p>
                    </div>
                  </div>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-satisfied" />
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                            Support
                          </h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aliquam pellentesque id diam at porttitor.
                            Nam quis felis tellus. Phasellus sit amet purus elit.
                            Sed tincidunt at urna vel hendrerit.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-active-40" />
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-warning">
                            Functionamment
                          </h5>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aliquam pellentesque id diam at porttitor.
                            Nam quis felis tellus. Phasellus sit amet purus elit.
                            Sed tincidunt at urna vel hendrerit.
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam pellentesque id diam at porttitor. .
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src="https://lh5.googleusercontent.com/proxy/PigxOVqG50fy57LwMQ2bBdvp09o93GgNLwLYLxUsW-9IW7MEkeJySNjZX_ikleNQalqnso0L8RJ3212xKWdkhAiuMmCvFQCkIkFyUT9kaTwlJyg=s0-d"
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Sadam</span>
                        <small className="h6 text-muted">Poste</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="warning"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
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
                          Poste
                        </small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-YUH7CCz_7w8amU_UIKuObVvNPcfoQ7k5DptKguq3Ih86Gtxq-K9ztm72QcTggXkjpbs&usqp=CAU"
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Prenom</span>
                        <small className="h6 text-muted">Poste</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="info"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="mb-5 mb-lg-0" lg="3" md="6">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjX3SOTIfrK1Kt1czaejkmTg6i93_WjzivjdnJPNLO2dttISoDQ3KrFEzrOhCTelV00mY&usqp=CAU"
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Prenom</span>
                        <small className="h6 text-muted">Poste</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="success"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="success"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="success"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque id diam at porttitor. .
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
                            Avocat individuel
                          </h6>
                          <p className="description mt-3">
                            ...000 F CFA/MOIS
                          </p>
                          <div>
                            <Badge color="primary" pill className="mr-1">
                              design
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              system
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              creative
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Abonnement
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-istanbul" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            Cabinet d'avocats
                          </h6>
                          <p className="description mt-3">
                            OFFRE PERSONNALISÉE
                          </p>
                          <div>
                            <Badge color="success" pill className="mr-1">
                              business
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              vision
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              success
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="success"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Nous contacter
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-planet" />
                          </div>
                          <h6 className="text-warning text-uppercase">
                            Entreprise
                          </h6>
                          <p className="description mt-3">
                            OFFRE PERSONNALISÉE
                          </p>
                          <div>
                            <Badge color="warning" pill className="mr-1">
                              marketing
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              product
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              launch
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="warning"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Nous contacter
                          </Button>
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
                  <p className="lead text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam pellentesque id diam at porttitor. .
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center mt--30" >
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">Vous avez des questions?</h4>
                      <p className="mt-0">
                        Ton avie...
                      </p>
                      <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-user-run" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Your name"
                            type="text"
                            onFocus={e => this.setState({ nameFocused: true })}
                            onBlur={e => this.setState({ nameFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.emailFocused
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email address"
                            type="email"
                            onFocus={e => this.setState({ emailFocused: true })}
                            onBlur={e => this.setState({ emailFocused: false })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="Type a message..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          Send Message
                        </Button>
                      </div>
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
