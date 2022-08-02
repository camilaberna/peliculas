
import Usuario from "../models/persona.js"
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middleware/validartoken.js"

const usuarioGet= async(req,res)=>{  //buscar todos
    const usuarios =await Usuario.find()
    res.json({
        usuarios
    })
}
const NombreGet= async(req,res)=>{ //buscar por nombre
    const{nombre}=req.query
    const usuarios =await Usuario.findById({nombre})
    res.json({
        usuarios
    })
}
const EmailGet= async(req,res)=>{ //buscar email
    const{email}=req.query
    const usuarios =await Usuario.findById({email})
    res.json({
        usuarios
    })
}
const idusuarioGet= async(req,res)=>{ //buscar por id
    const{_id}=req.query
    const usuarios =await Usuario.findById({_id})
    res.json({
        usuarios
    })
}

const usuarioLogin= async(req,res)=>{ // login
    const { email, password } = req.body;

        try {
            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }


            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }

            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }

            const token = await generarJWT(usuario.id);

            res.json({
                usuario,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
}

const usuarioPost=async(req,res)=>{ //añadir
    const{nombre,apellido,email,password}=req.body
    const usuario= new Usuario({nombre,apellido,email,password})
    const salt= bcryptjs.genSaltSync(10)
    usuario.password=bcryptjs.hashSync(password,salt)
    usuario.save()
    res.json({usuario})
}
const usuarioDelete=async(req,res)=>{ //eliminar
    const {email}=req.query
    const persona=await Usuario.findOneAndDelete({email}) 
    res.json({
        msg:` Ha sido eliminada`
    })
}
 
const UsuarioPut = async (req, res) => {  //modificar  
    const { id } = req.params;  
    const { _id, createdAt,estado, ...resto } = req.body;
    const modificar = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        modificar
    })}

const UsuarioPutActivate=async (req, res) => {   
    const { id } = req.params;
    const activo = await Usuario.findByIdAndUpdate(id, {estado:1});

    res.json({
        activo
    })
}

const UsuarioPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const descativo = await Usuario.findByIdAndUpdate(id, {estado:0});

    res.json({
        descativo
    })
}

export {usuarioGet,usuarioLogin,usuarioPost,usuarioDelete,UsuarioPut,NombreGet,EmailGet,idusuarioGet,UsuarioPutActivate,UsuarioPutDeActivate}