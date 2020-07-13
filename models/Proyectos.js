const Sequelize =  require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos', {

    id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    nombre : Sequelize.STRING(100),
    url    : Sequelize.STRING

},{
    hooks: {
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLowerCase();
            console.log('Antes de Insertar en BD', url);
            proyecto.url = `${url}-${shortid.generate()}`;
        } 
    }
});

module.exports = Proyectos;