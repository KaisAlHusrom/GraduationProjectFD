// import usersService from "./usersService"

const fetchProducts = async () => {

    const table_info = {
        // "name": "products",
        // "type": "main-table",
        // "relationships": [
        //     {
        //         "relationship-type": "many-to-one",
        //         "relationship-with": "users",
        //         "relationship-data": (await usersService.fetchUsers()).rows,
        //     },
        //     {
        //         "relationship-type": "one-to-many",
        //         "relationship-with": "reviews",
        //         "relationship-column": "id",
        //     }
        // ]
    }
    const columns = {
        "id": "int",
        "product_name": "string",
        "product_short_description": "string",
        "product_long_description": "text",
        "product_price": "decimal",
        "product_main_image_name": "image",
        "template_zip_file_name": "file",
        "categories": "many-to-many",
        "user": "many-to-one",
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
            ]
        },
    ]

    

    return {table_info, columns, rows}
}


const addProduct = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        image: data.get("product_main_image_name"),
        zipFile: data.get("template_zip_file_name"),
    }

    return submission;
}

const productService = {
    fetchProducts,
    addProduct
}

export default productService;