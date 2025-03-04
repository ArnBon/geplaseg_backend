const { response,  } = require('express');
const Rol = require('../model/roles.model');
const Permiso = require('../model/permiso.model');


const asignarPermisoRol = async(req, res = response) => {

    const { rolId, PermisoId } = req.body;

    try {
        //1 Buscar el rol por su _id
        const rol = await Rol.findById(rolId);
        if (!rol) {
            return res.status(404).json({
                ok: false,
                msg: 'El rol no existe',
            });            
        }


        //2 Verificar si los permisos existen
            const permisos = await Permiso.find({ _id:{$in: PermisoId} });
            if (permisos.length !== PermisoId.length) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El permiso no existe'
                });                
            } else {
                return res.status(200).json({
                    ok: true,
                    msg: 'Permiso otorgado'
                });                
            }


        //3 Asignar los permisos al rol
            rol.permisos = PermisoId;
            await rol.save();
            res.json({
                ok: true,
                rol,
            });


    } catch (error) {
        console.error('No se puede asignar el permiso:', error);
            res.status(500).json({
                ok:false,
                msg: 'No se pudo asignar el permiso', 
                error
            });        
        }
    };
module.exports = {
    asignarPermisoRol,
}