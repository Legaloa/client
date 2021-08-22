import http from "../http-common";

class ArticleDataService {
  getAll() {
    return http.get("/article");
  }

  get(id) {
    return http.get(`/article/${id}`);
  }

  create(data) {
    return http.post("/article", data);
  }

  update(id, data) {
    return http.put(`/article/${id}`, data);
  }

  delete(id) {
    return http.delete(`/article/${id}`);
  }

  deleteAll() {
    return http.delete(`/article`);
  }

  findByTitle(title) {
    return http.get(`/article?intituleArticle=${title}`);
  }
}

export default new ArticleDataService();