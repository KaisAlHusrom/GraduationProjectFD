import { fetchOrders } from "./ordersService"
import productService from "./productsService"


export const fetchOrderItems = async () => {
    const relations = {
        manyToOne:[
            {
                "field_name": "order",
                "fetched_column": "order_id",
                "related_table_id": "order_id",
                fetch_all_data: fetchOrders,
                add_to_add_form: true,
            },
            {
                "field_name": "product",
                "fetched_column": "product_name",
                "related_table_id": "id",
                fetch_all_data: productService.fetchProducts,
                add_to_add_form: true,
            }
        ],
        manyToMany:[

        ],
        oneToMany:[
            
        ]
    }

    const columns = {
        order_item_id: "pk",
        product: "many-to-one",
        order: "many-to-one",
        quantity: "int",
        sub_total: "decimal",
    }

    const rows = [
        {
            order_item_id: 1,
            product: {
                id: 2,
                "product_name": "Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "Template Created By React, Material UI...",
                "product_price": 30,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
            },
            order: {
                order_id: 1,
                total_amount: 52.2,
                status: "Accepted",
            },
            quantity: 5,
            sub_total: 8,
        },
        {
            order_item_id: 2,
            product: {
                id: 3,
                    "product_name": "user 1 Admin Dashboard Template",
                    "product_short_description": "Template created by React",
                    "product_long_description": "Template Created By React, Material UI...",
                    "product_price": 18,
                    "product_main_image_name": "product_image",
                    "template_zip_file_name": "ADT.zip",
                    "product_features": null
            },
            order: {
                order_id: 1,
                total_amount: 52.2,
                status: "Accepted",
            },
            quantity: 2,
            sub_total: 18,
        },
        {
            order_item_id: 3,
            product: {
                id: 2,
                "product_name": "Admin Dashboard Template",
                "product_short_description": "Template created by React",
                "product_long_description": "Template Created By React, Material UI...",
                "product_price": 30,
                "product_main_image_name": null,
                "template_zip_file_name": "ADT.zip",
            },
            order: {
                order_id: 2,
                total_amount: 200.2,
                status: "Rejected",
            },
            quantity: 7,
            sub_total: 200.2,
        },
    ]

    

    return {relations, columns, rows}
}

export const addOrderItem = async ({ request }) => {
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

const orderItemsService = {
    fetchOrderItems,
    addOrderItem
}

export default orderItemsService