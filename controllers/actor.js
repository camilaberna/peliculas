import actor from "../models/actor.js"
import Actor from "../models/actor.js"


const actorGet= async(req,res)=>{ //listar todos los actotes
    const actores =await Actor.find()
    res.json({
        actores
    })
}

const actorNombreGet= async(req,res)=>{ //buscar actor por nombre
    const {nombre}=req.query
    const actores=await Actor.find({nombre})
    if (actores)
        res.json({actores})
    else
        res.json(`${nombre} No encontrado`)
}
const idActorGet= async(req,res)=>{ //buscar por id
    const{id}=req.query
    const actores =await Actor.findById({id})
    res.json({
        actores
    })
}

const actorPost=async(req,res)=>{ // añadir
    const{nombre,foto,biografia,alias}=req.body
    const actores= new Actor({nombre,foto,biografia,alias})
    actores.save()
    res.json({actores})
}
const actoresPost=async(req,res)=>{ // añadir foto
    const{foto}=req.body
    const actores= new Actor({foto})
    actores.save()
    res.json({actores})
}

const ActorPut = async (req, res) => {  //modificar  
    const { id } = req.params;  
    const { _id, createdAt, ...resto } = req.body;
    const modificar = await Actor.findByIdAndUpdate(id, resto);

    res.json({
        modificar
    })}

const actorDelete=async(req,res)=>{ //eliminar
    const {nombre}=req.query
    const actores=await Actor.findOneAndDelete({nombre}) 
    res.json({
        msg:` ${actores} Ha sido eliminada`
    })
  }

export {actorGet,actorNombreGet,actorPost,actorDelete,ActorPut,idActorGet,actoresPost}