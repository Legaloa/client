/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6"></Col>
              <Col className="text-lg-center btn-wrapper" lg="6">
                <Button
                  className="btn-icon-only rounded-circle"
                  color="twitter"
                  href="https://twitter.com/SadamSiby?t=lC-FzQu1_JxjraroEcJWlw&s=08"
                  id="tooltip475038074"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-twitter" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip475038074">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.facebook.com/sadam.Siby"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-facebook-square" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip837440414">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="github"
                  href="https://www.linkedin.com/in/sadam-siby-43134b123/"
                  id="tooltip495507257"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-linkedin" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507257">
                  linkedin
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                  <a href="/" target="_blank">
                    Legaloa
                  </a>
                  .
                </div>
              </Col>
              <Col md="12">
                <Nav className=" nav-footer justify-content-end">
                  <NavItem>
                    <NavLink href="/" target="_blank">
                      Legaloa
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.creative-tim.com/presentation?ref=adsr-footer"
                      target="_blank"
                    >
                      À propos de nous
                    </NavLink>
                  </NavItem>
                  <NavItem>                  <NavLink
                    href="https://www.doctrine.fr/cgu?source=footer_static"
                    target="_blank"
                  >
                    CGU
                  </NavLink></NavItem>
                  <NavItem>                  <NavLink
                    href="https://www.doctrine.fr/donnees_personnelles?source=footer_static"
                    target="_blank"
                  >
                    Données personnelles
                  </NavLink></NavItem>
                  <NavItem>                  <NavLink
                    href="https://www.doctrine.fr/cookies"
                    target="_blank"
                  >
                    Politique de Cookies
                  </NavLink></NavItem>




                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
