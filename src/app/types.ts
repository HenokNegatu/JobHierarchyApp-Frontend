
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
    phoneNumber: string
    dateOfBirth?: Date
    hireDate: Date
    salary?: number
    status: StatusType
    address?: string
    gender: GenderType
    maritalStatus?: MaritalStatusType;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
    nationalId?: string;
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

export enum StatusType {
    Active = "Active",
    Inactive = "Inactive",
    OnLeave = "On Leave"
}

export enum GenderType {
    Male = "Male",
    Female = "Female"
}

export enum MaritalStatusType {
    Single = "Single",
    Married = "Married",
    Divorced = "Divorced",
    Widowed = "Widowed"
}

export enum Role {
    Admin = "admin",
    NonAdmin = 'non-admin'
  }