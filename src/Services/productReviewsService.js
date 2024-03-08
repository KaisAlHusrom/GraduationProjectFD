import productService from "./productsService"
import usersService from "./usersService"

export const fetchProductsReviews = async () => {
    const relations = {
        oneToMany: [

        ],
        manyToMany: [

        ],
        manyToOne: [
            {
                "field_name": "user",
                "fetched_column": "first_name",
                "related_table_id": "id",
                fetch_all_data: usersService.fetchUsers,
                add_to_add_form: true,
            },
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
        product_review_id: "pk",
        user: "many-to-one",
        product: "many-to-one",
        design_quality_rate: "rate",
        ease_of_user_rate: "rate",
        communication_rate: "rate",
        comment: "text",
    }

    const rows = [
        {
            product_review_id: 1,
            user: {
                id: 8,
                first_name: "kais",
                last_name: "al husrom",
                email: "habib",
                image: null,
                birthday: "2024-01-25",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            product: {
                id: 2,
                "product_name": "Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "Template Created By React, Material UI...",
                "product_price": 30,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
            },
            design_quality_rate: 5,
            ease_of_user_rate: 3,
            communication_rate: 4,
            comment: "very good design quality and ease of user feedback",
        },
        {
            product_review_id: 2,
            user: {
                id: 8,
                first_name: "kais",
                last_name: "al husrom",
                email: "habib",
                image: null,
                birthday: "2024-01-25",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            product:  {
                id: 3,
                "product_name": "user 1 Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "Template Created By React, Material UI...",
                "product_price": 18,
                "product_main_image_name": "product_image",
                "template_zip_file_name": "ADT.zip",
                "product_features": null
            },
            design_quality_rate: 2,
            ease_of_user_rate: 5,
            communication_rate: 4,
            comment: "very good ease of user feedback",
        }
    ]

    return {relations, columns, rows}
}

export const addReview = async ({request}) => {
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

const productReviewsService = {
    fetchProductsReviews,
    addReview
}

export default productReviewsService;