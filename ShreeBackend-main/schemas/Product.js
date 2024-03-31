export default {
    name: 'Product',
    type: 'document',
    title: 'Product',
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
        name: 'price',
        type: 'number',
        title: 'Price',
        validation: Rule => Rule.required()
    }, {
        name: 'isDiscount',
        type: 'boolean',
        title: 'Is Discount',
        validation: Rule => Rule.required()
    }, {
        name: 'images',
        type: 'array',
        of: [{ type: 'image' }],
        title: 'Images',
        validation: Rule => Rule.required()
    }, {
        name: 'discountedPrice',
        type: 'number',
        title: 'Discounted Price',
        validation: Rule => Rule.required()
    }, {
        name: 'isTrend',
        type: 'boolean',
        title: 'Is Trending',
        validation: Rule => Rule.required()
    }, {
        name: 'SubCategory',
        type: 'reference',
        to: [{ type: 'SubCategory' }],
        title: 'SubCategory',
        validation: Rule => Rule.required()
    }, {
        name: 'inStock',
        type: 'boolean',
        title: 'In Stock',
        validation: Rule => Rule.required()
    }, {
        name: 'miscellaneous',
        type: 'string',
        title: 'Miscellaneous'
    }],
    initialValue: {
        isDiscount: false,
        discountedPrice: 0,
        isTrend: false,
        inStock: true
    }
}