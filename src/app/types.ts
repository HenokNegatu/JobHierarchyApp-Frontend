
export enum RequestType {
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    GET = "GET"
}

export type Task = {
    id: string
    title: string
    description: string
    status: 'Todo' | 'In Progress' | 'Completed' | 'Discarded'
    employee: Employee[]
}

export type Employee = {
    id: string
    firstName: string
    lastName: string
    title: string
    email: string
    task: Task[]
    position: {name: string}
}

export type Position = {
    id: string
    name: string
    description: string
    employees: Employee[]
    salary: string
    createdAt: string
    modifiedAt: string
    parent_id: string
    children: Position[]
}