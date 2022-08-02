import {Router} from "express"
import {favoritoGet,favoritoPost, favoritoDelete, favoritoId, titulopeliculaGet } from "../controllers/favorito.js"
const router=new Router()
import {validarCampos} from "../middleware/middleware.js"
import helpersPelicula from "../helper/helperpelicula.js"
import helpersFavorito from "../helper/helperfavorito.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"


router.get('/usuario/:_id',[
    validarJWT,
    check('idusuario', 'maximo 30').not().isLength({max: 30}),
    check('idusuario', 'Complete el idusuario').not().isEmpty(),
    check('idusuario').custom(helpersFavorito.existeFavoritoById), 
    validarCampos 

],favoritoGet)
router.get('pelicula/:_id',[
    validarJWT,
    check('idpelicula', 'maximo 30').not().isLength({max: 30}),
    check('idpelicula', 'Complete el id pelicula').not().isEmpty(),
    check('idpelicula').custom(helpersFavorito.existeFavoritoById), 
    validarCampos


],titulopeliculaGet)
router.get('/id/:titulo',[
    check('titulo', 'El titulo es obligatorio!').not().isEmpty(),
    check('titulo').custom( helpersPelicula.existeTitulo ),
    check('titulo', 'maximo 30').isLength({max: 30}),
    check('subtitulo', 'El subtitulo es obligatorio!').not().isEmpty(),
    check('subtitulo').custom( helpersPelicula.existeSubtitulo ),
    check('subtitulo', 'maximo 30').isLength({max: 30}),
],favoritoId)

router.post('/anadir',[

    check('idusuario', 'maximo 30').not().isLength({max: 30}),
    check('idusuario', 'Complete el idusuario').not().isEmpty(),
    check('idusuario').custom(helpersFavorito.existeFavoritoById), 
    check('idpelicula', 'maximo 30').not().isLength({max: 30}),
    check('idpelicula', 'Complete el id pelicula').not().isEmpty(),
    check('idpelicula').custom(helpersFavorito.existeFavoritoById),
    validarCampos
],favoritoPost)

router.delete('/eliminar',[
    check('idpelicula', 'maximo 30').not().isLength({max: 30}),
    check('idpelicula', 'Complete el id pelicula').not().isEmpty(),
    check('idpelicula').custom(helpersFavorito.existeFavoritoById),
], favoritoDelete)


export default router