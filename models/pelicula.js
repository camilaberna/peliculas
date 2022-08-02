import mongoose from "mongoose";

const PeliculaShema=new mongoose.Schema({
  titulo:{type:String, maxlength:30, required:true},
  Subtitulo:{type:String, maxlength:30},
  foto:{type:String},
  creador:{type:String, maxlength:25, required:true},
  sinopsis:{type:String, maxlength:600, required:true},
  reparto:[
    {
      idactor:{type:mongoose.Schema.ObjectId,ref:"Actor",required:true},
      personaje:{type:String, maxlength:25},
      rol:{type:String, maxlength:25}
    }
  ],
  duracion: {type:String, maxlength:25, required:true},
  publicacion:{type:String},
  categoria:{type:String, maxlength:25, required:true},
  createdAT:{type:Date, default:Date.now}
})
export default mongoose.model('Pelicula',PeliculaShema)