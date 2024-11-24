export type Position = {
    id: string
    name: string
    description: string
    parent_id: string
    children?: Position[]
}

export enum RequestType {
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    GET = "GET"
}