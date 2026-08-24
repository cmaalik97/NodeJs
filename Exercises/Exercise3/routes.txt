import  express from 'express';

import { protect } from '../Middleware/protect.js';
import { login, register } from '../Controllers/StudentController.js';
import { authorize } from '../Middleware/auth.js';

const router=express.Router();



router.post('/create' , register)
router.post('/login' , login)

router.get('/profile' ,protect, (req, res)=>{
     res.json(req.student);
})

router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({
    message: `Welcome to the admin dashboard, ${req.student.name}`
  });
});


export default router;