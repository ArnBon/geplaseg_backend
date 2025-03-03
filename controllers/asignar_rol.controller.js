const { response } = require('express');
const Usuario = require('../model/usuario.model');
const Rol = require('../model/roles.model');

const asignarRolUsuario = async(req, res = response) => {
  const { usuarioId, rolId } = req.body
  
    try {
      

    //1 Buscar el usuario or su _id
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe'
        });        
    }



    //2 Verificar si el rol existe
    const rol = await Rol.findById(rolId);
    if (!rol) {
        return res.status(404).json({
            ok: false,
            msg: 'El rol para asignar no existe'
        });        
    }
    


    //3 Asignar el rol al usuario
    usuario.roles.push(rolId);
    await usuario.save();

    res.json({
        ok:true,
        usuario,
    });
  } catch (error) {
    console.error('No se puede asignar el rol:', error);
    res.status(500).json({
        ok:false,
        msg: 'No se puede asignar el rol',
        error
    });    
  }
};


module.exports = {
    asignarRolUsuario,
}