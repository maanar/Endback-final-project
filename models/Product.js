const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({ //product schema
    name: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        required: true,
        unique: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity:{
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      offer: {
        type: Number
      },
      productPictures: [
        { 
            img: {
                type: String
            } 
        }
      ],

      reviews: [
        { 
          userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
          review: String
        }
      ],
      createdBy: 
        { 
          type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
          updatedAt: Date,
        
    } 
,{ timestamps: true});
     
 ProductSchema.index({ name: 'text' });

module.exports = Product = mongoose.model('Product', ProductSchema);
