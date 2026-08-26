import  express from 'express';
import { getUsers, getOneUser, updatUser, postUser, deleteUser, register, login } from '../Controllers/user.js';
import { protect } from '../Middleware/protect.js';
import { validate } from '../Middleware/validateZod.js';
import { createUserSchema } from '../Schema/userSchemas.js';

const router=express.Router();

router.get('/',getUsers )
router.get('/users/:id' , getOneUser)
router.put('/users/:id' , updatUser)
router.post('/' , postUser)
router.delete('/users/:id' , deleteUser)

router.post('/create' , validate(createUserSchema), register)
router.post('/login' , login)

router.get('/profile' ,protect, (req, res)=>{
     res.json(req.user);
})
// module.exports=router;
export default router;