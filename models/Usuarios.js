const Sequelize =  require('sequelize');
const db = require('../config/db');  
const bcrypt = require('bcrypt-nodejs');

const Proyectos = require('./Proyectos');

const Usuarios = db.define('usuarios', {

    id : {
        type:Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement : true
    },
    email : {
        type: Sequelize.STRING(60),
        allowNull : false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo valido'
            },
            notEmpty: {
                msg: 'El email no debe ser vacio'
            }
        },
        unique: {
            args: true,
            msg:'Usuario ya Registrado'
        }
    },
    password : {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ser vacio'
            }
        }
    }

}, {
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        }
    }
});

Usuarios.prototype.verificarPassword = function(password){
    console.log(password);
    return bcrypt.compareSync(password, this.password);
}

//Usuarios.hasMany(Proyectos); // un usuario puede tener muchos proyectos
//Proyectos.hasMany(Tareas);
module.exports = Usuarios;