// import { comma } from "postcss/lib/list";

export async function get_logo() {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
    try {
        const response = await fetch(
            `${URI}/data/query/production?query=*%5B_type+%3D%3D+%22Logo%22%5D%5B0...1%5D%7B%0A++++%22image%22%3A+Logo.asset-%3Eurl%0A%7D&perspective=published`
        );
        const data = await response.json();
        return data.result;
    } catch (err) {
        // console.log(err);
        return err;
    }
}

export async function get_banner() {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
    try {
        const response = await fetch(
            `${URI}/data/query/production?query=*%5B_type+%3D%3D+%22Banner%22%5D%5B0...1%5D%7B%0A++++%22image%22%3A+Image.asset-%3Eurl%0A%7D&perspective=published`
        );
        const data = await response.json();
        return data.result;
    } catch (err) {
        // console.log(err);
        return err;
    }
}

export async function get_categories() {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
    try {
        const response = await fetch(
            `${URI}/data/query/production?query=*%5B_type%3D%3D%22Category%22%5D%7B%0A++name%2C+desc%2C+priority%2C+%0A++%22SubCats%22%3A+*%5B_type%3D%3D%27SubCategory%27+%26%26+references%28%5E._id%29%5D%7B%0A++++name%2C+priority%0A++%7D%7C+order%28priority+desc%29%2C%0A%7D%7Corder%28priority+desc%29&perspective=published`
        );
        const data = await response.json();
        return data.result;
    } catch (err) {
        // console.log(err);
        return err;
    }
}

export async function get_subCategories(name = 'All', count = 8, offset = 0) {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
    try {
        if (name == 'All') {
            const response = await fetch(
                `${URI}/data/query/production?query=*%5B_type%3D%3D%22Category%22%5D%7B%0A++name%2C+desc%2C%0A++%22SubCats%22%3A+*%5B_type%3D%3D%22SubCategory%22+%26%26+references%28%5E._id%29%5D%7B%0A++++name%2C+desc%2C%0A++++%22Products%22%3A+*%5B_type%3D%3D%22Product%22+%26%26+references%28%5E._id%29%5D%5B0...2%5D%7B%0A++++++++_id%2C+name%2C+desc%2C+isTrend%2C+isDiscount%2C+discountedPrice%2C+inStock%2C+price%2C+SubCategory-%3E%7Bname%7D%2C+%22images%22%3A+images%5B%5D.asset-%3Eurl%0A++++%7D%0A++%7D%0A%7D&perspective=published`
            );
            const data = await response.json();
            return data.result;
        } else {
            const response = await fetch(
                `${URI}/data/query/production?query=*%5B_type%3D%3D%22Category%22+%26%26+name+%3D%3D+%22${name}%22%5D%7B%0A++name%2C+desc%2C%0A++%22SubCats%22%3A+*%5B_type%3D%3D%22SubCategory%22+%26%26+references%28%5E._id%29%5D%7B%0A++++name%2C+desc%2C%0A++++%22Products%22%3A+*%5B_type%3D%3D%22Product%22+%26%26+references%28%5E._id%29%5D%5B${offset}...${count}%5D%7B%0A++++++++_id%2C+name%2C+desc%2C+isTrend%2C+isDiscount%2C+discountedPrice%2C+inStock%2C+price%2C+SubCategory-%3E%7Bname%7D%2C+%22images%22%3A+images%5B%5D.asset-%3Eurl%0A++++%7D%0A++%7D%0A%7D&perspective=published`
            );
            const data = await response.json();
            return data.result;
        }
    } catch (err) {
        // console.log(err);
        return err;
    }
}

export async function products_data(count = 8, offset = 0, prompt = 'All') {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
        //prompt is used for getting similar prodcts (all for any otherwise category)
    try {
        const response = await fetch(
            `${URI}/data/query/production?query=*%5B_type+%3D%3D+%22Product%22+%5D%5B${offset}...${offset + count}%5D%7B%0A++++_id%2C+name%2C+desc%2C+isTrend%2C+isDiscount%2C+discountedPrice%2C+inStock%2C+price%2C+%22images%22%3A+images%5B%5D.asset-%3Eurl%2C+SubCategory-%3E%7Bname%7D%0A%7D&perspective=published`
        );
        const data = await response.json();
        return data.result;
    } catch (err) {
        // console.log(err);
        return err;
    }
}

export async function product_data(id) {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
    try {
        const response = await fetch(
            `${URI}/data/query/production?query=*%5B_type+%3D%3D+%22Product%22+%26%26+_id+%3D%3D+%22${id}%22%5D%7B%0A++++_id%2C+name%2C+desc%2C+isTrend%2C+isDiscount%2C+discountedPrice%2C+inStock%2C+price%2C+%22images%22%3A+images%5B%5D.asset-%3Eurl%2C+SubCategory-%3E%7Bname%7D%0A%7D&perspective=published`
        );
        const data = await response.json();
        return data.result;

    } catch (err) {
        // console.log(err);
        return err;
    }
}

export async function faq_data() {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
    try {
        const response = await fetch(
            `${URI}/data/query/production?query=*%5B_type+%3D%3D+%22FAQs%22+%5D%5B0...5%5D&perspective=published`
        );
        const data = await response.json();
        return data.result;

    } catch (err) {
        // console.log(err);
        return err;
    }
}

export async function getProductbyId(id) {
    const URI = process.env.API_URI || 'https://si1g9paj.api.sanity.io/v2022-03-07'
    try {
        const response = await fetch(
            `${URI}/data/query/production?query=*%5B_type+%3D%3D+%22Product%22+%26%26+_id+%3D%3D+%22${id}%22%5D+%7B%0A++_id%2C+name%2C+price%2C+isDiscount%2C+discountedPrice%0A%7D&perspective=published`
        );
        const data = await response.json();
        return data.result;
    } catch (err) {
        return err;
    }
}

// {
//     id: id,
//         title: `product ${id}`,
//             images: ['https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg', 'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg', 'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg', 'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg'],
//                 price: 100 * Number(id),
//                     isDiscount: Number(id) % 2 == 0 ? true : false,
//                         discountPrice: 80 * Number(id),
//                             description: `Import trace for requested module:
//         ./app/lib/temporary_data.js
//         ./app/product/[id]/page.js
//          ⚠ Fast Refresh had to perform a full reload due to a runtime error.
//          ✓ Compiled in 671ms (741 modules)
//          ✓ Compiled in 511ms (741 modules)
//          ✓ Compiled in 469ms (741 modules)`
// }

// const products = [{
//     id: 1,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/2317384/pexels-photo-2317384.jpeg',
//     href: '/product/1',
//     price: 1000,
//     isDiscount: false,
//     discountPrice: 800
// },
// {
//     id: 2,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg',
//     href: '/product/2',
//     price: 1000,
//     isDiscount: false,
//     discountPrice: 800
// },
// {
//     id: 3,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/2317384/pexels-photo-2317384.jpeg',
//     href: '/product/3',
//     price: 1000,
//     isDiscount: true,
//     discountPrice: 800
// },
// {
//     id: 4,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg',
//     href: '/product/4',
//     price: 1000,
//     isDiscount: false,
//     discountPrice: 800
// },
// {
//     id: 5,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg',
//     href: '/product/5',
//     price: 1000,
//     isDiscount: true,
//     discountPrice: 800
// },
// {
//     id: 6,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/2317384/pexels-photo-2317384.jpeg',
//     href: '/product/6',
//     price: 1000,
//     isDiscount: false,
//     discountPrice: 800
// },
// {
//     id: 7,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/670786/pexels-photo-670786.jpeg',
//     href: '/product/7',
//     price: 1000,
//     isDiscount: false,
//     discountPrice: 800
// },
// {
//     id: 8,
//     title: "S.S Nut and Bolt",
//     image: 'https://images.pexels.com/photos/2317384/pexels-photo-2317384.jpeg',
//     href: '/product/8',
//     price: 1000,
//     isDiscount: false,
//     discountPrice: 800
// },

// ];

// if (count == -1)
//     return products;
// else
//     return products.slice(0, count);

// [
//     {
//         name: "SHEETS and RODS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "BEARINGS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "TOOLS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "POWER TOOLS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "ABRASIVES",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "NUTS and BOLTS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "V-BELTS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "PULLEYS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "GIRARI",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "OILS",
//         href: "/category/sheetsnRods"
//     },
//     {
//         name: "INFO",
//         href: "/category/sheetsnRods"
//     }
// ];