import productService from "./productsService"

export const fetchProductsUsedSkill = async () => {
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
            },
        ]
    }

    const columns = {
        "product_used_skill_id": "pk",
        "product": "many-to-one",
        "product_used_skill_name": "string",
        "product_used_skill_how_used": "text",
    }

    const rows = [
        {
            "product_used_skill_id": 1,
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
            "product_used_skill_name": "React",
            "product_used_skill_how_used": "This front end section is programmed by this technology",
        },
        {
            "product_used_skill_id": 2,
            "product": {
                id: 2,
                "product_name": "Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "Template Created By React, Material UI...",
                "product_price": 30,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
            },
            "product_used_skill_name": "Laravel",
            "product_used_skill_how_used": "This Back end section is programmed by this technology",
        },
    ]
    

    return {relations, columns, rows}
}

export const addProductUsedSkill = async ({request}) => {
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

const productsUsedSkills = {
    fetchProductsUsedSkill,
    addProductUsedSkill
}

export default productsUsedSkills