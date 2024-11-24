export type Position = {
    id: string
    name: string
    description: string
    parent_id: string
    children?: Position[]
}