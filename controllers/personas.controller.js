const { response } = require('express');
const Persona = require('../model/persona.model');

//1.- consulta de personas
/*const getPersona = async (req, res) => {

    const persona = await Persona.find({}, 'primer_apellido segundo_apellido primer_nombre segundo_nombre fecha_nacimiento ci_pasaporte_rif estado_civil parentesco tipos');
    res.json({
        ok: true,
        persona
    });
} ejemplo rapido*/
const getPersona = async (req, res) => {
    try {
        // Obtener todas las personas con los campos deseados
        const personas = await Persona.find({}, 'primer_apellido segundo_apellido primer_nombre segundo_nombre fecha_nacimiento ci_pasaporte_rif estado_civil parentesco tipos');

        // Función para formatear la fecha
        const formatearFecha = (fecha) => {
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
            const anio = fecha.getFullYear();
            return `${dia}-${mes}-${anio}`;
        };

        // Formatear la fecha de nacimiento para cada persona
        const personasResponse = personas.map(persona => ({
            ...persona.toObject(), // Convierte el documento a un objeto simple
            fecha_nacimiento: formatearFecha(persona.fecha_nacimiento) // Formatea la fecha
        }));

        res.json({
            ok: true,
            personas: personasResponse // Devuelve la lista de personas con fechas formateadas
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las personas.'
        });
    }
}
 

/*consulta por ID*/
const getPersonaId = async (req, res) => {
    const pid = req.params.id;

    try {
        // Encuentra la persona por ID
        const personaDB = await Persona.findById(pid);

        if (!personaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario por ese ID.'
            });
        }

        // Formatear la fecha de nacimiento antes de enviarla
        const personaResponse = {
            ...personaDB.toObject(), // Convierte el documento a un objeto simple
            fecha_nacimiento: formatearFecha(personaDB.fecha_nacimiento) // Formatea la fecha
        };

        res.json({
            ok: true,
            persona: personaResponse
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la persona.'
        });
    }
}


/*const crearPersona = async (req, res) => {

    //console.log(req.body);
    const{ primer_apellido, segundo_apellido, primer_nombre, segundo_nombre,
           fecha_nacimiento, ci_pasaporte_rif, estado_civil, parentesco
            } = req.body

    // Convertir la fecha de nacimiento de dd-mm-yyyy a un objeto Date
    const [dia, mes, anio] = fecha_nacimiento.split('-');
    const fechaFormateada = new Date(`${anio}-${mes}-${dia}`);        

    const persona = new Persona(req.body);

    await persona.save();

    res.json({
        ok: true,
        persona
    });
}*/

//2.- crear personas
const crearPersona = async (req, res) => {
    
    const { fecha_nacimiento } = req.body;

    // Convertir la fecha de nacimiento de dd-mm-yyyy a un objeto Date
    if (fecha_nacimiento) {
        const [dia, mes, anio] = fecha_nacimiento.split('-');
        req.body.fecha_nacimiento = new Date(`${anio}-${mes}-${dia}`);
    }

    const persona = new Persona(req.body); // Crear el objeto Persona

    try {
        await persona.save(); // Guardar en la base de datos
        res.json({
            ok: true,
            persona
        });
    } catch (error) {
        console.error('Error al guardar la persona:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar la persona',
            error
        });
    }
}

const actualizarPersona = async(req, res = response) => {
     
    const pid = req.params.id;

    try {
        //1.- encuntra el pid de la persona
        const personaDB = await Persona.findById(pid);

        if( !personaDB ){
            return res.status(404).json({
                ok: true,
                msg: 'No existe usuario por ese id mejorar este mensaje'
            });
        }

        //2.- actualiza el resitro por ese pid
        const campos = req.body; //son los campos del endpoint | postman

           // 2.1.- Validar y convertir la fecha de nacimiento si esta presente
    if (campos.fecha_nacimiento) {
        if(validarFecha(campos.fecha_nacimiento)){

            const [dia, mes, anio] = campos.fecha_nacimiento.split('-');
            campos.fecha_nacimiento = new Date(`${anio}-${mes}-${dia}`);
        } else {
            return res.status(400).json({
                    ok: false,
                    msg: 'El formato de la fecha de nacimiento es incorrecto o no es una fecha válida.'
                });
            }
        }

        //2.2.- Eliminar campos que no deseo actualizar
        delete campos.ci_pasaporte_rif;
        delete campos.id_genero;        
        
        //3.- Actuzlizar la persona en la bd
            const edicionPersona = await Persona.findByIdAndUpdate(pid, campos, {new: true} );
            /*
            Actualización con Opción { new: true }:
            Al usar findByIdAndUpdate,
            se añade { new: true }
            como opción para que Mongoose devuelva el documento actualizado en lugar del original.
            */
    
            res.json({
                ok: true,
                persona: edicionPersona
            });
            
        } catch (error) {
     
        
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'error al actualizar mejorar este mensaje'
            });
            
        }
    }
        

const eliminarPersona = async(req, res = response ) => {
    
    const pid = req.params.id;
    try {

         //1.- encuntra el pid de la persona
        const personaDB = await Persona.findById(pid);

        if( !personaDB ){
            return res.status(404).json({
                ok: true,
                msg: 'No existe usuario por ese id mejorar este mensaje'
            });
        }
        await Persona.findByIdAndDelete(pid);


        res.json({
            ok: true,
            msg: 'Usuario eliminado !'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
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
    getPersona,
    getPersonaId, 
    crearPersona,
    actualizarPersona,
    eliminarPersona,
}