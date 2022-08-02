import {Router} from "express"
import { EmailGet, idusuarioGet, NombreGet, usuarioDelete, usuarioGet,usuarioLogin,usuarioPost, UsuarioPut, UsuarioPutActivate, UsuarioPutDeActivate } from "../controllers/persona.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersUsuarios from "../helper/helperpersona.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"


const router=new Router()


router.get('/',usuarioGet)  //buscar todos
router.get('/nom',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
NombreGet)  //buscar por nombre

router.get('/email',[
    check('email').custom( helpersUsuarios.existeEmail ),
],EmailGet) //buscar email


router.get('/id',[
    check('id', 'ingrese el id').not().isEmpty(),
    validarCampos
],
idusuarioGet) //buscar por id


router.post('/login',[
    
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'Password no es válido').not().isEmpty(),
    validarCampos
], usuarioLogin )  // login

router.post('/post',[
       
        check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
        check('nombre', 'el nombre debe tener maximo 25 caracteres').isLength({ max: 25}),

        check('apellido', 'El apellido es obligatorio!').not().isEmpty(),
        check('apellido', 'El apellido debe tener 25 caracteres').isLength({ max: 25}),

        check('edad', 'Ingrese el campo edad ').not().isEmpty(),

        check('email', 'El correo no es válido').isEmail(),
        check('email').custom( helpersUsuarios.existeEmail ),

        check('password', 'llene el campo de contraseña').not().isEmpty(),
        check('password', 'Password no es válido').isLength({ min: 8}),
         
        validarCampos       
    ], usuarioPost) //añadir

router.delete('/delete',[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),
    validarCampos
], usuarioDelete)

router.put('/modificar/:id',[
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 25 caracteres').isLength({ max: 25}),

    check('apellido', 'El apellido es obligatorio!').not().isEmpty(),
    check('apellido', 'El apellido debe tener 25 caracteres').isLength({ max: 25}),

    check('edad', 'Ingrese el campo edad ').not().isEmpty(),

    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),

    check('password', 'llene el campo de contraseña').not().isEmpty(),
    check('password', 'Password no es válido').isLength({ min: 8}),
    validarCampos
],UsuarioPut)


router.put('/activo/:id',[
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos

],UsuarioPutActivate)


router.put('/inactivo:id',[
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
],UsuarioPutDeActivate)


export default router