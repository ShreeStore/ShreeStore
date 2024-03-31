export default {
    name: 'Logo',
    type: 'document',
    title: 'Logo',
    fields: [{
        name: 'Logo',
        type: 'image',
        title: 'Logo',
        validation: Rule => Rule.required()
    }]
}