export default {
  title: 'yoloUser',
  name: 'yoloUser',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
}
