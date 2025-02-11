const { response } = require('express');
const Usuario = require('../model/usuario.model');

const getUsuario = async (req, res = response) => {
    const usuario = await Usuario.find({}, 'nombre_usuario contrasena  email  fecha_creacion estado');           
    res.json({
            ok:true,
            usuario        
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

   /* const crearUsuario = async (req, res = response) => {
         
            console.log(req.body);
            const {nombre_usuario, contrasena, email, fecha_creacion, estado,} = req.body

            const usuario = new Usuario(req.body);
            await usuario.save();

            res.json({
                ok: true,
                usuario
            });
    }*/
    
    const crearUsuario = async (req, res = response) => {

        const usuario = new Usuario(req.body);

        try {
            await usuario.save();
            res.json({
                ok: true,
                usuario
            });
            
        } catch (error) {
            console.error('No se pudo guardar el registro:', error);
            res.status(500).json({
                ok: false,
                msg: 'No se pudo guardar el registro',
                error
            });            
        }

    }
        
  

    const actualizarUsuario = async (req, res = response)=> {
       const uid = req.params.id;

        try {
            //1.- encuntra el pid de la persona
            const usuarioDB = await Usuario.findById(uid)

            if (!usuarioDB) {
                return res.status(404).json({
                    ok:true,
                    msg: 'No existe usuario por ese id mejorar este mensaje'
                });                
            }

            //2.- actualiza el resitro por ese pid
                const campos = req.body;

            //3.- Eliminar campos que no deseo actualizar
            delete campos.contrasena;
            delete campos.fecha_creacion;
            delete campos.id_persona;

            //4.- Actuzlizar al usuario en la bd
            const edicionUsuario = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

            res.json({
                ok:true,
                usuario: edicionUsuario
            });

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'No se pudo actualizar el registro'
            });            
        }

    }

    const eliminarUsuario = async (req, res = response)=> {
        
        const uid = req.params.id
        try {
            //1.- encuentra el uid
            const usuarioDB = await Usuario.findById(uid);

            if (!usuarioDB) {
                return res.status(404).json({
                    ok:true,
                    msg: 'Usuario eliminado'
                });                
            }
            //2.- elimina el registro como tal
            await Usuario.findByIdAndDelete(uid);
            res.json({
                ok:true,
                msg: 'Registro eliminado'
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'No se pudo eliminar el registro de usuario'
            });            
        }
    }


module.exports = {
    getUsuario,
    getUsuarioId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}