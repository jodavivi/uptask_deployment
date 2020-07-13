const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectosController');
const usuarioController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function(){

    router.get('/', proyectoController.proyectosHome); 
    router.get('/proyectos', proyectoController.listarProyecto); 
    router.get('/proyectos/:id', proyectoController.listarProyectoId); 
    router.get('/promesas/:id', proyectoController.listarProyectoPromesa); 

    router.get('/tareas/:id', proyectoController.listarProyectoTarea); 
 
    router.post('/proyectos', proyectoController.nuevoProyecto);
    router.put('/proyectos/:id', proyectoController.actualizarProyecto);

    router.put('/tareas/:id', proyectoController.cambiarEstadoTarea);

    router.delete('/proyectos/:id', proyectoController.eliminarProyecto);


    router.post('/usuarios', usuarioController.crearUsuario);

    router.post('/validarusuario', authController.usuarioAutenticado, usuarioController.validarUsuario);

    return router;
}

