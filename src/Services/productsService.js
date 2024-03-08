// import usersService from "./usersService"

import categoriesService from "./categoriesService"
import { fetchProductsFeatures } from "./productsFeaturesService"
import { fetchProductsMedia } from "./productsMedia"
import { fetchProductsUsedSkill } from "./productsUsedSkills"
import usersService from "./usersService"

const fetchProducts = async () => {

    const columns = {
        "id": "pk",
        "product_name": "string",
        "product_short_description": "string",
        "product_long_description": "text",
        "product_price": "decimal",
        "product_main_image_name": "image",
        "template_zip_file_name": "file",
        "categories": "many-to-many",
        "user": "many-to-one",
        "product_features": "one-to-many",
        "product_used_skills": "one-to-many",
        "product_media": "one-to-many",
    }

    const relations = {
        manyToOne:[
                {
                    "field_name": "user",
                    "fetched_column": "first_name",
                    "related_table_id": "id",
                    fetch_all_data: usersService.fetchUsers,
                    add_to_add_form: true,
                },
            ],
        manyToMany:[
                    {
                        "field_name": "categories",
                        "fetched_column": "category_name",
                        "related_table_id": "id",
                        fetch_all_data: categoriesService.fetchCategories,
                        add_to_add_form: true,
                    }
        ],
        oneToMany: [
            {
                "field_name": "product_features",
                "fetched_column": "product_featured_name",
                "related_table_id": "product_featured_id",
                fetch_all_data: fetchProductsFeatures,
            },
            {
                "field_name": "product_used_skills",
                "fetched_column": "product_used_skill_name",
                "related_table_id": "product_used_skill_id",
                fetch_all_data: fetchProductsUsedSkill,
            },
            {
                "field_name": "product_media",
                "fetched_column": "product_media_name",
                "related_table_id": "product_media_id",
                fetch_all_data: fetchProductsMedia,
            }
        ]
    }

    const rows = [
        {
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
            "product_features": [
                {
                    product_featured_id: 1,
                    product_featured_name: "Responsive",
                    product_feature_description: "This product has a responsive feature",
                },
                {
                    product_featured_id: 2,
                    product_featured_name: "User Friendly",
                    product_feature_description: "This product has a User Friendly feature",
                },
            ],
            "product_used_skills": [
                {
                    "product_used_skill_id": 1,
                    "product_used_skill_name": "React",
                    "product_used_skill_how_used": "This front end section is programmed by this technology",
                },
                {
                    "product_used_skill_id": 2,
                    "product_used_skill_name": "Laravel",
                    "product_used_skill_how_used": "This Back end section is programmed by this technology",
                },
            ],
            "product_media": [
                {
                    "product_media_id": 1,
                    "product_media_name": "12khah233kd.mp4",
                    "is_video": true,
                },
                {
                    "product_media_id": 2,
                    "product_media_name": "12khah2322kd.png",
                    "is_video": false,
                },
            ]
        },
        {
            id: 2,
            "product_name": "Admin Dashboard Template",
            "product_short_description": "Template created by React",
            "product_long_description": "Template Created By React, Material UI...",
            "product_price": 30,
            "product_main_image_name": null,
            "template_zip_file_name": "ADT.zip",
            "user": {
                id: 2,
                first_name: "cdmin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2020-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            "categories": [
                {
                    id: 2,
                    "category_name": "Web Full Applications",
                    "category_description": "Contains all Web Full Applications ready templates to sell",
                },
            ],
            "product_features": null,
            "product_used_skills": [
                {
                    "product_used_skill_id": 1,
                    "product_used_skill_name": "React",
                    "product_used_skill_how_used": "This front end section is programmed by this technology",
                },
            ]
        },
        {
            id: 3,
            "product_name": "user 1 Admin Dashboard Template",
            "product_short_description": "Template created by React",
            "product_long_description": "Template Created By React, Material UI...",
            "product_price": 18,
            "product_main_image_name": "product_image",
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
                    category_name: "Web Front End Templates",
                    category_description: "Contains all web front end ready templates to sell",
                },
            ],
            "product_features": null,
            "product_used_skills": null,
            "product_media": [
                {
                    "product_media_id": 3,
                    "product_media_name": "12khah112322kd.png",
                    "is_video": false,
                },
            ]
        },
    ]

    

    return {relations, columns, rows}
}


const addProduct = async ({ request }) => {
    const data = await request.formData()

    const categories = data.get("categories");
    const parsedCategories = categories ? JSON.parse(categories) : [];

    // const user = data.get("user");
    // const parsedUser = user ? JSON.parse(user) : null;

    const submission = {
        image: data.get("product_main_image_name"),
        zipFile: data.get("template_zip_file_name"),
        categories: parsedCategories,
        user:   data.get("user")
    }
    console.log(submission)
    return submission;
}

const productService = {
    fetchProducts,
    addProduct
}

export default productService;