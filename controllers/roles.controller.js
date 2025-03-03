const { response } = require('express');
const Rol = require('../model/roles.model');

const getRoles = async(req, res) => {
    try {
        const rol = await Rol.find({}, 'nombre_rol descripcion');
        res.json({
            ok:true,
            rol
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al obtenber el rol'
        });        
    }
}

const getRolesId = async(res, req) => {
  res.json({
       rol: [{
            id:123,
            descripcion: 'consulta de rol por id'
        }]
    });
}

const crearRol = async(req, res = response) => {
    const { nombre_rol, descripcion } = req.body;
    const rol = new Rol(req.body);
    try {
        await rol.save();
        res.json({
            ok:true,
            rol
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al crear el rol'
        });        
    }
} 

const editarRol = async(req, res) => {
    const rid = req.params.id;

    try {
        //1.- encontrar el id del rol
        const rolDB = await Rol.findById(rid);

        if(!rolDB){
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
        const edicionRol = await Rol.findByIdAndUpdate(rid, campos, {new: true});
        res.json({
                ok:true,
                rol: edicionRol
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al editar el rol'
        })        
    }
} 

const eliminarRol = async(req, res = response) => {
    const rid = req.params.id;

    try {
         //1.- encuentra el uid
        const rolDB = await Rol.findById(rid);

        if (!rolDB) {
            return res.status(404).json({
                ok:true,
                msg: 'Rol eliminado'
            });                
        }
        //2.- elimina el registro como tal
        await Rol.findByIdAndDelete(rid);
        res.json({
            ok:true,
            msg: 'Registro Rol eliminado !'
        })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al eliminar el rol'
        })
        
    }
} 



module.exports = {
    getRoles,
    getRolesId,
    crearRol,
    editarRol,
    eliminarRol,
}