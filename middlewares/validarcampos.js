 const { response } = require('express');
 const { validationResult } = require('express-validator');
 const Usuario  = require('../model/usuario.model');
 const Rol = require('../model/roles.model'); 
 const Permiso = require('../model/permiso.model');  

const validarCampos = (req, res = response, next ) => {

    const errores = validationResult(req);
    
       if (!errores.isEmpty() ) {
           return res.status(400).json({
               ok: false,
               errors:errores.mapped()
           });        
       }
       next();
}

//Validacion para evitar usuarios duplicados
const validarUsuario = async (req, res = response, next) => {
  const { nombre_usuario } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ nombre_usuario });
    if (usuarioExistente) {
      return res.status(409).json({
        ok: false,
        msg: 'El usuario ya existe',
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al validar el usuario',
    });
  }
};

// Validación para evitar correos electrónicos duplicados
const validarEmailDuplicado = async (req, res = response, next) => {
  const { email } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({
        ok: false,
        msg: 'El correo electrónico ya está registrado',
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al validar el correo electrónico',
    });
  }
};

// Validación para evitar roles duplicados
const validarRol = async (req, res = response, next) => {
  const { nombre_rol } = req.body;

  try {
    const rolExistente = await Rol.findOne({ nombre_rol });
    if (rolExistente) {
      return res.status(409).json({
        ok: false,
        msg: 'El rol ya existe',
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al validar el rol',
    });
  }
};



// Validación para evitar permisos duplicados
const validarPermiso = async (req, res = response, next) => {
  const { nombre_permiso } = req.body;

  try {
    const permisoExistente = await Permiso.findOne({ nombre_permiso });
    if (permisoExistente) {
      return res.status(409).json({
        ok: false,
        msg: 'El permiso ya existe',
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al validar el permiso',
    });
  }
};



module.exports = {
    validarCampos,
    validarUsuario,
    validarRol,    
    validarPermiso,
    validarEmailDuplicado
}
