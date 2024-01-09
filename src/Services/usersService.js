const fetchUsers = async () => {
    
    // IMPORTANT: the error page will appear when you add Error like this
    //throw Error("There is no users") 

    const columns = {
        id: "int",
        image: "image",
        first_name: "string",
        last_name: "string",
        email: "email",
        birthday: "date",
        phoneNumber: "string",
        password: "password",
        is_admin: "bool",
        created_at: "dateTime",
        updated_at: "dateTime",
    }

    const data =  [
            {
                id: 1,
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
                id: 7,
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
                id: 8,
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
                id: 9,
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


    return [columns, data];
}


const fetchUser = async ({ params }) => {
    const {
        id
    } = params
    return [
        {
            id: id,
            name: "admin",
            phoneNumber: "123456",
        }
    ]
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

const usersService = {
    fetchUsers,
    fetchUser,
    addUser
}

export default usersService