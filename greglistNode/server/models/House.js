import { Schema } from "mongoose";

export const HouseSchema = new Schema({
  bedrooms: { type: Number, required: true, max: 50, min: 1 },
  bathrooms: { type: Number, required: true, max: 50, min: 1 },
  levels: { type: Number, required: true, max: 50, min: 1 },
  imgUrl: { type: String, required: true, default: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdXNlJTIwb24lMjBsYWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60', maxlength: 1000 },
  year: { type: Number, required: true, min: 1700, max: 2023 },
  price: { type: Number, required: true, max: 10000000 },
  description: { type: String, maxlength: 500 },
  creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

