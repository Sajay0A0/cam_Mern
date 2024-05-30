const express=require('express');
const router =express.Router();
const userController=require ('../controller/contro');
const adminController=require('../controller/adminControl');
const emailController=require('../controller/emailContro');
// const userMiddleware=require ('../middleware/userMiddleware');
// const adminMiddleware=require('../middleware/adminMiddleware');


router.post('/signup',userController.createUser);
router.post('/login',userController.loginUser);
router.get('/getproducts',userController.getAllProduct);
router.post('/addcart',userController.addCart);
router.post('/getcart',userController.getCart);
router.post('/removecart',userController.removeCart);
router.post('/updatecart',userController.updateCart)
router.post('/deletecart',userController.deleteCartItem)
router.post('/addlike',userController.addLike);
router.post('/getlike',userController.getLike);
router.post('/summery',userController.prodSummery);

router.post('/addAddress',userController.addAddress);
router.post('/getAddress',userController.getAddress);
router.post('/deleteAddress/:email',userController.deleteAddress);
router.post('/updateAddress/:email',userController.updateAddress);

// router.post('/increaseqnty',userController.increasQuantity);

// router.post('/adsign',adminController.admin);
router.post('/adlogin',adminController.loginAdmin);
router.get('/getusers',adminController.findAllUsers);
router.post('/add',adminController.addProduct);
router.put('/update/:id',adminController.updateProduct);
router.delete('/delete/:id',adminController.deleteProduct);
router.get('/getproducts',adminController.getAllProduct)
router.delete('/dltuser/:id',adminController.deleteUser)

router.post('/sndemail',emailController.createEmail)

module.exports=router;