exports.usuarioAutenticado = (req, res, next) => {
    //if(req.isAutenticated()){
      //  return next();
    //}
    let respuesta = {};
    respuesta.codigo = 2;
    respuesta.mensaje = 'No tiene permiso';
    res.json(respuesta);
}