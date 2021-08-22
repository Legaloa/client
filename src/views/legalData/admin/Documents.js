import React from "react";
import DocumentDataService from "../../../services/document.service"; 
import AuthService from "../../../services/auth.service";
import UserNavbar from "components/Navbars/UserNavbar";
import OrganismeDataService from "../../../services/organisme.service";
import DomaineDataService from "../../../services/domaine.service";
import TypeDataService from "../../../services/type.service";

import axios from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";
import {apiUrl} from "../../../variables/url.js";
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

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);

    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeDateAdoption= this.onChangeDateAdoption.bind(this);
    this.onChangeDateVigueur = this.onChangeDateVigueur.bind(this);
    this.onChangeDateEnregistrement = this.onChangeDateEnregistrement.bind(this);
    this.onChangeIntituleDoc = this.onChangeIntituleDoc.bind(this);
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTypeId = this.onChangeTypeId.bind(this);
    this.onChangeOrganismeId = this.onChangeOrganismeId.bind(this);
    this.onChangeDomaineId = this.onChangeDomaineId.bind(this);

    this.saveDocument = this.saveDocument.bind(this);
    this.newDocument = this.newDocument.bind(this);

    this.state = {
      documents: [],
      domaines: [],
      organismes: [],
      types: [],
      idDocument: null,
      currentIndex: -1,
      currentUser: undefined,

      id: null,
      numero: "", 
      dateAdoption: "", 
      dateVigueur: "",
      dateEnregistrement: "",
      intituleDoc: "",
      route: "",
      description: "",
      typeId: "",
      organismeId: "",
      domaineId: "",

      submitted: false,
      selectedFile: null,
      progress: 0
     };
  }

   // On file select (from the pop up) 
   onFileChange = event => { 
    console.log(event.target.files[0]);
    if(event.target.files[0] === undefined){
      this.setState({ selectedFile: null }); 
      console.log("undefined");
    }else{
      if(event.target.files[0].type === "application/pdf" ){
        if(event.target.files[0].size/1024/1024 < 20.0){
          this.setState({ selectedFile: event.target.files[0] }); 
        }else{
          this.setState({ selectedFile: null }); 
          alert('La vidéo doit être inférieure à 20 MB');
        }
      }else{
        this.setState({ selectedFile: null }); 
        alert('Télécharger uniquement des vidéos au format mp4');
      }
      // Update the state 

    }
    
    
   
  }; 
   
  // On file upload (click the upload button) 
  onFileUpload = () => { 

    // Create an object of formData 
    const formData = new FormData(); 
    if(this.state.selectedFile){
      // Update the formData object 
    formData.append( 
      "file", 
      this.state.selectedFile, 
      this.state.selectedFile.name 
    ); 
    // Details of the uploaded file 
    console.log("el archivo:",this.state.selectedFile); 
  
   
    // Request made to the backend api 
    // Send formData object 
    axios.post(apiUrl[1]+'upload', formData, {
      
          onUploadProgress: (ProgressEvent) => {
              this.progress = Math.round(
              ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
              this.setState({ progress: this.progress }); 
          }
      })
    }
   
    
  }; 

      // File content to be displayed after 
  // file upload is complete 
  fileData = () => { 
    if (this.state.selectedFile) { 
      const { organismes,types, domaines } = this.state;
      return ( 
        
        <div> 
          <div className="content">
            <Row>
              <Col md="4">
                <Card>
                  <CardHeader>
             
                    <CardTitle tag="h4">File Details:</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ul className="list-unstyled team-members">
                      <li>
                        <Row>
                        <Col md="9" xs="9">
                          File Name: <br />
                            <span className="text-muted">
                              <small>{this.state.selectedFile.name}</small>
                            </span>
                          </Col>
                          <Col className="text-right" md="3" xs="3">
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                            >
                              <i className="fa fa-info" />
                            </Button>
                          </Col>
                        </Row>
                      </li>
                      <li>
                        <Row>
                          <Col md="9" xs="9">
                          File Type: <br />
                            <span className="text-success">
                              <small>{this.state.selectedFile.type}</small>
                            </span>
                          </Col>
                          <Col className="text-right" md="3" xs="3">
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                            >
                              <i className="fa fa-info" />
                            </Button>
                          </Col>
                        </Row>
                      </li>
                      <li>
                        <Row>
                        <Col md="9" xs="9">
                          Last Modified: <br />
                            <span className="text-danger">
                              <small>{" "} 
                              {this.state.selectedFile.lastModifiedDate.toDateString()} </small>
                              </span>
                          </Col>
                          <Col className="text-right" md="3" xs="3">
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                            >
                              <i className="fa fa-info" />
                            </Button>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </Col>
              <Col md="8">
                <Card className="card-user">
                  <CardHeader>
                    <CardTitle tag="h5">Créer Document</CardTitle>
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
                            <label>dateAdoption</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="dateAdoption"
                              required
                              value={this.state.dateAdoption}
                              onChange={this.onChangeDateAdoption}
                              name="dateAdoption"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>dateVigueur</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="dateVigueur"
                              required
                              value={this.state.dateVigueur}
                              onChange={this.onChangeDateVigueur}
                              name="dateVigueur"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>dateEnregistrement</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="dateEnregistrement"
                              required
                              value={this.state.dateEnregistrement}
                              onChange={this.onChangeDateEnregistrement}
                              name="dateEnregistrement"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>intituleDoc</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="intituleDoc"
                              required
                              value={this.state.intituleDoc}
                              onChange={this.onChangeIntituleDoc}
                              name="intituleDoc"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>route</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="route"
                              required
                              value={this.state.route}
                              onChange={this.onChangeRoute}
                              name="route"
                            />
                          </FormGroup>
                        </Col>
                       
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>typeId</label>
                            <select className="form-control" name="languageId" id="languageId"  value={this.state.typeId} onChange={this.onChangeTypeId}>
                                  <option value="0">Choisir type</option>
                                  {types.map(type =>
                                  <option key={type.id} value={type.id}>{type.type}</option>
                                    )}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>organismeId</label>
                            <select className="form-control" name="languageId" id="languageId"  value={this.state.organismeId} onChange={this.onChangeOrganismeId}>
                                  <option value="0">Choisir organimes</option>
                                  {organismes.map(organisme =>
                                  <option key={organisme.id} value={organisme.id}>{organisme.name}</option>
                                    )}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="4">
                          <FormGroup>
                            <label>domaineId</label>
                            <select className="form-control" name="languageId" id="languageId"  value={this.state.domaineId} onChange={this.onChangeDomaineId}>
                                  <option value="0">Choisir domaines</option>
                                  {domaines.map(domaine =>
                                  <option key={domaine.id} value={domaine.id}>{domaine.domaine}</option>
                                    )}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      <Col md="12">
                          <FormGroup>
                            <label>description</label>
                            <Input
                              type="text"
                              className="form-control"
                              id="description"
                              required
                              value={this.state.description}
                              onChange={this.onChangeDescription}
                              name="description"
                            />
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
                            onClick={this.saveDocument}
                          >
                          Save video
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
      ); 
    } else { 
      return ( 
        <div> 

        </div> 
      ); 
    } 
  }; 

onChangeNumero(e) {
  this.setState({
    numero: e.target.value
  });
}

onChangeDateAdoption(e) {
  this.setState({
    dateAdoption: e.target.value
  });
}

onChangeDateVigueur(e) {
  this.setState({
    dateVigueur: e.target.value
  });
}

onChangeDateEnregistrement(e) {
  this.setState({
    dateEnregistrement: e.target.value
  });
}

onChangeIntituleDoc(e) {
  this.setState({
    intituleDoc: e.target.value
  });
}

onChangeDescription(e) {
  this.setState({
    description: e.target.value
  });
}

onChangeRoute(e) {
  this.setState({
    route: e.target.value
  });
}

onChangeTypeId(e) {
  this.setState({
    typeId: e.target.value
  });
}

onChangeOrganismeId(e) {
  this.setState({
    organismeId: e.target.value
  });
}

onChangeDomaineId(e) {
  this.setState({
    domaineId: e.target.value
  });
}


saveDocument() {
  alert(this.state.numero);
  if(this.state.numero ===""  ){
  alert("Remplir tous les chams");
  }else{
  this.onFileUpload();
  var data = {
    id: this.state.id,
    numero: this.state.numero,
    dateAdoption: this.state.dateAdoption,
    dateVigueur:  this.state.dateVigueur,
    dateEnregistrement	:  this.state.dateEnregistrement,
    intituleDoc:  this.state.intituleDoc,
    route:  this.state.route,
    description:  this.state.description,
    createdAt:  this.state.createdAt,
    updatedAt:  this.state.updatedAt,
    typeId:  this.state.typeId,
    organismeId:  this.state.organismeId,
    domaineId:  this.state.domaineId,
  };
  

  DocumentDataService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        numero: response.data.numero,
        dateAdoption: response.data.dateAdoption,
        dateVigueur:  response.data.dateVigueur,
        dateEnregistrement	:  response.data.	dateEnregistrement,
        intituleDoc:  response.data.intituleDoc,
        route:  response.data.route,
        description:  response.data.description,
        createdAt:  response.data.createdAt,
        updatedAt:  response.data.updatedAt,
        typeId:  response.data.typeId,
        organismeId:  response.data.organismeId,
        domaineId:  response.data.domaineId,

        submitted: true
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });}
}

newDocument() {
  this.setState({
    id: null,
    numero: null,
    dateAdoption: "",
    dateVigueur:  "",
    dateEnregistrement:  "",
    intituleDoc:  "",
    route:  "",
    description:  "",
    typeId:  "",
    organismeId:  "",
    domaineId:  "",

    submitted: false
  });
}

  componentDidMount() {
  this.retrieveDocuments();
  this.retrieveDomaines();
  this.retrieveOrganismes();
  this.retrieveTypes();
  }

  retrieveDomaines() {
    console.log("entra al retrive");
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

  retrieveOrganismes() {
    console.log("entra al retrive");
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

  retrieveTypes() {
    console.log("entra al retrive");
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

  deleteDocument = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    DocumentDataService.delete(e.target.value)
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

    const { progress,documents, domaines } = this.state;
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
                  <CardTitle tag="h4">Mes documents</CardTitle>
                </CardHeader>
                <Col md="2">
                  <Button
                      block
                      className="mb-3"
                      color="primary"
                      type="button"
                      onClick={() => this.toggleModal("defaultModal")}
                    >
                      Creer document
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
              <form action= {apiUrl[1]+"convert"}  method="POST" encType="multipart/form-data">
            <div className="form-group"> 
                <input type="file" className="form-control" name="file"  required  onChange={this.onFileChange}  style={{paddingTop: 90, paddingBottom: 90, borderStyle: 'dashed',  borderWidth: 6}} /> 
            </div>
            {this.state.progress === "100%"?(     
            <div>     
                  <button className="btn btn-block btn-danger">Convert to Mp3</button>     
            </div>
                ) : (
            <div>
              {this.state.progress === 0?(     
            <div></div>
                ) : (
            <div> <ProgressBar bgcolor="#7ed6a5" labelAlignment={"center"} completed={this.state.progress} /></div>
             )}
            </div>
             )}
          </form> 
          <div className="submit-form">
        {this.state.progress === "100%" ?(
          <div>
            <UncontrolledAlert color="success" fade={false}>
                            <span>
                              <b>Le document a été enregistrée avec succès! - </b>
                              
                            </span>
            </UncontrolledAlert>         
          </div>
              ) : (
          <div>
                      {this.fileData()} 
          </div>
        )}
      </div>
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
                        <th>intituleDoc</th>
                        <th>typeId</th>
                        <th>Créé</th>
                        <th>Supprimer</th>
                        <th>Modifier</th>
                        <th>Voir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map(document =>
                        <tr key={document.id}>
                          <td>{document.intituleDoc} </td>
                          <td>Briques</td>
                          <td>{document.createdAt}</td>
                          <td>
                          <Button
                              block
                              color="danger"
                              value={document.id}
                              onClick={this.deleteDocument}
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

export default Documents;
