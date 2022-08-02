import Pelicula from "../models/pelicula.js"
import subirArchivo from "../helper/subir-Archivo.js"
import { v2 as cloudinary } from 'cloudinary'


const peliculaGet= async(req,res)=>{ //listar todo
  
    const peliculas =await Pelicula.find()
    res.json({
        peliculas
    })
}


/* const peliculaGet= async(req,res)=>{ //listar todo
    const {_id}=req.params
    const peliculas =await Pelicula.find({idactor:_id}).populate("idactor",["nombre","foto","alias"])
    res.json({
        peliculas
    })
} */
const GetTitulo= async(req,res)=>{  //buscar por titulo
    const {titulo}=req.query
    const peliculas=await Pelicula.find(
      {
        $or:[
          {titulo:new RegExp(titulo,"i")},
          {subtitulo:new RegExp(titulo,"i")}
        ]
      }
    )
    if (peliculas)
        res.json({peliculas})
    else
        res.json(`${titulo} No encontrado`)
  }

  const idPeliculaGet= async(req,res)=>{ //buscar por id
    const{_id}=req.query
    const peliculas =await Pelicula.findById({_id})
    res.json({
        peliculas
    })
}
const GetNombre= async(req,res)=>{  //buscar por nombre actor
    const {nombre}=req.query
    const peliculas=await Pelicula.find(
      {
        $or:[
          {nombre:new RegExp(nombre,"i")},
          {alias:new RegExp(nombre,"i")}
        ]
      }
    )
    if (peliculas)
        res.json({peliculas})
    else
        res.json(`${nombre} No encontrado`)
  }

const peliculaPost=async(req,res)=>{ //añadir pelicula
    const{titulo,sinopsis,reparto,poster,creador,duracion,fechaPublicacion,categoria}=req.body
    const pelicula= new Pelicula({titulo,sinopsis,poster,creador,reparto,duracion,fechaPublicacion,categoria})
    pelicula.save()
    res.json({pelicula})
}

const PeliculaPut = async (req, res) => {  //modificar  
    const { id } = req.params;  
    const { _id, createdAt,idactor, ...resto } = req.body;
    const modificar = await Pelicula.findByIdAndUpdate(id, resto);

    res.json({
        modificar
    })}

const peliculaDelete=async(req,res)=>{ //eliminar
    const {titulo}=req.query
    const pelicula=await Pelicula.findOneAndDelete({titulo}) 
    res.json({
        msg:` ${pelicula} Ha sido eliminada`
    })
  }

  const cargarArchivo= async (req, res) => {
    const { id } = req.params;
    try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));

        //persona a la cual pertenece la foto
        let pelicula = await Pelicula.findById(id);
        if (pelicula.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', pelicula.foto);
            
            if (fs.existsSync(pathImage)) {
                console.log('Existe archivo');
                fs.unlinkSync(pathImage)
            }
            
        }
       
       pelicula = await Pelicula.findByIdAndUpdate(id, { foto: nombre })
        //responder
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}


    const cargarArchivoCloud=async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        });

        const { id } = req.params;
        try {
            //subir archivo

            const { tempFilePath } = req.files.archivo
            cloudinary.uploader.upload(tempFilePath,
                { width: 250, crop: "limit" },
                async function (error, result) {
                    if (result) {
                        let pelicula = await Pelicula.findById(id);
                        if (pelicula.foto) {
                            const nombreTemp = pelicula.photo.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        pelicula = await Pelicula.findByIdAndUpdate(id, { foto: result.url })
                        //responder
                        res.json({ url: result.url });
                    } else {
                        res.json(error)
                    }

                })
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
    }




    const mostrarImagenCloud= async (req, res) => {
        const { id } = req.params

        try {
            let pelicula = await Pelicula.findById(id)
            if (pelicula.foto) {
                return res.json({ url: pelicula.foto })
            }
                    res.status(400).json({ msg: 'Falta Imagen' })
                } catch (error) {
                    res.status(400).json({ error })
                }
            }



export {peliculaGet,GetTitulo,peliculaPost,peliculaDelete,idPeliculaGet,GetNombre,PeliculaPut,cargarArchivo,cargarArchivoCloud,mostrarImagenCloud}