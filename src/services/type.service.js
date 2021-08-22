import http from "../http-common";

class TypeDataService {
  getAll() {
    return http.get("/type");
  }

  get(id) {
    return http.get(`/type/${id}`);
  }

  create(data) {
    return http.post("/type", data);
  }

  update(id, data) {
    return http.put(`/type/${id}`, data);
  }

  delete(id) {
    return http.delete(`/type/${id}`);
  }

  deleteAll() {
    return http.delete(`/type`);
  }

  findByTitle(title) {
    return http.get(`/type?type=${title}`);
  }
}

export default new TypeDataService();