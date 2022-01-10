import axios from "axios";
import {apiUrl} from "../variables/url.js";
import http from "../http-common";
const API_URL =  apiUrl[0]+"auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nom, prenom, dateNaissance, code, phone, genre, entreprise, profil,username, email, password) {
    return axios.post(API_URL + "signup", {
      nom,
      prenom,
      dateNaissance,
      code,
      phone,
      genre,
      entreprise,
      profil,
      username,
      email,
      password
    });
  }

  update(username, value) {
    return axios.put(apiUrl[0]+`users/${username}`,   {
      statusId: value,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  } 
}
 
export default new AuthService();
