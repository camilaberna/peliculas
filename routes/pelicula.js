import {Router} from "express"
import { peliculaDelete, peliculaGet,  peliculaPost, GetTitulo, idPeliculaGet, GetNombre, PeliculaPut,cargarArchivo,cargarArchivoCloud,mostrarImagenCloud } from "../controllers/pelicula.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersPelicula from "../helper/helperpelicula.js"
import { check } from "express-validator"
import validarExistaArchivo from "../middleware/validar-existe-archivo.js"
import { validarJWT } from "../middleware/validartoken.js"


const router=new Router()






router.get('/buscar',[
    validarJWT,
    validarCampos 
],
peliculaGet)

router.get('/buscapeli',[
    check('titulo', 'Complete el titulo').not().isEmpty(),
    check('titulo', 'maximo 30').not().isLength({max: 30}),
    validarCampos 
],GetTitulo)

router.get('/buscaid',[
    check('id', 'maximo 30').not().isLength({max: 30}),
    check('id', 'Complete el id').not().isEmpty(),
    validarCampos 
],
idPeliculaGet)

router.get('/nombre',[
    check('nombre', 'Complete el nombre').not().isEmpty(),
    check('nombre', 'maximo 30').not().isLength({max: 30}),

    validarCampos 
],GetNombre)


router.post('/anadir',[
        
        check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
        check('titulo').custom( helpersPelicula.existeTitulo ),
        check('titulo', 'maximo 30').isLength({max: 30}),

        check('subtitulo', 'El subtitulo es obligatorio!').not().isEmpty(),
        check('subtitulo').custom( helpersPelicula.existeSubtitulo ),
        check('subtitulo', 'maximo 30').isLength({max: 30}),


        check('sinopsis', 'Complete la sinopsisi').not().isEmpty(),
        check('sinopsis', 'maximo 300').isLength({max: 300}),

       
        check('personaje', 'maximo 25').isLength({max: 25}),
        check('rol', 'maximo 25').isLength({max: 25}),

        check('duracion', 'complete el campo duaracion').not().isEmpty(),
        check('duracion', 'maximo 25').isLength({max: 25}),

        check('publicacion', 'complete el campo publicacion').not().isEmpty(),
        check('publicacion', 'maximo 25').isLength({max: 25}),

        check('categoria', 'complete el campo categoria').not().isEmpty(),
        check('categoria', 'maximo 25').isLength({max: 25}),

        check('creador', 'complete el campo creador').not().isEmpty(),
        check('creador', 'maximo 25').isLength({max: 25}),
        
        
        
        validarCampos       

], peliculaPost)
router.post('/poster',
[
check('poster', 'complete el campo poster').not().isEmpty(),

],cargarArchivo)
router.put('/modificar',[
    check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
    
    check('titulo', 'maximo 30').isLength({max: 30}),

    check('subtitulo', 'El subtitulo es obligatorio!').not().isEmpty(),
    check('subtitulo', 'maximo 30').isLength({max: 30}),

    
    check('sinopsis', 'Complete la sinopsisi').not().isEmpty(),
    check('sinopsis', 'maximo 500').isLength({max: 500}),

    check('reparto').custom( helpersPelicula.validarMongoID ),
    check('personaje', 'maximo 25').isLength({max: 25}),
    check('rol', 'maximo 25').isLength({max: 25}),

    check('duracion', 'complete el campo duaracion').not().isEmpty(),
    check('duracion', 'maximo 25').isLength({max: 25}),

    check('publicacion', 'complete el campo publicacion').not().isEmpty(),
    
    check('categoria', 'complete el campo categoria').not().isEmpty(),
    check('categoria', 'maximo 25').isLength({max: 25}),

    check('creador', 'complete el campo creador').not().isEmpty(),
    check('creador', 'maximo 25').isLength({max: 25}),

    validarCampos 
], PeliculaPut)
router.delete('/eliminar',[
    check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('titulo', 'maximo 30').isLength({max: 30}),
    
], peliculaDelete)

router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPelicula.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],cargarArchivo)

router.post('/uploadcloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPelicula.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],cargarArchivoCloud)


router.get('/uploadcloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPelicula.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],mostrarImagenCloud)




export default router