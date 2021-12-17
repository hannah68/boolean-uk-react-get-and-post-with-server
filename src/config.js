export class LocalRoutes{
    static home = "/"
}

export class APIEndpoints{
    static baseURL = "http://localhost:3030"
    static tours = `${APIEndpoints.baseURL}/tours`
    static tickets = `${APIEndpoints.baseURL}/tickets`
    static address = `${APIEndpoints.baseURL}/addresses`
}