import { fetchOrders } from "./ordersService"
import { fetchPaymentPlans } from "./paymentPlans"
import productService from "./productsService"
import { fetchUserPaymentPlan } from "./userPaymentPlan"

const fetchUsers = async () => {
    
    // IMPORTANT: the error page will appear when you add Error like this
    //throw Error("There is no users") 

    const relations = {
        manyToOne:[
                
            ],
        manyToMany:[
            {
                "field_name": "payment_plan",
                "fetched_column": "payment_plan_title",
                "related_table_id": "payment_plan_id",
                fetch_all_data: fetchPaymentPlans,
                "many-to-many-table": {
                    fetch_many_to_many_table_data: fetchUserPaymentPlan,
                },
            }
        ],
        oneToMany:[
                ]
    }
    
    const columns = {
        id: "pk",
        image: "image",
        first_name: "string",
        last_name: "string",
        email: "email",
        birthday: "date",
        phoneNumber: "mobileNumber",
        password: "password",
        is_admin: "bool",
        created_at: "dateTime",
        updated_at: "dateTime",
        payment_plan: "many-to-many",
        // products: "one-to-many",
    }

    const rows =  [
            {
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
            {
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
                payment_plan: [
                    {
                        "payment_plan_id": 1,
                        "payment_plan_title": "Default Plan",
                        "payment_plan_price": 5,
                        "payment_plan_description": "The default plan of our project",
                        "is_active": true,
                        "payment_plan_features": [
                            {
                                "payment_plan_feature_id": 1,
                                "payment_plan_feature": "Default Template",
                                "payment_plan_feature_description": "Can use only the default template",
                            },
                            {
                                "payment_plan_feature_id": 2,
                                "payment_plan_feature": "Responsive Template",
                                "payment_plan_feature_description": "The default template came with responsive feature",
                            },
                        ]
                    }
                ],
            },
            {
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
            {
                id: 4,
                first_name: "hdmin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2030-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 5,
                first_name: "gdmin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-21",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 6,
                first_name: "kdmin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 7,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-20",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
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
            {
                id: 9,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-18",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 10,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 11,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 12,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                image: "profile.jpg",
                is_admin: true,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 13,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 14,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 15,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 16,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 17,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 18,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 19,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 20,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 21,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 22,
                first_name: "admin",
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2024-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
    ]

    //add products to each user
    // Assuming fetchUserProducts returns an array of products for a given user ID
    // for (const user of rows) {
    //     user.products = fetchUserProducts(user.id);
    // }


    return {relations, columns, rows};
}

const fetchUser = async ({params}) => {
    const {user_id} = params

    const relations = {
        manyToOne:[
                
            ],
        manyToMany:[
            {
                "field_name": "payment_plan",
                "fetched_column": "payment_plan_title",
                "related_table_id": "payment_plan_id",
                fetch_all_data: fetchPaymentPlans,
                "many-to-many-table": {
                    fetch_many_to_many_table_data: fetchUserPaymentPlan,
                },
            }
        ],
        oneToMany:[
            {
                "field_name": "order",
                "fetched_column": "order_id",
                "related_table_id": "order_id",
                fetch_all_data: fetchOrders,
            }
        ]
    }

    const row =  {
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
        payment_plan: [
            {
                "payment_plan_id": 1,
                "payment_plan_title": "Default Plan",
                "payment_plan_price": 5,
                "payment_plan_description": "The default plan of our project",
                "is_active": true,
                "payment_plan_features": [
                    {
                        "payment_plan_feature_id": 1,
                        "payment_plan_feature": "Default Template",
                        "payment_plan_feature_description": "Can use only the default template",
                    },
                    {
                        "payment_plan_feature_id": 2,
                        "payment_plan_feature": "Responsive Template",
                        "payment_plan_feature_description": "The default template came with responsive feature",
                    },
                ]
            }
        ],
        orders: [
            {
                order_id: 1,
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
            }
        ]
    }

    const columns = {
        id: "pk",
        image: "image",
        first_name: "string",
        last_name: "string",
        email: "email",
        birthday: "date",
        phoneNumber: "mobileNumber",
        password: "password",
        is_admin: "bool",
        created_at: "dateTime",
        updated_at: "dateTime",
        payment_plan: "many-to-many",
        orders: "one-to-many",
    }
    return {columns, row, relations}
}

const getUserById = async (id) => {

    const {rows} = await fetchUsers()
    
    if(rows) {
        const user = rows.filter(row => row.id === id)[0]
        return user
    }


    Error("there is no user with id: " + id)
}


const addUser = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        email: data.get("email"),
        full_name: data.get("full_name"),
        password: data.get("password"),
    }
    
    console.log(submission)

    //Send Post Request To The Server,

    //VALIDATION THE RESULT
    //Example:
    if(submission.full_name.length < 6) {
        return {error: 'Message must be at least 6 characters'}
    }

    return {error: null}
}

const updateUser = async (userId, userData, token) => {
    const {rows} = fetchUsers();
    rows.forEach(row => {
        if(row.id === userId) {
            Object.keys(userData).forEach(fieldName => {
                row[fieldName] = userData[fieldName]
            })
        }
    });
}

const usersService = {
    fetchUsers,
    fetchUser,
    addUser,
    updateUser,
    getUserById
}

export default usersService