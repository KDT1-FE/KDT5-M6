export default {
  title: 'expenses',
  name: 'expenses',
  type: 'document',
  fields: [
    {
      title: 'User',
      name: 'user',
      type: 'reference',
      to: [{type: 'yoloUser'}],
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
    },
    {
      title: 'Amount',
      name: 'amount',
      type: 'number',
    },
    {
      date: 'Date',
      name: 'date',
      type: 'date',
    },
  ],
  preview: {
    select: {
      name: 'user.name',
      category: 'category',
      date: 'date',
    },
    prepare(selection) {
      const {name, category, date} = selection
      return {
        title: `${name} : ${category}`,
        subtitle: `created on ${date}`,
      }
    },
  },
}
