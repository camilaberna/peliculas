import {Router} from "express"
import {actorGet,actorPost,actorDelete, ActorPut, idActorGet, actorNombreGet, actoresPost} from "../controllers/actor.js"
const router=new Router()
import { check } from "express-validator"





router.get('/buscar',actorGet)//listar todos


router.get('/buscacto',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 30 caracteres').isLength({ max: 30}),
],actorNombreGet)//buscar por nombre 


router.get('/',[
    check('id', 'ingrese el id').not().isEmpty(),
],idActorGet) //buscar por id


router.post('/anadir',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 60 caracteres').isLength({ max: 60}),

    check('alias', 'el alias es obligatorio').not().isEmpty(),
    check('alias', 'el alias debe tener maximo 20 caracteres').isLength({ max: 20}),

    check('biografia', 'la biografia es obligatoria').not().isEmpty(),
    check('biografia', 'la biografia debe tener maximo 500 caracteres').isLength({ max: 500}),

], actorPost)//AÑADIR

router.post('/',[
    check('foto', 'complete el campo foto').not().isEmpty()
], actoresPost)//AGREGAR FOTO

router.delete('/eliminar',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 30 caracteres').isLength({ max: 30}),
], actorDelete)//ELIMINAR



router.put('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 30 caracteres').isLength({ max: 30}),

    check('alias', 'el alias es obligatorio').not().isEmpty(),
    check('alias', 'el alias debe tener maximo 20 caracteres').isLength({ max: 20}),

    check('biografia', 'la biografia es obligatoria').not().isEmpty(),
    check('biografia', 'la biografia debe tener maximo 100 caracteres').isLength({ max: 100}),
], ActorPut)//MODIFICAR


export default router