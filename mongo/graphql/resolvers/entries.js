import Entries from '../../models/entry'
import Diary from '../../models/diary'
module.exports = {
  Query: {
    // Diaries
    getEntries: async () => {
      try {
        const entries = await Entries.find({})
          .sort({ createdAt: -1 })
          .populate('diaryid')
          .populate('author', '-password')
          .exec()

        return entries
      } catch (err) {
        console.log(err)
      }
    },
    getEntry: async (_, { id }) => {
      const entry = await Entries.findById(id)
        .populate('diaryid')
        .populate('author', '-password')
        .exec()

      if (!entry) {
        throw new Error('Entry not found')
      }

      return entry
    },
  },

  Mutation: {
    // Diaries
    newEntry: async (_, { tittle, description, diaryid, author }) => {
      //   console.log(tittle, description, diaryid)
      try {
        const entry = new Entries({ tittle, description, diaryid, author })
        const diary = await Diary.findById(diaryid)
        await diary.entries.push(entry._id)
        await diary.save()
        const result = await entry.save()
        return result
      } catch (err) {
        console.log(err)
      }
    },
    updateEntry: async (_, { tittle, description, id }) => {
      const entry = await Entries.findById(id)
      if (!entry) {
        throw new Error('Entry not found')
      }
      const updatedentry = await Entries.findOneAndUpdate(
        { _id: id },
        { tittle: tittle, description: description },
        {
          new: true,
        }
      )
        .populate('diaryid')
        .populate('author', '-password')
      return updatedentry
    },
    deleteEntry: async (_, { id }) => {
      const entry = await Entries.findById(id)
      if (!entry) {
        throw new Error('Entry Does Not Exist')
      }

      await Entries.findOneAndDelete({ _id: id })
      return 'Entry Deleted'
    },
  },
}
