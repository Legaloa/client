import React from "react";
import { Link } from "react-router-dom";
import  { Redirect } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
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
        This field is required!
      </div>
    );
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      currentUser: undefined
    };
  }

  onChangeUsername(e) {
    console.log("esta funcando");
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
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

    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  render() {
    const { currentUser} = this.state;
    return (
      <>
       {currentUser ? (<Redirect to='/board-search'  />) :null}
        {/* Navbar primary */}
        <header className="header-global">

          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/home" tag={Link}>
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
            <Container className="pt-lg-2">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">

                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src="data:image/png;base64,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"
                            />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                      </div>
                      <Form role="form"
                        onSubmit={this.handleLogin}
                        ref={c => {
                          this.form = c;
                        }}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              className="form-control"
                              name="username"
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                              validations={[required]} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="password"
                              className="form-control"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChangePassword}
                              validations={[required]}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <button
                            className="btn btn-warning btn-block"
                            disabled={this.state.loading}
                          >
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span className="spam_title">Entrer</span>
                          </button>
                        </div>
                        {this.state.message && (
                          <div className="form-group">
                            <div className="alert alert-danger" role="alert">
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
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="/register-page"
                      >
                        <small>Create new account</small>
                      </a>
                    </Col>

                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Login;
