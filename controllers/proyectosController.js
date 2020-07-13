
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const { model } = require('../config/db');

exports.proyectosHome = (req, res) =>{
    res.render('index');
}

exports.nuevoProyecto = async (req, res) => {

    const pro       = req.body;
    const nombre    = pro.nombre; 
   // Proyectos.create({ nombre })
    //        .then(()=> console.log('Insertado Correctamente'))
     //       .catch(error=>console.log(error));
    const proyecto = await  Proyectos.create({ nombre }); 
    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    res.json(respuesta);
}

exports.listarProyecto = async (req, res)=>{
    const proyectos = await Proyectos.findAll();
    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    respuesta.objeto = {};
    respuesta.objeto.proyectos = proyectos;
    res.json(respuesta);

}

exports.listarProyectoId = async (req, res)=>{
    const proyecto = await Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });
    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    respuesta.objeto = {};
    respuesta.objeto.proyecto = proyecto;
    res.json(respuesta);

}

exports.listarProyectoPromesa = async (req, res)=>{

    const listaProyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [listaProyectos, proyecto] = await Promise.all([listaProyectosPromise, proyectoPromise]);

    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    respuesta.objeto = {};
    respuesta.objeto.proyecto = proyecto;
    res.json(respuesta);

}

exports.actualizarProyecto = async (req, res)=>{
    
    const pro       = req.body;
    const nombre    = pro.nombre; 

    const proyecto = await  Proyectos.update(
                            { nombre },
                            { where: {
                                id: req.params.id
                            }}
                            ); 

    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    respuesta.objeto = {};
    respuesta.objeto.proyecto = proyecto;
    res.json(respuesta);

}

exports.eliminarProyecto = async (req, res)=>{
     
    const proyecto = await  Proyectos.destroy( 
                            { where: {
                                id: req.params.id
                            }}
                            ); 

    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    respuesta.objeto = {};
    respuesta.objeto.proyecto = proyecto;
    res.json(respuesta);

}


exports.listarProyectoTarea = async (req, res)=>{

    const listarProyectoTarea = await  Tareas.findAll({
        where: {
            proyectoId:  9
        },
        include: [
            {model: Proyectos}
        ]
    });

   

    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    respuesta.objeto = {};
    respuesta.objeto.proyecto = listarProyectoTarea;
    res.json(respuesta);

}

exports.cambiarEstadoTarea = async (req, res) => {

    const tareaPromise =  await Tareas.findOne({
        where: {
            id: req.params.id
        }
    });

    tareaPromise.estado = 9;

    const resultado = await tareaPromise.save();

    const respuesta = {};
    respuesta.codigo = 1;
    respuesta.mensaje = 'OK';
    respuesta.objeto = {};
    respuesta.objeto.proyecto = resultado;
    res.json(respuesta);

}