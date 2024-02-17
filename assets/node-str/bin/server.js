'use strict'

// PARA IMPORTAR ALGO, USA O require
const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

const port = normalizandoPorta(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

//CASO OCORRA ALGUM ERRO, CHAMA A FUNÇÃO DE TRATAMENTO
server.on('error', onError);

//CHAMANDO A FUNÇÃO DEBUG
server.on('listening', onListening);

console.log(`API rodando na porta ${port}`);

// NORMALIZANDO A PORTA
function normalizandoPorta(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// TRATAMENTO DE ERRO
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // ERRO DE PERMISSÃO OU DE USO
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// DEBUG
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}