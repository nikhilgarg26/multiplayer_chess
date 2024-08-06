import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
require('dotenv').config()

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const wss = new WebSocketServer({ port });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws)
    ws.on("disconnect", ()=> gameManager.removeUser(ws))
});