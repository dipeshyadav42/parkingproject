const router=require('express').Router()
const regc=require('../controller/regcontroller')
const parkingc=require('../controller/parkingcontroller')


router.get('/',regc.loginpage)
router.post('/',regc.logincheck)

router.get('/reg',regc.regform)
router.post('/reg',regc.register)

router.get('/parking',parkingc.parkingdetails)
router.get('/addnew',parkingc.addform)
router.post('/addnew',parkingc.add)
router.get('/parkingupdate/:id',parkingc.update)
router.get('/parkingprint/:id',parkingc.print)
router.get('/parkingdelete/:id',parkingc.delete)



module.exports=router