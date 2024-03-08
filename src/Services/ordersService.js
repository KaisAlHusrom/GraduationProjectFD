import { fetchOrderItems } from "./orderItemsService"
import productService from "./productsService"
import usersService from "./usersService"

export const fetchOrders = async () => {
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
                "field_name": "order_items",
                "fetched_column": "product_name",
                "related_table_id": "id",
                fetch_all_data: productService.fetchProducts,
                "many-to-many-table": {
                    "columns": [
                        "quantity",
                        "sub_total"
                    ],
                    fetch_many_to_many_table_data: fetchOrderItems,
                },
                add_to_add_form: true,
            },
        ],
        oneToMany:[
            // {
            //     "field_name": "quantity",
            //     "fetched_column": "quantity",
            //     "related_table_id": "order_item_id",
            //     fetch_all_data: fetchOrderItems,
            //     "not_updatable": true,
                
            // }
        ]
    }

    const columns = {
        order_id: "pk",
        user: "many-to-one",
        total_amount: "decimal",
        status: "string",
        order_items: "many-to-many",
    }

    const rows = [
        {
            order_id: 1,
            user: {
                
                    id: 2,
                    first_name: "cdmin",
                    last_name: "al hasan",
                    email: "alhasan@gmail.com",
                    image: null,
                    birthday: "2020-01-06",
                    phoneNumber: "+905372957830",
                    password: "123456",
                    is_admin: false,
                    created_at: "2024-01-06 15:30:45",
                    updated_at: "2024-01-06 15:30:45",
            },
            total_amount: 52.2,
            status: "Accepted",
            order_items: [
                {
                    id: 2,
                    "product_name": "Admin Dashboard Template",
                    "product_short_description": "Template created by React",
                    "product_long_description": "Template Created By React, Material UI...",
                    "product_price": 30,
                    "product_main_image_name": null,
                    "template_zip_file_name": "ADT.zip",
                },
                {
                    id: 3,
                    "product_name": "user 1 Admin Dashboard Template",
                    "product_short_description": "Template created by React",
                    "product_long_description": "Template Created By React, Material UI...",
                    "product_price": 18,
                    "product_main_image_name": "product_image",
                    "template_zip_file_name": "ADT.zip",
                    "product_features": null
                }
            ]
        },
        {
            order_id: 2,
            user: {
                id: 3,
                first_name: "bdmin",
                last_name: "almohammady",
                email: "almohammady@gmail.com",
                image: null,
                birthday: "2024-06-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            total_amount: 200.2,
            status: "Rejected",
            order_items: [
                {
                    id: 2,
                    "product_name": "Admin Dashboard Template",
                    "product_short_description": "Template created by React",
                    "product_long_description": "Template Created By React, Material UI...",
                    "product_price": 30,
                    "product_main_image_name": null,
                    "template_zip_file_name": "ADT.zip",
                },
            ]
        }
    ]

    

    return {relations, columns, rows}
}

export const addOrder = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        // email: data.get("email"),
        // full_name: data.get("full_name"),
        // password: data.get("password"),
    }
    
    console.log(submission)

    //Send Post Request To The Server,



    return {error: null}
}

const orderService = {
    fetchOrders,
    addOrder
}

export default orderService