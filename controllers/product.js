const Product = require('../models/Product');
const shortid = require('shortid');  //ShortId creates amazingly short non-sequential url-friendly unique ids
const slugify = require('slugify');

exports.createProduct = (req, res ) => {    
   // res.status(200).json({file: req.files,body: req.body });
	
const {
    name , price ,description  ,quantity , createdBy
} = req.body;

let productPictures = [];

  if (req.files.length > 0){
    productPictures = req.files.map(file => {
        return {img : file.filename } //in models/product the array have an object img
    });

  } 
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        createdBy: req.user._id,
    });
    product.save((error, product) => {
        if(error) return res.status(400).json({ error });
          if (product) {
            req.status(201).json({ product });
         }
    });
};
/*
exports.update = async (req, res) => {
	const productId = req.params.productId;

	if (req.file !== undefined) {
		req.body.fileName = req.file.filename;
	}

	const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

	if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
		fs.unlink(`uploads/${oldProduct.fileName}`, err => {
			if (err) throw err;
			console.log('Image deleted from the filesystem');
		});
	}

	res.json({
		successMessage: 'Product successfully updated',
	});
};

exports.delete = async (req, res) => {
	try {
		const productId = req.params.productId;
		const deletedProduct = await Product.findByIdAndDelete(productId);

		fs.unlink(`uploads/${deletedProduct.fileName}`, err => {
			if (err) throw err;
			console.log(
				'Img successfully deleted from filesystem: ',
				deletedProduct.fileName
			);
		});

		res.json(deletedProduct);
	} catch (err) {
		console.log(err, 'productController.delete error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};
*/


//another  way to update product in file product in routes
//another  way to delete product in file product in routes