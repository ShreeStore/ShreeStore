export default {
    name: 'Banner',
    type: 'document',
    title: 'Banner',
    fields: [{
        name: 'Image',
        type: 'image',
        title: 'Image',
        validation: Rule => Rule.required()
    }]
}