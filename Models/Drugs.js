
import mongoose from "mongoose";

const drugSchema = new mongoose.Schema(
  {

    genericName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    therapeuticClass: {
      type: String,
      required: true,
    },

    indications: [String],
    contraindications: [String],
    sideEffects: [String],
    interactions: [String],

    prescriptionRequired: {
      type: Boolean,
      default: true,
    },

    route: {
      type: String, // Oral, IV, IM, Topical
      required: true,
    },

    brandName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    manufacturer: String,

    dosageForm: {
      type: String, // Tablet, Syrup, Injection
      required: true,
    },
    strength: {
      type: String, // 500mg, 250mg/5ml
      required: true,
    },

    nafdacNumber: {
      type: String,
      required: true,
      index: true,
    },


    costPrice: Number,

    sellingPrice: Number,

    minimumStockLevel: {
      type: Number,
      default: 10,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Drug", drugSchema);