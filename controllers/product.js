coconst Product = require('../models/Product');
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

exports.getProductsBySlug = (req, res) => {
	const { slug } = req.params;
	Category.findOne({ slug: slug })
	  .select("_id type")
	  .exec((error, category) => {
		if (error) {
		  return res.status(400).json({ error });
		}
	})
};
		
			
  
  exports.getProductDetailsById = (req, res) => {
	const { productId } = req.params;
	if (productId) {
	  Product.findOne({ _id: productId }).exec((error, product) => {
		if (error) return res.status(400).json({ error });
		if (product) {
		  res.status(200).json({ product });
		}
	  });
	} else {
	  return res.status(400).json({ error: "Params required" });
	}
  };
  
  // new update
  exports.deleteProductById = (req, res) => {
	const { productId } = req.body.payload;
	if (productId) {
	  Product.deleteOne({ _id: productId }).exec((error, result) => {
		if (error) return res.status(400).json({ error });
		if (result) {
		  res.status(202).json({ result });
		}
	  });
	} else {
	  res.status(400).json({ error: "Params required" });
	}
  };
  
  exports.getProducts = async (req, res) => {
	const products = await Product.find({ createdBy: req.user._id })
	  .select("_id name price quantity slug description productPictures category")
	  .populate({ path: "category", select: "_id name" })
	  .exec();
  
	res.status(200).json({ products });
  };
