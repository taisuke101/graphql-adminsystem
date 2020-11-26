
export interface LoginUser {
    uuid: string;
    userId: string;
    password: string;
    confirmPassword: string;
    token: string;
}

export interface User {
    uuid: string;
    userId: string;
    password: string;
    createDatetime: string;
    updateDatetime: string;
}
