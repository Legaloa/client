import React, { Component } from "react";
import ArticleDataService from "../../../services/article.service.js";
import DocumentDataService from "../../../services/document.service.js";
import { Link } from "react-router-dom";
import UserNavbar from "components/Navbars/UserNavbar";


import {
  Input,
  Container,
  Row,
  Button,
  Col,
  Modal
} from "reactstrap";


export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.removeAllArticles = this.removeAllArticles.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.getDocument = this.getDocument.bind(this);

    this.state = {
      articles: [],
      documents: [],
      currentArticle: null,
      currentIndex: -1,
      searchTitle: "",
      resultado: false,

      currentPage: 1,
      todosPerPage: 4,
      currentDocument: {
        id: null,
        intituleDoc: "",
        description: "",
        numero: null
      },
      message: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.retrieveArticles();
    this.retrieveDocuments();
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    this.retrieveArticles();
    this.retrieveDocuments();
    console.log("entra al componentn did mount");

  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
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

  retrieveDocuments() {
    DocumentDataService.getAll()
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

  refreshList() {
    this.retrieveArticles();
    this.setState({
      currentArticle: null,
      currentIndex: -1
    });
  }

  removeAllArticles() {
    ArticleDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    ArticleDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          articles: response.data,
          resultado: !this.state.resultado,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getDocument(id) {
    DocumentDataService.get(id)
      .then(response => {
        this.setState({
          currentDocument: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  toggleModal (state,article, index) {
    this.setState({
      currentArticle: article,
      currentIndex: index,
      [state]: !this.state[state]
    });
  };

  setActiveArticle(article, index) {
    this.setState({
      currentArticle: article,
      currentIndex: index
    });
  }


  render() {
    console.log("entra al render");

    const { searchTitle, articles, currentArticle, documents, currentDocument} = this.state;
    const {  currentPage, todosPerPage } = this.state;

     // Logic for displaying todos
     const indexOfLastTodo = currentPage * todosPerPage;
     const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
     
     const currentTodos = articles.slice(indexOfFirstTodo, indexOfLastTodo);
     console.log("aquí se debe mostrar",articles);
     console.log("indexOfLastTodo",indexOfLastTodo);
     console.log("indexOfFirstTodo",indexOfFirstTodo);
     console.log("currentTodos",currentTodos);
    
     const renderTodos =     currentTodos.map(article =>
      
       <Col lg="12" md="12" sm="12" key={article.id} style={{marginBottom: '30px'}}>
             <div className="card shadow" style={{borderRadius: '1.25rem'}}>
               <div className="card-body" >
                   {documents.map((value, index) => {
                     if(article.docId==value.id){
                      return <h5 className="card-title" key={index}>
                      {
                      value.intituleDoc}</h5>
                     }
                  })}
                 <p className="card-text">{article.intituleArticle}</p>               
                 <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => this.toggleModal("defaultModal",article, article.id)}>
                  <span className="btn-inner--icon">
                    <i className="ni ni-bag-17" />
                  </span>
                  <span className="btn-inner--text">Lire</span>
                </Button>
               </div>
             </div>
         </Col>
         );
         const currentResultados = articles;
         const renderResultados =     currentResultados.map(article =>
      
          <Col lg="12" md="12" sm="12" key={article.id} style={{marginBottom: '30px'}}>
                <div className="card shadow" style={{borderRadius: '1.25rem'}}>
                  <div className="card-body" >
                      {documents.map((value, index) => {
                        if(article.docId==value.id){
                         return <h5 className="card-title" key={index}>
                         {
                         value.intituleDoc}</h5>
                        }
                     })}
                    <p className="card-text">{article.intituleArticle}</p>               
                    <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => this.toggleModal("defaultModal",article, article.id)}>
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
    for (let i = 1; i <= Math.ceil(articles.length / todosPerPage); i++) {
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
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}/>
                      <div className="input-group-append">
                        <Button
                          color="success"
                          type="button"
                          onClick={this.searchTitle}
                        >
                          Search
                        </Button>
                    </div>
                  </div>
              </div>
            </Row>
            
            <Col md="12">   
            <div className="custom-control custom-checkbox mb-3">
          <input
            className="custom-control-input"
            id="customCheck1"
            type="checkbox"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Document
          </label>
        </div>
            <div className="row" >
            {resultado == false &&
                renderTodos
              }

              {resultado == true &&
                  renderResultados
              }
             
            </div>
                          
            <div className="pagination" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            {resultado == false &&
                renderPageNumbers
              }

              </div>
            </Col>
            
          </Container>
          <Container className="mb-5">
          <Row>
          <Col md="12">
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

              <div className="col-md-12">
          {currentArticle ? (
            <div>
              {documents.map((value, index) => {
                     if(currentArticle.docId==value.id){
                      return <>
                      <h4 className="card-title" key={index}>{value.intituleDoc}</h4>
                      <Link to={{pathname: "https://legaloa-server.herokuapp.com/docs/"+value.route}} target="_blank">
                      <Button key={index} color="primary" type="button">
                      Télécharcher document complet
                      </Button>
                      </Link> </>   
                     }
                  })}
              <div>
                <label>
                  <strong>Articles: {currentArticle.docId}</strong>
                </label>{" "}
                {articles.map((value, index) => {
                  if(currentArticle.docId===value.docId){
                    return <>
                    <li key={index}>{value.intituleArticle}</li>

                    </>
                   }
  
                  })}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
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
          </Col>
          </Row>
          </Container>

        
 
        

      </>
    );
  }
}
