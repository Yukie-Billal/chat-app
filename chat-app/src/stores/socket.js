import io from "socket.io-client";
import {config} from '../utils/config.js'

export const socket = io(config.socket_url)