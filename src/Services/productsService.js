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
        // "user": "many-to-one",
    }

    const rows = [
        {
            id: 1,
            "product_name": "Admin Dashboard Template",
            "product_short_description": "Template created by React",
            "product_long_description": "In the vast expanse of the digital landscape, where lines of code weave intricate webs of functionality and design, developers embark on a journey of creation and innovation. Within this realm, the React library stands as a formidable tool, empowering developers to build dynamic and interactive user interfaces with efficiency and elegance.",
            "product_price": 25.23,
            "product_main_image_name": "product_image",
            "template_zip_file_name": "ADT.zip",
        },
        {
            id: 2,
            "product_name": "Admin Dashboard Template",
            "product_short_description": "Template created by React",
            "product_long_description": "Template Created By React, Material UI...",
            "product_price": 30,
            "product_main_image_name": "product_image",
            "template_zip_file_name": "ADT.zip",
        },
        {
            id: 3,
            "product_name": "Admin Dashboard Template",
            "product_short_description": "Template created by React",
            "product_long_description": "Template Created By React, Material UI...",
            "product_price": 18,
            "product_main_image_name": "product_image",
            "template_zip_file_name": "ADT.zip",
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