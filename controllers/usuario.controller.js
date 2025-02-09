const { response } = require('express');
const Usuario = require('../model/usuario.model');

const getUsuario = (req, res = response) => {
    res.json({
       usuarios: [{
            id:123,
            descripcion: 'consulta de usuarios'
        }]
    });
}

    const getUsuarioId = (req, res = response)=> {
         res.json({
       usuarios: [{
            id:123,
            descripcion: 'consulta de usuario por id'
        }]
    });
    }

    const crearUsuario = (req, res = response)=> {
        res.json({
            ok:true,
            msg: 'creando usuario'
        });
    }

    const actualizarUsuario = (req, res = response)=> {
        res.json({
            ok:true,
            msg: 'Actualizando Usuario'
        });

    }

    const eliminarUsuario = (req, res = response)=> {
        res.json({
            ok:true,
            msg: 'usuario Eliminado'
        });
    }


module.exports = {
    getUsuario,
    getUsuarioId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}