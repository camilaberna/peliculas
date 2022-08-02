import Usuario from "../models/persona.js"


const helpersUsuarios={
    existeUsuarioById : async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEmail :() => {
        return async (req, res, next) => {
            const existe = await Usuario.findOne({ email: req.body.email });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El email ya está registrado` });
                    //throw new Error(`El email ya está registrado`)
                }
        
        }
    },
  

    

}
export default helpersUsuarios