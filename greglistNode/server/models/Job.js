import { Schema } from "mongoose"

export const JobSchema = new Schema({
  company: { type: String, required: true, minlength: 1, maxlength: 50 },
  jobTitle: { type: String, required: true, minlength: 1, maxlength: 30 },
  hours: { type: Number, required: true, min: 10, max: 400 },
  rate: { type: Number, required: true, min: 1, max: 10000000 },
  description: { type: String, maxlength: 1000 },
  benefits: { type: String, enum: ['medical', 'dental', 'vision', 'vacation', 'sick', 'gym membership', 'rice krispies'] },
  creatorId: { type: Schema.Types.ObjectId, required: true }

}, { timestamps: true, toJSON: { virtuals: true } })

