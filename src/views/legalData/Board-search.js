import React, { Component } from "react";
import { Link } from "react-router-dom";
import  { Redirect } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import ArticleDataService from "../../services/article.service.js";
import DocumentDataService from "../../services/document.service.js";
import DomaineDataService from "../../services/domaine.service";
import OrganismeDataService from "../../services/organisme.service";
import TypeDataService from "../../services/type.service";
import UserNavbar from "components/Navbars/UserNavbar";
import "react-datepicker/dist/react-datepicker.css";

// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";


import {
  Input,
  Container,
  Row,
  Button,
  Col,
  Modal,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner
} from "reactstrap";


export default class BoardSearch extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchDomaine = this.onChangeSearchDomaine.bind(this);
    this.onChangeSearchType = this.onChangeSearchType.bind(this);
    this.onChangeSearchOrganisme = this.onChangeSearchOrganisme.bind(this);
    this.onChangeSearchDate = this.onChangeSearchDate.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.retrieveDomaines = this.retrieveDomaines.bind(this);
    this.retrieveDocuments = this.retrieveDocuments.bind(this);
    this.retrieveTypes = this.retrieveTypes.bind(this);
    this.retrieveOrganismes = this.retrieveOrganismes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDocument = this.setActiveDocument.bind(this);
    this.removeAllDocuments = this.removeAllDocuments.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      articles: [],
      documents: [],
      domaines: [],
      organismes: [],
      types: [],
      currentDocument: null,
      currentIndex: -1,
      searchTitle: "",
      searchDomaine: "",
      searchType: "",
      searchOrganisme: "",
      searchDate: "",
      resultado: false,
      hidden: false,

      currentPage: 1,
      todosPerPage: 20,
      message: "",

      currentUser: undefined
    };
    const user = AuthService.getCurrentUser();
    if(!user){
      return this.props.history.push('/login');
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.retrieveArticles();
    this.retrieveDocuments();
    this.retrieveDomaines();
    this.retrieveTypes();
    this.retrieveOrganismes();
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    this.retrieveArticles();
    this.retrieveDocuments();
    this.retrieveDomaines();
    this.retrieveTypes();
    this.retrieveOrganismes();

    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  onChangeSearchType(e) {
    const searchType = e.target.value;
    this.setState({
      searchType: searchType
    });
  }

  onChangeSearchDomaine(e) {
    const searchDomaine = e.target.value;
    this.setState({
      searchDomaine: searchDomaine
    });
  }

  onChangeSearchOrganisme(e) {
    const searchOrganisme = e.target.value;
    this.setState({
      searchOrganisme: searchOrganisme
    });
  }

  onChangeSearchDate(e) {
    const searchDate = e;
    this.setState({
      searchDate: searchDate
    });
  }

  retrieveArticles() {
    ArticleDataService.getAll()
      .then(response => {
        this.setState({
          articles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveDomaines() {
    DomaineDataService.getAll()
      .then(response => {
        this.setState({
          domaines: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveDocuments() {
    DocumentDataService.getAllDocs()
      .then(response => {
        this.setState({
          documents: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveTypes() {
    TypeDataService.getAll()
      .then(response => {
        this.setState({
          types: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveOrganismes() {
    OrganismeDataService.getAll()
      .then(response => {
        this.setState({
          organismes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDocuments();
    this.setState({
      currentDocument: null,
      currentIndex: -1
    });
  }

  removeAllDocuments() { 
    DocumentDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    DocumentDataService.getAll(this.state.searchTitle, this.state.searchType, this.state.searchOrganisme, this.state.searchDomaine, this.state.searchDate._d)
      .then(response => {
        this.setState({
          documents: response.data,
          resultado: true,
          hidden: false
        });

        let palabras = this.state.searchTitle.toLowerCase().split(" ");
        let clases = document.getElementsByClassName("parrafoClase");

        for(let i = 0; i < clases.length; i++){
          let textoLimpio = clases[i].innerHTML.toLowerCase().replace(/[¡!.,'´’-]/gi,'');
          for(let palabra of palabras){    
            if(palabra !=""){
              if(textoLimpio.includes(palabra)){
                document.getElementsByClassName("parrafoClase")[i].innerHTML = textoLimpio.replaceAll(palabra, '<mark>'+palabra.toLowerCase()+'</mark>');;
              }
            } 
        }
      }
       
      })
      .catch(e => {
        console.log(e);
      });
      this.setState({
        hidden: true
      });   

  }

  voirTous(resultado){
    this.retrieveDocuments();
      this.setState({
          resultado: false
      })   
  }


  toggleModal (state, document, index) {
    this.setState({
      currentDocument: document,
      currentIndex: index,
      [state]: !this.state[state]
    });
    console.log(this.state.currentDocument);

  };

  setActiveDocument(document, index) {
    this.setState({
      currentDocument: document,
      currentIndex: index
    });
  }


  render() {

    const { searchTitle, currentDocument, documents, organismes,types, domaines } = this.state;
    const {  currentPage, todosPerPage } = this.state;

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      console.log(documents);
      const currentTodos = documents.slice(indexOfFirstTodo, indexOfLastTodo);    
      const renderTodos =  currentTodos.map(document =>
      
       <Col lg="12" md="12" sm="12" key={document.id} style={{marginBottom: '30px'}}>
             <div className="card shadow" style={{borderRadius: '1.25rem'}}>
               <div className="card-body" >
                  <h5 className="card-title">{document.intituleDoc}</h5>
                  <label> <strong>DOMAINE:</strong> {document.domaine.domaine} </label> <br></br>  
                  <label> <strong>TYPE DOCUMENT:</strong> {document.type.type} </label> <br></br>
                  <label> <strong>ORGANISME:</strong> {document.organisme.name} </label> <br></br>
                  <label> <strong>DATE ADOPTION:</strong> {document.dateAdoption} </label> <br></br>
                  <p className="card-text">{document.description}</p>               
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => this.toggleModal("defaultModal",document)}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-bag-17" />
                        </span>
                        <span className="btn-inner--text">Lire</span>
                      </Button>
               </div>
             </div> 
         </Col>
         );

         const currentResultados = documents;
         const renderResultados =  currentResultados.map(document =>

          <Col lg="12" md="12" sm="12" key={document.id} style={{marginBottom: '30px'}}>
              
             <div className="card shadow" style={{borderRadius: '1.25rem'}}>
               <div className="card-body" >
                  <h5 className="card-title">{document.intituleDoc}</h5>
                  <label> <strong>DOMAINE:</strong> {document.domaine.domaine} </label> <br></br>  
                  <label> <strong>TYPE DOCUMENT:</strong> {document.type.type} </label> <br></br>
                  <label> <strong>ORGANISME:</strong> {document.organisme.name} </label> <br></br>
                  <label> <strong>DATE ADOPTION:</strong> {document.dateAdoption} </label> <br></br>
                  <label> <strong>ARTICLES:</strong>  
                              {document.article.map((ar, index) => (
                                  <p key={ar.id} id="demo" className="parrafoClase">{ar.intituleArticle}</p>
                              ))}
                  </label> <br></br>              
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => this.toggleModal("defaultModal",document)}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-bag-17" />
                        </span>
                        <span className="btn-inner--text">Lire</span>
                      </Button>
               </div>
             </div> 
         </Col>
            );

         // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(documents.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <Button
              key={number}
              id={number}
              onClick={this.handleClick}
              variant="contained"
              color="success"
              className="btn-round"
            >
              {number}
            </Button>
          );
        });
        const { resultado} = this.state;

        return (
          
          <>
            <UserNavbar />
              <Container className="mb-5">
                  {/* Inputs */}
                  <h3 className="h4 text-success font-weight-bold mb-4">Chercher</h3>
                  <div className="mb-3">
                    <small className="text-uppercase font-weight-bold">
                    Écrivez des mots-clés
                    </small>
                  
                  </div>
                  <Row>
                  <div className="col-md-12">
                    <div className="input-group mb-3">
                        <Input
                          id="idTitle"     
                          placeholder="Search by title"
                          value={searchTitle}
                          onChange={this.onChangeSearchTitle}/>
                            <div className="input-group-append">
                              <Button
                                color="success"
                                type="button"
                                onClick={this.searchTitle}>
                                Search
                              </Button>
                          </div>
                        </div>
                    </div>
                  </Row>
                  
                  
                  <Row>
                    <Col className="mt-4 mt-md-0" lg="3" sm="6">
                      {/* Toggle buttons */}
                      <FormGroup>
                      <small className="text-uppercase font-weight-bold">
                          Domaine
                      </small>
                                      <select className="form-control" name="idDomaine" id="idDomaine"  value={this.state.searchDomaine} onChange={this.onChangeSearchDomaine}>
                                            <option value="0">Choisir domaines</option>
                                            {domaines.map(domaine =>
                                            <option key={domaine.id} value={domaine.id}>{domaine.domaine}</option>
                                              )}
                                      </select>
                      </FormGroup>
                    </Col>
                    <Col className="mt-4 mt-md-0" lg="3" sm="6">
                      {/* Toggle buttons */}
                      <FormGroup>
                      <small className="text-uppercase font-weight-bold">
                          Type document
                      </small>
                                      <select className="form-control" name="idType" id="idType"  value={this.state.searchType} onChange={this.onChangeSearchType}>
                                            <option value="0">Choisir type document</option>
                                            {types.map(type =>
                                            <option key={type.id} value={type.id}>{type.type}</option>
                                              )}
                                      </select>
                      </FormGroup>
                    </Col>
                    <Col className="mt-4 mt-md-0" lg="3" sm="6">
                      {/* Toggle buttons */}
                      <FormGroup>
                      <small className="text-uppercase font-weight-bold">
                          Organisme
                      </small>
                                      <select className="form-control" name="idOrganisme" id="idOrganisme"  value={this.state.searchOrganisme} onChange={this.onChangeSearchOrganisme}>
                                            <option value="0">Choisir Organisme</option>
                                            {organismes.map(organisme =>
                                            <option key={organisme.id} value={organisme.id}>{organisme.name}</option>
                                              )}
                                      </select>
                      </FormGroup>
                    </Col>

                    <Col className="mt-4 mt-md-0" lg="3" sm="6">
                      {/* Toggle buttons */}
                      <FormGroup>
                      <small className="text-uppercase font-weight-bold">
                          Date
                      </small>
                          <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <ReactDatetime
                                id="idDate"
                                inputProps={{
                                  placeholder: "Date Picker Here"
                                }}
                                value={this.state.searchDate}
                                timeFormat={false}
                                onChange={e =>
                                  this.onChangeSearchDate(e)
                                }
                       
                              />
                              
                          </InputGroup>

                      </FormGroup>
                    </Col>
                  </Row> 


                  <Col md="12">
                  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                  {this.state.hidden == true && <Spinner animation="grow" variant="info"/>}
                  </div>
                    <div className="row" >
                      {resultado == false && renderTodos}
                      {resultado == true && 
                      <div className="row" >
                        <Button
                        className="text-success ml-1"
                        color="link" 
                        onClick={() => this.voirTous(resultado)}
                        >
                        Voir tous les documents
                        </Button>
                        {renderResultados}
                      </div>}
                    </div>

                    
                                
                    <div className="pagination" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                      {resultado == false && renderPageNumbers}
                    </div>
                  </Col>
              </Container>

              <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Document
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>

              {currentDocument ? (
              <div className="modal-body" >
                <h5 className="card-title">{currentDocument.intituleDoc}</h5>
                <label> <strong>DOMAINE:</strong> {currentDocument.domaine.domaine} </label> <br></br>  
                <label> <strong>TYPE DOCUMENT:</strong> {currentDocument.type.type} </label> <br></br>
                <label> <strong>ORGANISME:</strong> {currentDocument.organisme.name} </label> <br></br>
                <label> <strong>DATE ADOPTION:</strong> {currentDocument.dateAdoption} </label> <br></br>
                <p className="card-text">{currentDocument.description}</p> 
                <label> <strong>ARTICLES:</strong>  
                            {currentDocument.article.map((ar, index) => (
                                <p key={ar.id} >{ar.intituleArticle}</p>
                            ))}
                </label> <br></br>   

                      <Link to={{pathname: "http://localhost:8080/docs/"+currentDocument.route}} target="_blank">
                      <Button color="primary" type="button">
                      Télécharcher document complet
                      </Button>
                      </Link>          
             </div>
                ) : (
                  <div>
                    <p>Please click on a Tutorial...</p>
                  </div>
                )}
              <div className="modal-footer">

                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>



                

          </>
        );
  }
}
