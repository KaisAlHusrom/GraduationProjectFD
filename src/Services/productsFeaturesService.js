import productService from "./productsService"

export const fetchProductsFeatures = async () => {
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
        "product_featured_id": "pk",
        "product": "many-to-one",
        "product_featured_name": "string",
        "product_feature_description": "text",
    }

    const rows = [
        {
            "product_featured_id": 1,
            "product": {
                id: 1,
                "product_name": "user 1 Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "In the vast expanse of the digital landscape, where lines of code weave intricate webs of functionality and design, developers embark on a journey of creation and innovation. Within this realm, the React library stands as a formidable tool, empowering developers to build dynamic and interactive user interfaces with efficiency and elegance.",
                "product_price": 25.23,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
                "user": {
                    id: 1,
                    first_name: "admin",
                    last_name: "habib",
                    email: "habib",
                    birthday: "2023-05-06",
                    phoneNumber: "+905372957830",
                    password: "123456",
                    image: "profile.jpg",
                    is_admin: true,
                    created_at: "2024-01-06 15:30:45",
                    updated_at: "2024-01-06 15:30:45",
                },
                "categories": [
                    {
                        id: 1,
                        "category_name": "Web Front End Templates",
                        "category_description": "Contains all web front end ready templates to sell",
                    },
                    {
                        id: 2,
                        "category_name": "Web Full Applications",
                        "category_description": "Contains all Web Full Applications ready templates to sell",
                    },
                ],
            },
            "product_featured_name": "Responsive",
            "product_feature_description": "This product has a responsive feature",
        },
        {
            "product_featured_id": 2,
            "product": {
                id: 1,
                "product_name": "user 1 Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "In the vast expanse of the digital landscape, where lines of code weave intricate webs of functionality and design, developers embark on a journey of creation and innovation. Within this realm, the React library stands as a formidable tool, empowering developers to build dynamic and interactive user interfaces with efficiency and elegance.",
                "product_price": 25.23,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
                "user": {
                    id: 1,
                    first_name: "admin",
                    last_name: "habib",
                    email: "habib",
                    birthday: "2023-05-06",
                    phoneNumber: "+905372957830",
                    password: "123456",
                    image: "profile.jpg",
                    is_admin: true,
                    created_at: "2024-01-06 15:30:45",
                    updated_at: "2024-01-06 15:30:45",
                },
                "categories": [
                    {
                        id: 1,
                        "category_name": "Web Front End Templates",
                        "category_description": "Contains all web front end ready templates to sell",
                    },
                    {
                        id: 2,
                        "category_name": "Web Full Applications",
                        "category_description": "Contains all Web Full Applications ready templates to sell",
                    },
                ],
            },
            "product_featured_name": "User Friendly",
            "product_feature_description": "This product has a User Friendly feature",
        },
    ]
    

    return {relations, columns, rows}
}

export const addProductFeature = async ({request}) => {
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

const productFeaturesService = {
    fetchProductsFeatures,
    addProductFeature
}

export default productFeaturesService