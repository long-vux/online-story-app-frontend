import { io } from 'socket.io-client';
// const API_URL = process.env.REACT_APP_API_URL;
const socket = io("http://localhost:5000");

export default socket;
