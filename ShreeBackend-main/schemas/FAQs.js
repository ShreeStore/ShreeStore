// schemas/FAQs.js

export default {
    name: 'FAQs',
    type: 'document',
    title: 'FAQs',
    fields: [{
        name: 'question',
        type: 'string',
        title: 'Question',
        validation: Rule => Rule.required()
    }, {
        name: 'answer',
        type: 'string',
        title: 'Answer',
        validation: Rule => Rule.required()
    }, ]
}