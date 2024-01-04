const fetchUsers = async () => {
    
    // IMPORTANT: the error page will appear when you add Error like this
    //throw Error("There is no users") 

    return [
        {
            id: 1,
            name: "admin",
            phoneNumber: "123456",
        },
        {
            id: 2,
            name: "admin",
            phoneNumber: "123456",
        }
    ]
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
    if(submission.password.length < 6) {
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