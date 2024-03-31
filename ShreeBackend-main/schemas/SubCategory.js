// schemas/SubCategory.js

export default {
    name: 'SubCategory',
    type: 'document',
    title: 'SubCategory',
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
        name: 'Category',
        type: 'reference',
        to: [{ type: 'Category' }],
        title: 'Category',
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