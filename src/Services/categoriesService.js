// import usersService from "./usersService"

const fetchCategories = async () => {

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
        "category_name": "string",
        "category_description": "text",
    }

    const rows = [
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
        {
            id: 3,
            "category_name": "Flutter Templates",
            "category_description": "Contains all web front end ready templates to sell",
        },
        {
            id: 4,
            "category_name": "Ready Applications",
            "category_description": "Contains all web front end ready templates to sell",
        },
    ]

    

    return {table_info, columns, rows}
}


const addCategory = async ({ request }) => {
    const data = await request.formData()

    const submission = {
    //     image: data.get("product_main_image_name"),
    //     zipFile: data.get("template_zip_file_name"),
    }

    return submission;
}

const updateCategory = async () => {

}

const getCategoriesByProductId = (category_id) => {
    return [
        
    ]
}

const categoriesService = {
    fetchCategories,
    addCategory,
    updateCategory,
    getCategoriesByProductId
}

export default categoriesService;