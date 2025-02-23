const { response } = require('express');
const Permiso = require('../model/permiso.model');

const getPermisos = async(req, res) => {
    try {
        const permiso = await Permiso.find({}, 'nombre_permiso descripcion');
        res.json({
            ok:true,
            permiso
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al obtenber el permiso'
        });        
    }
}

const getPermisosId = async(res, req) => {
  res.json({
       permiso: [{
            id:123,
            descripcion: 'consulta de permiso por id'
        }]
    });
}

const crearPermiso = async(req, res = response) => {
    const { nombre_permiso, descripcion } = req.body;
    const permiso = new Permiso(req.body);
    try {
        await permiso.save();
        res.json({
            ok:true,
            permiso
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al crear el permiso'
        });        
    }
} 

const editarPermiso = async(req, res) => {
    const pid = req.params.id;

    try {
        //1.- encontrar el id del rol
        const permisoDB = await Permiso.findById(pid);

        if(!permisoDB){
            return res.status(404).json({
                ok:true,
                msg: 'No existe registro'
            });
        }
        //2.- actualizar el registro por ese id
        const campos = req.body;

        //3.- eliminar campos que no deseo actualziar
                //NO APLICA

        //4.- actualizar el registro en la bd
        const edicionPermiso = await Permiso.findByIdAndUpdate(pid, campos, {new: true});
        res.json({
                ok:true,
                rol: edicionPermiso
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al editar el permiso'
        })
        
    }
} 

const eliminarPermiso = async(req, res = response) => {
    const pid = req.params.id;

    try {
         //1.- encuentra el uid
        const permisoDB = await Permiso.findById(pid);

        if (!permisoDB) {
            return res.status(404).json({
                ok:true,
                msg: 'Permiso eliminado'
            });                
        }
        //2.- elimina el registro como tal
        await Permiso.findByIdAndDelete(pid);
        res.json({
            ok:true,
            msg: 'Registro Permiso eliminado !'
        })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al eliminar el Permiso'
        })
        
    }
} 



module.exports = {
    getPermisos,
    getPermisosId,
    crearPermiso,
    editarPermiso,
    eliminarPermiso,
}