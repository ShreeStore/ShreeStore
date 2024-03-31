// schemas/User.js

export default {
    name: 'User',
    type: 'document',
    title: 'User',
    fields: [{
            name: 'name',
            type: 'string',
            title: 'Name',
            validation: Rule => Rule.required()
        }, {
            name: 'email',
            type: 'email',
            title: 'E-mail'
        },
        {
            name: 'address',
            type: 'string',
            title: 'Address'
        }, {
            name: 'phoneNo',
            type: 'string',
            title: 'PhoneNo',
            validation: Rule => Rule.required()
        }, {
            name: 'role',
            type: 'string',
            title: 'Role',
            validation: Rule => Rule.required()
        }
    ],
    initialValue: {
        role: 'user'
    }
}