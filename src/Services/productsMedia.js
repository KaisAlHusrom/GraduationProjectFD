import productService from "./productsService"

export const fetchProductsMedia = async () => {
    const relations = {
        oneToMany: [

        ],
        manyToMany: [

        ],
        manyToOne: [
            {
                "field_name": "product",
                "fetched_column": "product_name",
                "related_table_id": "id",
                fetch_all_data: productService.fetchProducts,
                add_to_add_form: true,
            },
        ]
    }

    const columns = {
        "product_media_id": "pk",
        "product": "many-to-one",
        "product_media_name": "file",
        "is_video": "bool",
    }

    const rows = [
        {
            "product_media_id": 1,
            "product": {
                id: 1,
                "product_name": "user 1 Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "In the vast expanse of the digital landscape, where lines of code weave intricate webs of functionality and design, developers embark on a journey of creation and innovation. Within this realm, the React library stands as a formidable tool, empowering developers to build dynamic and interactive user interfaces with efficiency and elegance.",
                "product_price": 25.23,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
            },
            "product_media_name": "12khah233kd.mp4",
            "is_video": true,
        },
        {
            "product_media_id": 2,
            "product": {
                id: 1,
                "product_name": "user 1 Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "In the vast expanse of the digital landscape, where lines of code weave intricate webs of functionality and design, developers embark on a journey of creation and innovation. Within this realm, the React library stands as a formidable tool, empowering developers to build dynamic and interactive user interfaces with efficiency and elegance.",
                "product_price": 25.23,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
            },
            "product_media_name": "12khah2322kd.png",
            "is_video": false,
        },
        {
            "product_media_id": 3,
            "product": {
                    id: 3,
                    "product_name": "user 1 Admin Dashboard Template",
                    "product_short_description": "Template created by React",
                    "product_long_description": "Template Created By React, Material UI...",
                    "product_price": 18,
                    "product_main_image_name": "product_image",
            },
            "product_media_name": "12khah112322kd.png",
            "is_video": false,
        },
    ]
    

    return {relations, columns, rows}
}

export const addProductsMedia = async ({request}) => {
    const data = await request.formData()

    // const categories = data.get("categories");
    // const parsedCategories = categories ? JSON.parse(categories) : [];

    // // const user = data.get("user");
    // // const parsedUser = user ? JSON.parse(user) : null;

    const submission = {
    }
    // console.log(submission)
    return submission;
}

const productsMedia = {
    fetchProductsMedia,
    addProductsMedia
}

export default productsMedia