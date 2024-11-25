
export enum RequestType {
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    GET = "GET"
}
export enum TaskStatusType {
    Todo = 'Todo',
    InProgress = 'In Progress', 
    Completed = 'Completed', 
    Cancelled = 'Cancelled'
  }

export type Task = {
    id: string
    title: string
    description: string
    dueDate: Date
    isPriority: boolean
    status: TaskStatusType
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