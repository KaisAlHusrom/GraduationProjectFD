    import { fetchPaymentPlans } from "./paymentPlans"
import usersService from "./usersService"


export const fetchUserPaymentPlan = async () => {
    const relations = {
        manyToOne:[
            {
                "field_name": "payment_plan",
                "fetched_column": "payment_plan_title",
                "related_table_id": "payment_plan_id",
                fetch_all_data: fetchPaymentPlans,
                add_to_add_form: true,
            },
            {
                "field_name": "user",
                "fetched_column": "first_name",
                "related_table_id": "id",
                fetch_all_data: usersService.fetchUsers,
                add_to_add_form: true,
            }
        ],
        manyToMany:[

        ],
        oneToMany:[
            
        ]
    }

    const columns = {
        user_payment_plan_id: "pk",
        payment_plan: "many-to-one",
        user: "many-to-one",
        is_active: "bool",
        expiry_date: "date",
    }

    const rows = [
        {
            user_payment_plan_id: 1,
            payment_plan: {
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
            },
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
            is_active: true,
            expiry_date: "2025-01-06",
        }
    ]

    

    return {relations, columns, rows}
}

export const addUserPaymentPlan = async ({ request }) => {
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

const userPaymentPlan = {
    fetchUserPaymentPlan,
    addUserPaymentPlan
}

export default userPaymentPlan