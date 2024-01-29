import productService from "./productsService"

const fetchUsers = async () => {
    
    // IMPORTANT: the error page will appear when you add Error like this
    //throw Error("There is no users") 

    const table_info = {
        "name": "users",
        "type": "main-table",
        "relationships": [
            {
                "relationship-type": "one-to-many",
                "relationship-with": "products",
                "relationship-column": "id",
            }
        ]
    }
    
    const columns = {
        id: "int",
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
                last_name: "habib",
                email: "habib",
                image: null,
                birthday: "2020-01-06",
                phoneNumber: "+905372957830",
                password: "123456",
                is_admin: false,
                created_at: "2024-01-06 15:30:45",
                updated_at: "2024-01-06 15:30:45",
            },
            {
                id: 3,
                first_name: "bdmin",
                last_name: "habib",
                email: "habib",
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


    return {columns, rows};
}

// const fetchUserProducts = async (user_id) => {
//     const products = productService.rows.filter(row => row.user.id === user_id)
//     return products;
// }

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

    addUser,
    updateUser,
    getUserById
}

export default usersService