export interface User {
    id?: number,
    username: string,
    password: string,
}

export function getEmptyUser(): User {
    return {
      username: '',
      password: '',
    }
}