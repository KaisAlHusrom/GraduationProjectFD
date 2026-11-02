export const getSuccessResponse = (data = [], message = "200 Success Response") => {
    return {
        data: data,
        success: true,
        message: message
    };
};

export const getBadRequestResponse = (error = "Bad Request", message = "400 Bad Request") => {
    return {
        error: error,
        success: false,
        message: message
    };
};

export const getUnauthorizedResponse = (error = "Unauthorized", message = "401 Unauthorized") => {
    return {
        error: error,
        success: false,
        message: message
    };
};

export const getForbiddenResponse = (error = "Forbidden", message = "403 Forbidden") => {
    return {
        error: error,
        success: false,
        message: message
    };
};

export const getNotFoundResponse = (error = "Not Found", message = "404 Not Found") => {
    return {
        error: error,
        success: false,
        message: message
    };
};

export const getMethodNotAllowedResponse = (error = "Method Not Allowed", message = "405 Method Not Allowed") => {
    return {
        error: error,
        success: false,
        message: message
    };
};

export const getInternalServerErrorResponse = (error = "Internal Server Error", message = "500 Internal Server Error") => {
    return {
        error: error,
        success: false,
        message: message
    };
};
