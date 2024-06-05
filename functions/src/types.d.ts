type TRole = 'ADMINISTRATOR' | 'DATA_MANAGER' | 'USER'
type TCertificates = "Green card"| "Blue card" |"Master" | "Other"

type TStaff = {
    name: string,
    lastName: string,
    email: string,
    degree?:string
    photoUrl?:string
    roles:TRole[]
    cerificates?:TCertificates[]
}

interface ICreateUserResponse {
    success: boolean;
    uid?: string;
    error?: string;
}