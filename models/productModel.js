import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true, trim: true },
    productCategory: { type: String, required: true, trim: true },
    otherCategory: { type: String, trim: true },
    productName: { type: String, required: true, trim: true },
    productType: { type: String, required: true, trim: true },
    productBrand: { type: String, required: true, trim: true },
    availableStockQty: { type: Number, required: true },
    mrp: { type: Number, required: true },
    offerPrice: { type: Number, required: true, trim: true },
    packetweight: { type: Number, required: true, trim: true },
    unitOfMeasure: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdBy: { type: String, required: true, trim: true },
    imageURL: { type: Array, required: true },
    manufactureDate: { type: String, required: true, trim: true },
    expiryDate: { type: String, required: true, trim: true },
    sellerInformation: { type: String },
    dealOfDay: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
