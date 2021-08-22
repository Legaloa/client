import React from "react";
import DocumentDataService from "../../../services/document.service"; 
import ArticleDataService from "../../../services/article.service.js";
import AuthService from "../../../services/auth.service";
import UserNavbar from "components/Navbars/UserNavbar";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  FormGroup,
  Input,
  UncontrolledAlert,
} from "reactstrap";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);

    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeIntituleArticle= this.onChangeIntituleArticle.bind(this);
    this.onChangeDocId = this.onChangeDocId.bind(this);

    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    this.state = {
      documents: [],
      articles: [],
      idArticle: null,
      currentIndex: -1,
      currentUser: undefined,

      id: null,
      numero: "", 
      intituleArticle: "",
      docId: "",

      submitted: false,
      selectedFile: null,
      progress: 0
     };
  }


onChangeNumero(e) {
  this.setState({
    numero: e.target.value
  });
}


onChangeIntituleArticle(e) {
  this.setState({
    intituleArticle: e.target.value
  });
}


onChangeDocId(e) {
  this.setState({
    docId: e.target.value
  });
}


saveArticle() {
  alert(this.state.numero);
  if(this.state.numero ===""  ){
  alert("Remplir tous les chams");
  }else{
  var data = {
    id: this.state.id,
    numero: this.state.numero,
    intituleArticle:  this.state.intituleArticle,
    createdAt:  this.state.createdAt,
    updatedAt:  this.state.updatedAt,
    docId:  this.state.docId,
  };
  

  ArticleDataService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        numero: response.data.numero,
        intituleArticle:  response.data.intituleArticle,
        createdAt:  response.data.createdAt,
        updatedAt:  response.data.updatedAt,
        docId:  response.data.docId,
        submitted: true
      });
      console.log(response.data);
      window.location.reload(false);
    })
    .catch(e => {
      console.log(e);
    });}
}

newArticle() {
  this.setState({
    id: null,
    numero: null,
    intituleArticle:  "",
    docId:  "",
    submitted: false
  });
}

  componentDidMount() {
  this.retrieveDocuments();
  this.retrieveArticles();
  }

  retrieveArticles() {
    console.log("entra al retrive");
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
    const user = AuthService.getCurrentUser();
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

  deleteArticle = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    ArticleDataService.delete(e.target.value)
    .then(response => {
      console.log(response.data);
      window.location.reload(false);
    })
    .catch(e => {
      console.log(e);
    }); //will give you the value continue
}

toggleModal (state) {
  this.setState({
    [state]: !this.state[state]
  });
};


  render() {

    const { progress,documents, articles } = this.state;
    console.log(progress);
    console.log("videos,",documents.intituleDoc);
    return (
      <>    
      <UserNavbar />

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Mes articles</CardTitle>
                </CardHeader>
                <Col md="2">
                  <Button
                      block
                      className="mb-3"
                      color="primary"
                      type="button"
                      onClick={() => this.toggleModal("defaultModal")}
                    >
                      Creer Article
                    </Button>
                </Col>
                <Modal
              className="modal-dialog-centered modal-lg"
              style={{width:'900px'}}
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Type your modal title
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
              <form  method="POST" encType="multipart/form-data">
            <div className="form-group"> 
            <div> 
          <div className="content">
            <Row>
              <Col md="12">
                <Card className="card-user">
                  <CardHeader>
                    <CardTitle tag="h5">Créer Article</CardTitle>
                  </CardHeader>
                  <CardBody>
                    
                      <Row>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>Numero</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="numero"
                              required
                              value={this.state.numero}
                              onChange={this.onChangeNumero}
                              name="numero"
                            />
                          </FormGroup>
                        </Col>
  
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>intituleArticle</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="intituleArticle"
                              required
                              value={this.state.intituleArticle}
                              onChange={this.onChangeIntituleArticle}
                              name="intituleArticle"
                            />
                          </FormGroup>
                        </Col>
                       
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>DocId</label>
                            <select className="form-control" name="languageId" id="languageId"  value={this.state.docId} onChange={this.onChangeDocId}>
                                  <option value="0">Choisir doc id</option>
                                  {documents.map(document =>
                                  <option key={document.id} value={document.id}>{document.intituleDoc}</option>
                                    )}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div className="update ml-auto mr-auto">

                        {this.state.progress === 0 ?(
                          <div>
                                                        <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            onClick={this.saveArticle}
                          >
                          Save Article
                          </Button>
                          </div>
                              ) : (
                          <div>
                                 
                          </div>
                        )}
                        </div>
                      </Row>
                    
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>          
        </div> 


            </div>
          </form> 
              <div className="modal-footer">
                <Button color="primary" type="button">
                  Save changes
                </Button>
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

                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>intituleArticle</th>
                        <th>DocId</th>
                        <th>Créé</th>
                        <th>Supprimer</th>
                        <th>Modifier</th>
                        <th>Voir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map(article =>
                        <tr key={article.id}>
                          <td>{article.intituleArticle} </td>
                          <td>{article.docId}</td>
                          <td>{article.createdAt}</td>
                          <td>
                          <Button
                              block
                              color="danger"
                              value={article.id}
                              onClick={this.deleteArticle}
                            >
                              Supprimer
                            </Button>
                            </td>
                            <td>
                          <Button
                              disabled
                              block
                              color="warning"
                            >
                              Modifier
                            </Button>
                            </td>
                            <td>
                          <Button
                              disabled
                              block
                              color="success"
                            >
                             Voir
                            </Button>
                            </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Articles;
