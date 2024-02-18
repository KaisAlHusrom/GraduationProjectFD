import { fetchPaymentPlans } from "./paymentPlans"


export const fetchPaymentPlanFeatures = async () => {
    const relations = {
        oneToMany: [

        ],
        manyToMany: [

        ],
        manyToOne: [
        ]
    }

    const columns = {
        "payment_plan_feature_id": "pk",
        "payment_plan_feature": "string",
        "payment_plan_feature_description": "text",
    }

    const rows = [
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
        {
            "payment_plan_feature_id": 3,
            "payment_plan_feature": "Change The default template as user want",
            "payment_plan_feature_description": "Change The default template as user want",
        },
        {
            "payment_plan_feature_id": 4,
            "payment_plan_feature": "Full Reachability",
            "payment_plan_feature_description": "Reach to all features of design pages",
        },
    ]
    

    return {relations, columns, rows}
}

export const addPaymentPlanFeatures = async ({request}) => {
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

const paymentPlanFeatures = {
    fetchPaymentPlanFeatures,
    addPaymentPlanFeatures
}

export default paymentPlanFeatures