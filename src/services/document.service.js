import http from "../http-common";

class DocumentDataService {
  getAll(title, type, organisme, domaine, date) {
    return http.get(`/document?intituleArticle=${title}&typeId=${type}&organismeId=${organisme}&domaineId=${domaine}&dateVigueur=${date}`);
  }

  getAllDocs() {
    return http.get("/document/allDocs");
  }

  get(id) {
    return http.get(`/document/${id}`);
  }

  create(data) {
    return http.post("/document", data);
  }

  update(id, data) {
    return http.put(`/document/${id}`, data);
  }

  delete(id) {
    return http.delete(`/document/${id}`);
  }

  deleteAll() {
    return http.delete(`/document`);
  }

  findByTitle(title) {
    return http.get(`/document?title=${title}`);
  }
}

export default new DocumentDataService();