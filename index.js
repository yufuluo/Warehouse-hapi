'use strict';

const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const bb = require('bluebird');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
const model = require('./model');
const Storage = model(mongoose).Storage;


let server = new hapi.Server();
server.connection({port: 8000});


server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.normalize(__dirname + '/public')
            }
        }
    });
});

server.route({
    method: 'GET',
    path: '/storage',
    handler: (request, reply) => {
        return bb.try(() => Storage.find().lean())
            .then((result) => reply(result))
            .catch((err) => console.log(err));
    }
});


server.route({
    method: 'POST',
    path: '/storage',
    handler: (request, reply) => {
        const data = {
            name: request.payload.name,
            description: request.payload.description,
            price: request.payload.price,
            image: request.payload.imageUrl
        };
        new Storage(data).save();
        return reply(data);
    }
});

server.route({
    method: 'DELETE',
    path: '/storage/{id?}',
    handler: (request, reply) => {
        const id = request.query.id;
        return Storage.findByIdAndRemove(id, () => reply('removed'));
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri + '/');
});


