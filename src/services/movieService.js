import axios from 'axios';
import { HttpRequest } from '../http/httpRequest';

export const movieService = axios.create({
  baseURL: "http://localhost:8000/movies",
});


export const movieRequest = new HttpRequest(movieService);
