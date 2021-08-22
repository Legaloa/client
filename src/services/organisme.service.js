import http from "../http-common";

class OrganismeDataService {
  getAll() {
    return http.get("/organisme");
  }

  get(id) {
    return http.get(`/organisme/${id}`);
  }

  create(data) {
    return http.post("/organisme", data);
  }

  update(id, data) {
    return http.put(`/organisme/${id}`, data);
  }

  delete(id) {
    return http.delete(`/organisme/${id}`);
  }

  deleteAll() {
    return http.delete(`/organisme`);
  }

  findByTitle(title) {
    return http.get(`/organisme?name=${title}`);
  }
}

export default new OrganismeDataService();