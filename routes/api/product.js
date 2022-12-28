const express = require('express');
const { createProduct } = require('../../controllers/product');
const multer = require('multer');  //Multer is an Express middleware 
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const Product = require('../../models/Product');
const storage = multer.diskStorage({
  

    destination: function(req , file , cb ) {
    cb(null , path.join( path.dirname(__dirname), 'uploads'))

     
},
filename: function(req , file , cb ){
    cb(null , shortid.generate() + '-' + file.originalname);
}
})


const upload = multer ({ storage });


router.post('/product/create', upload.array('productPicture') , createProduct);
//array because i going to have multable images of one product
/*
router.post('/product/create', (req, res ) => {
   res.status(200).json({
    massage: 'Hello'
   })     
});
*/
//array because i going to have multable im
module.exports = router;


/*
 error postman
<pre>Cannot POST /api/product/create</pre>

*/

// another way to update product
    
/*
router.patch('/:productID' , (req , res , next) => {
  

    const newproduct ={
        name: req.body.name ,
        price: req.body.price ,


    }
    Product.update({ _id : req.params.productID} , { $set :  newproduct}).
    then(doc => {
        res.status(200).json({
            massage : doc
        })
    }).
    catch( err => {
        res.status(404).json({
            massage : err ,
        })
    })

})

*/


// another way to delete product 


router.delete('/:productID' , (req , res , next) => {
  
    Product.deleteOne(req.params.productID).
    then(doc => {
        res.status(200).json({
            massage : doc
        })
    }).
    catch( err => {
        res.statusCode(404).json({
            massage : err ,
        })
    })

})
 
