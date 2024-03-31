/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/670786/pexels-photo-670786.jpeg'
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/2317384/pexels-photo-2317384.jpeg'
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: ''
            }

        ]
    },

    env:{
        API_URI: process.env.API_URI,
        BASE_URL: process.env.BASE_URL || 'http://localhost:3000',

        PHONE: process.env.PHONE,
        EMAIL: process.env.EMAIL,
        ADDRESS: process.env.ADDRESS,
        
        FACEBOOK_URI: process.env.FACEBOOK_URI,
        TWITTER_URI: process.env.TWITTER_URI,
        INSTAGRAM_URI: process.env.INSTAGRAM_URI,
    }

    // async rewrites() {
    //     return [
    //         {
    //             destination: 'https://si1g9paj.api.sanity.io/v2022-03-07/data/query/production',
    //         },
    //     ]
    // },

}

module.exports = nextConfig