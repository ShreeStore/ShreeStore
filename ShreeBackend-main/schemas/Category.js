// schemas/Category.js

export default {
    name: 'Category',
    type: 'document',
    title: 'Category',
    fields: [{
        name: 'name',
        type: 'string',
        title: 'Name',
        validation: Rule => Rule.required()
    }, {
        name: 'desc',
        type: 'string',
        title: 'Description',
        validation: Rule => Rule.required()
    }, {
        name: 'priority',
        type: 'number',
        tile: 'Priority',
        validation: Rule => Rule.required()
    }],
    initialValue: {
        priority: 0
    }
}