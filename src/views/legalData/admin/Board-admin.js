import React, { Component } from "react";


import UserNavbar from "components/Navbars/UserNavbar";
import DocumentDataService from "../../../services/document.service";
import axios from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";
import {apiUrl} from "../../../variables/url.js";
// reactstrap components 
import {
  UncontrolledAlert,
  Button,
  Card,
  CardHeader, 
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

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
      progress: 0,

      videos: [],
      documents: []
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
                          <Col className="pr-1" md="4">
                            <FormGroup>
                              <label>typeId</label>
                              <Input
                                type="text"
                                className="form-control"
                                id="typeId"
                                required
                                value={this.state.typeId}
                                onChange={this.onChangeTypeId}
                                name="typeId"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pr-1" md="4">
                            <FormGroup>
                              <label>organismeId</label>
                              <Input
                                type="text"
                                className="form-control"
                                id="organismeId"
                                required
                                value={this.state.organismeId}
                                onChange={this.onChangeOrganismeId}
                                name="organismeId"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pr-1" md="4">
                            <FormGroup>
                              <label>domaineId</label>
                              <Input
                                type="text"
                                className="form-control"
                                id="domaineId"
                                required
                                value={this.state.domaineId}
                                onChange={this.onChangeDomaineId}
                                name="domaineId"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="px-1" md="4">
                            <FormGroup>
                              <label>language</label>
                                <select className="form-control" name="languageId" id="languageId"  value={this.state.languageId} onChange={this.onChangelanguageId}>
                                <option value="0">Choisir langage</option>
                                  <option value="1">Français</option>
                                  <option value="2">Anglais</option>
                                  <option value="3">Espagnol</option>
                                </select>
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="4">
                            <FormGroup>
                              <label>Niveau</label>
                                <select className="form-control" name="levelId" id="levelId"  value={this.state.levelId} onChange={this.onChangelevelId}>
                                  <option value="0">Choisir niveau</option>
                                  <option value="1">A1</option>
                                  <option value="2">A2</option>
                                  <option value="3">B1</option>
                                  <option value="4">B2</option>
                                  <option value="5">C1</option>
                                  <option value="6">C2</option>
                                </select>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                          <div className="form-group">
                              <label>Description</label>
                              <Input
                              type="text"
                              className="form-control"
                              id="description"
                              required
                              value={this.state.description}
                              onChange={this.onChangeDescription}
                              name="description"
                              />
                           </div>
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

 

  render() {
    const { videos, progress,documents } = this.state;
    console.log(progress);
    console.log("videos,",documents.intituleDoc);
    return (
      <><UserNavbar />
          <div className="container">
          <CardTitle  className="text-center" tag="h4">Télécharger la vidéo</CardTitle>
          <br />
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
        </div> 

        
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
      </>
    );
  }
}