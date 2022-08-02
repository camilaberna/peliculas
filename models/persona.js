import mongoose from "mongoose";
const UsuarioSchema= new mongoose.Schema({
    nombre:{type:String,maxlength:25,required:true},
    apellido:{type:String,maxlength:25,required:true},
    edad:{type:Number,required:0,default:0},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    estado:{type:Number,default:1},
    foto:{type:String, },
    creatAt:{type:Date,default:Date.now}
    
})


export default mongoose.model('Usuario',UsuarioSchema)