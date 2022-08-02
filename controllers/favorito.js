import Favorito from "../models/favorito.js"

const favoritoGet=async (req,res)=>{
  const favoritos=await Favorito.find().populate("idpelicula","titulo").populate("idusuario","nombre")
  res.json({favoritos})
 

}

const favoritoPost=async(req,res)=>{
  const{idpelicula,idusuario}=req.body
  const favoritos= new Favorito({idpelicula,idusuario})
  favoritos.save()
  res.json({favoritos})
}

const favoritoDelete=async(req,res)=>{
  const {idpelicula}=req.query
  const favoritos=await Favorito.findOneAndDelete({idpelicula}) 
  res.json({
      msg:` ${favoritos} Ha sido eliminada`
  })
}
const favoritoId=async (req,res)=>{
  const {_id}=req.params
  const favorito=await Favorito.find({idusuario:_id}).populate("idusuario","nombre")
  res.json({favorito})
}

const titulopeliculaGet= async(req,res)=>{ //listar por titulo
  const {titulo}=req.params
  const favoritos=await Favorito.find(
    {
      $or:[
        {titulo:new RegExp(titulo,"i")},
        {subtitulo:new RegExp(titulo,"i")}
      ]
    }
  )
  if (favoritos)
      res.json({favoritos})
  else
      res.json(`${titulo} No encontrado`)
}

export {favoritoGet,favoritoPost,favoritoDelete,favoritoId,titulopeliculaGet}