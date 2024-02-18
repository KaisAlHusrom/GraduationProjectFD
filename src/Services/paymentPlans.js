import { fetchPaymentPlanFeatures } from "./paymentPlanFeautres"


export const fetchPaymentPlans = async () => {
    const relations = {
        oneToMany: [
            
        ],
        manyToMany: [
            {
                "field_name": "payment_plan_features",
                "fetched_column": "payment_plan_feature",
                "related_table_id": "payment_plan_feature_id",
                fetch_all_data: fetchPaymentPlanFeatures,
            },
        ],
        manyToOne: [
        ]
    }

    const columns = {
        "payment_plan_id": "pk",
        "payment_plan_title": "string",
        "payment_plan_price": "decimal",
        "payment_plan_description": "text",
        "is_active": "bool",
        "payment_plan_features": "many-to-many"
    }

    const rows = [
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
        },
        {
            "payment_plan_id": 2,
            "payment_plan_title": "Premium Plan",
            "payment_plan_price": 10,
            "payment_plan_description": "The Premium plan of our project",
            "is_active": true,
            "payment_plan_features": [
                {
                    "payment_plan_feature_id": 3,
                    "payment_plan_feature": "Change The default template as user want",
                    "payment_plan_feature_description": "Change The default template as user want",
                },
            ]
        },
        {
            "payment_plan_id":3,
            "payment_plan_title": "Super Plan",
            "payment_plan_price": 15,
            "payment_plan_description": "The Super plan of our project",
            "is_active": true,
            "payment_plan_features": [
                {
                    "payment_plan_feature_id": 4,
                    "payment_plan_feature": "Full Reachability",
                    "payment_plan_feature_description": "Reach to all features of design pages",
                },
            ]
        },
    ]
    

    return {relations, columns, rows}
}

export const addPaymentPlans = async ({request}) => {
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

const paymentPlans = {
    fetchPaymentPlans,
    addPaymentPlans
}

export default paymentPlans