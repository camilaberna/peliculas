import {Router} from "express"
import { comentarioPost, comentarioDelete, comentarioPeliGet, comentarioUsuaGet, idComenGet, Getcomentario } from "../controllers/comentario.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersPelicula from "../helper/helperpelicula.js"
import helpersUsuarios from "../helper/helperpersona.js"
import helpersComentario from "../helper/helpercomentario.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()


router.get('/comenpeli/:_id',[
    validarJWT,
    check('idpelicula', 'maximo 30').not().isLength({max: 30}),
    check('idpelicula', 'Complete el idusuario').not().isEmpty(),
    check('idpeliculs').custom(helpersPelicula.existePeliculaById), 
    validarCampos
],comentarioPeliGet)

router.get('/comenusua/:_id',[
    validarJWT,
    check('idusuario', 'maximo 30').not().isLength({max: 30}),
    check('idusuario', 'Complete el id usuario').not().isEmpty(),
    check('idusuario').custom(helpersUsuarios.existeUsuarioById), 
    validarCampos

],comentarioUsuaGet)
router.get('/id/:_id',[
    validarJWT,
    check('idusuario', 'maximo 30').not().isLength({max: 30}),
    check('idusuario', 'Complete el id usuario').not().isEmpty(),
    check('idusuario').custom(helpersUsuarios.existeUsuarioById), 
    validarCampos
],idComenGet)
router.get('/comen',[
    validarJWT,
    check('id','Maximo 30').isLength({ max: 30}),
    check('id','complete el id').not().isEmpty(),
    check('id').custom( helpersComentario.existeComentarioById ),
    validarCampos
],Getcomentario)

router.post('/',[
    validarJWT,
    check('comentario','Maximo 200').isLength({ max: 200}),
    check('comentario','complete el comentario').not().isEmpty(),
    validarCampos
], comentarioPost)

router.delete('/eliminar',[
    validarJWT,
    check('id','Maximo 30').isLength({ max: 30}),
    check('id','complete el id').not().isEmpty(),
    check('id').custom( helpersComentario.existeComentarioById ),
    validarCampos
],comentarioDelete)

export default router