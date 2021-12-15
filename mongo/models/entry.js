import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema
mongoose.Promise = global.Promise

const EntrySchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    diaryid: { type: ObjectId, ref: 'Diary' },
    author: {
      type: ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
)

let Dataset = mongoose.models.Entries || mongoose.model('Entries', EntrySchema)
export default Dataset
