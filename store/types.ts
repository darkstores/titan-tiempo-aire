export interface UserData {
    cedis_id: number;
    city: string;
    email: string;
    id: number;
    lastname: string;
    location_color: string;
    location_id: number;
    name: string;
    phone: string;
    state: string;
    street_1: string;
    token: string;
    type: string;
    user_id: number;
    user_role_id: number;
    zip: string;
}

export interface LoginResponse {
    status: boolean;
    message: string;
    data: UserData;
}

export interface LoginRequest {
    phone?: string;
    email?: string;
    pass?: string;
}
  