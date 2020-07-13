
const Usuarios = require('../models/Usuarios');  
const enviarEmail = require('../handlers/email');

exports.crearUsuario = async (req, res) => {

    const {email, password}       = req.body; 
   // Proyectos.create({ nombre })
    //        .then(()=> console.log('Insertado Correctamente'))
     //       .catch(error=>console.log(error));
     const respuesta = {};
    try {
        const usuario = await  Usuarios.create({ email, password }); 
        respuesta.codigo = 1;
        respuesta.mensaje = 'OK';



    } catch (error) {
        respuesta.codigo = -1;
        respuesta.mensaje = error.errors[0].message;
    }
 
   //Enviar correo

    enviarEmail.enviar({
       usuario:'',
       subject:''
   });
    res.json(respuesta);

}

exports.validarUsuario = async (req, res) => {

    const {email, password}       = req.body;  
     const respuesta = {};
    try {
        const usuario = await  Usuarios.findOne({ 
            where: {email: email }
        }); 

        
        if(usuario){

            if(!usuario.verificarPassword(password)){
                respuesta.codigo = 3;
                respuesta.mensaje = 'Password Incorrecto';     
            }

            respuesta.codigo = 1;
            respuesta.mensaje = usuario;     
        }else{
            respuesta.codigo = 2;
            respuesta.mensaje = 'Usuario no Existe';
        }
        
    } catch (error) {
        console.log(error);
        respuesta.codigo = -1;
        respuesta.mensaje = 'Usuario no existe';
    }
 
   
    res.json(respuesta);
}