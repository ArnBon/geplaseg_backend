const { response } = require('express');
const Usuario = require('../model/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuario = async (req, res) => {
try {
     // Obtener todas los usuarios con los campos deseados
    const usuario = await Usuario.find({}, 'nombre_usuario contrasena email fecha_creacion estado');           
    
    // Función para formatear la fecha
         formatearFecha = (fecha) => {
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
            const anio = fecha.getFullYear();
            return `${dia}-${mes}-${anio}`;
        };

        // Formatear la fecha de creacion para cada persona
        const usuarioResponse = usuario.map(usuario => ({
            ...usuario.toObject(), // Convierte el documento a un objeto simple
            fecha_creacion: formatearFecha(usuario.fecha_creacion) // Formatea la fecha
        }));
    
    res.json({
            ok:true,
            usuario: usuarioResponse  // Devuelve la lista de personas con fechas formateadas      
    });
    
} catch (error) {
    console.error(error);
    res.status(500).json({
        ok:false,
        msg: 'Error al obtener usuarios.'
    });
    
}

    
    
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

        const { nombre_usuario, contrasena, email, estado } = req.body;
        
        const { fecha_creacion } = req.body;

        // Convertir la fecha de creacion de dd-mm-yyyy a un objeto Date
    if (fecha_creacion) {
        const [dia, mes, anio] = fecha_creacion.split('-');
        req.body.fecha_creacion = new Date(`${anio}-${mes}-${dia}`);
    }
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.contrasena = bcrypt.hashSync( contrasena, salt );

        try {
            await usuario.save();

        //3.- Generar el token
        const token = await generarJWT(usuario.id);
            res.json({
                ok: true,
                usuario,
                token
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

    /*creamos una funcion para valdiar que la fecha sea la correcta */
function validarFecha(fecha) {
    // Expresión regular para validar el formato dd-mm-yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

    // Verifica si el formato es correcto
    if (!regex.test(fecha)) {
        return false; // Formato incorrecto
    }

    // Extraer día, mes y año
    const [dia, mes, anio] = fecha.split('-').map(Number);

    // Crear un objeto Date para verificar si la fecha es válida
    const fechaObj = new Date(anio, mes - 1, dia); // mes - 1 porque los meses empiezan desde 0

    // Comprobar si la fecha construida coincide con la original
    return fechaObj.getFullYear() === anio && 
           fechaObj.getMonth() === (mes - 1) && 
           fechaObj.getDate() === dia;
}

function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-11) y lo formatea
    const anio = fecha.getFullYear(); // Obtiene el año

    return `${dia}-${mes}-${anio}`; // Retorna la fecha en formato dd-mm-yyyy
}



module.exports = {
    getUsuario,
    getUsuarioId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}