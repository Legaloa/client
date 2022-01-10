import axios from 'axios';
import authHeader from './auth-header';
import {apiUrl} from "../variables/url.js";
import http from "../http-common";

const API_URL = apiUrl[1]+'api/test/'; 

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getTeacherBoard() {
    return axios.get(API_URL + 'teacher', { headers: authHeader() });
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  findByUsername(username) {
    return http.get(`/user?username=${username}`); 
  }
}

export default new UserService();
