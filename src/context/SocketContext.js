import { createContext } from "react";
import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000/');
export const SocketContext = createContext(null);