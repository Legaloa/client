import axios from "axios";
import {apiUrl} from "./variables/url.js";

export default axios.create({
  baseURL: apiUrl[0],
  headers: {
    "Content-type": "application/json"
  }
});