import mongoose from "mongoose";

const ActorSchema= new mongoose.Schema({
    nombre:{type: String, maxlength: 60, required:true},
    foto:{type: String},
    alias:{type: String, maxlength: 20, required:true},
    biografia:{type: String, maxlength: 500, required:true},
    creatAt:{type:Date, default:Date.now}
    
})

export default mongoose.model('Actor',ActorSchema)