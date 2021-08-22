import http from "../http-common";

class DomaineDataService {
  getAll() {
    return http.get("/domaine");
  }

  get(id) {
    return http.get(`/domaine/${id}`);
  }

  create(data) {
    return http.post("/domaine", data);
  }

  update(id, data) {
    return http.put(`/domaine/${id}`, data);
  }

  delete(id) {
    return http.delete(`/domaine/${id}`);
  }

  deleteAll() {
    return http.delete(`/domaine`);
  }

  findByTitle(title) {
    return http.get(`/domaine?domaine=${title}`);
  }
}

export default new DomaineDataService();