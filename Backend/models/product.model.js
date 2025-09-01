import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    whatinbox: {
      type: Array,
    },

    img: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },

    wholesalePrice: {
      type: Number,
    },
    wholesaleMinimumQuantity: {
      type: Number,
    },

    categories: {
      type: Array,
    },

    concern: {
      type: Array,
    },
    brand: {
      type: String,
    },
    skintype: {
      type: Array,
    },
    originalPrice: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        star: { Number },
        name: { type: String },
        comment: { type: String },
        postedBy: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
