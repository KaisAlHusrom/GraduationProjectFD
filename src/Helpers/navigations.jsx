let navigateFunction;

export const setNavigateFunction = (navigate) => {
    navigateFunction = navigate;
}

export const navigateMainPage = () => {
    if(navigateFunction) {
        navigateFunction("/")
    }
}

export const navigateLoginPage = () => {
    if(navigateFunction) {
        navigateFunction("/auth/login")
    }
}

export const navigateSignUpPage = () => {
    if(navigateFunction) {
        navigateFunction("/auth/sign-up")
    }
}

//Profile navigation
export const navigateProfilePage = () => {
    if(navigateFunction) {
        navigateFunction("/profile")
    }
}

export const navigateProfileWebProjects = () => {
    if(navigateFunction) {
        navigateFunction("/profile/web-projects")
    }
}

export const navigateProfileCreateNewProject = () => {
    if(navigateFunction) {
        navigateFunction("/profile/create-new-project")
    }
}

export const navigateProfileAddNewProject = () => {
    if(navigateFunction) {
        navigateFunction("/profile/handle-product")
    }
}

export const navigateProfileUpdateProduct = (id) => {
    if(navigateFunction) {
        navigateFunction("/profile/handle-product/" + id)
    }
}

export const navigateProfilePaymentPlans = () => {
    if(navigateFunction) {
        navigateFunction("/profile/payment-plan")
    }
}

export const navigateProfileOrdersBilling = () => {
    if(navigateFunction) {
        navigateFunction("/profile/orders")
    }
}

export const navigateProfileBilling= () => {
    if(navigateFunction) {
        navigateFunction("/profile/billing")
    }
}

export const navigateProfileMySells = () => {
    if(navigateFunction) {
        navigateFunction("/profile/my-sales")
    }
}

//portfolio
export const navigatePortfolio = (userId) => {
    if(navigateFunction) {
        navigateFunction("portfolio/" + userId)
    }
}

//Edit Web Projects
export const navigateWebProject = (webProjectId) => {
    if(navigateFunction) {
        navigateFunction("/empty-design/" + webProjectId)
    }
}

export const navigateEditSection = (sectionId) => {
    if(navigateFunction) {
        navigateFunction("/empty-design/EditPage/" + sectionId)
    }
}

export const navigateWebProjectPreview = (webProjectId) => {
    if(navigateFunction) {
        navigateFunction("/preview/" + webProjectId)
    }
}

//CLiser Store
export const navigateStoreMainPage = () => {
    if(navigateFunction) {
        navigateFunction("/cliser-digital-market")
    }
}

export const navigateCheckOut = () => {
    if(navigateFunction) {
        navigateFunction("/cliser-digital-market/CheckOut")
    }
}

export const navigateCliserStoreProductsPage = () => {
    if(navigateFunction) {
        navigateFunction("/cliser-digital-market/products")
    }
}

export const navigateProductView = (productId) => {
    if(navigateFunction) {
        navigateFunction("/cliser-digital-market/productView/" + productId)
    }
}

export const navigateCliserStoreCartPage = () => {
    if(navigateFunction) {
        navigateFunction("/cliser-digital-market/cart")
    }
}


