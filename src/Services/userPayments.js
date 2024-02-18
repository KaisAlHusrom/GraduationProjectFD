import { fetchPaymentPlans } from "./paymentPlans"
import usersService from "./usersService"


export const fetchUserPayments = async () => {
    const relations = {
        manyToOne:[
            {
                "field_name": "user_payment_plan",
                "fetched_column": "payment_plan_title",
                "related_table_id": "payment_plan_id",
                fetch_all_data: fetchPaymentPlans,
            },
            {
                "field_name": "user",
                "fetched_column": "first_name",
                "related_table_id": "id",
                fetch_all_data: usersService.fetchUsers,
            }
        ],
        manyToMany:[

        ],
        oneToMany:[
            
        ]
    }

    const columns = {
        user_payment_id: "pk",
        user: "many-to-one",
        user_payment_plan: "many-to-one",
        order: "many-to-one",
        cost: "decimal",
        payment_method: "string",
        status: "string",
    }

    const rows = [
    ]

    

    return {relations, columns, rows}
}

export const addUserPayment = async ({ request }) => {
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

const userPayments = {
    fetchUserPayments,
    addUserPayment
}

export default userPayments