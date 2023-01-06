import axios from "axios";
import Vue from 'vue'
import AxiosPlugin from 'vue-axios-cors';
 
Vue.use(AxiosPlugin)

export default axios.create({
  baseURL: "http://localhost:7011",
  headers: {
    // "Access-Control-Allow-Origin": "http://localhost:7011",
    "Content-type": "application/octet-stream"
    
  }
});

