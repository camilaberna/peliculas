import Comentario from "../models/comentario.js";


const comentarioPeliGet= async(req,res)=>{ //Listar todos los Comentarios de una Película 
    const {_id}=req.params

    const comentarios= await Comentario.find({idPelicula:_id}).populate("idPelicula","titulo")

    res.json({
        comentarios
    })
}
const comentarioUsuaGet= async(req,res)=>{ //Listar todos los Comentarios de un Usuario 
    const {_id}=req.params
    const comentarios= await Comentario.find({idUsuario:_id}).populate("idUsuario",["nombre","apellido"])

    res.json({
        comentarios
    })
}

const  idComenGet= async(req,res)=>{ //listar por id
    const {_id}=req.params
    const comentario=await Comentario.find({comentario,idusuario:_id}).populate("idpelicula","titulo").populate("idusuario","nombre")
    res.json({comentario})
}
const Getcomentario= async(req,res)=>{ //listar por comentario
    const {comentario}=req.query
    const comentarios=await Comentario.find({comentario})
    res.json({
      comentarios
    })
}

const comentarioPost=async(req,res)=>{ //añadir
    const {comentario,idPelicula,idUsuario}=req.body
    const comentarios= new Comentario({comentario,idPelicula,idUsuario})
    comentarios.save()
    res.json({comentarios})
}

const comentarioDelete=async(req,res)=>{ //eliminar
    const {idPelicula}=req.query
    const comentario=await Comentario.findByIdAndDelete({idPelicula})

    res.json({
        msg:`El comentario ha sido eliminado`
    })

}

export {comentarioPeliGet,comentarioUsuaGet,comentarioPost,comentarioDelete,idComenGet,Getcomentario}
