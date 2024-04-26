export type Product = {
    id: string,
    uuid: string,
    partnerCode: string,
    partnerLogo: string,
    appKey: string,
    appSecret: string,
    createdAt: string,
    updateAt: string,
}

export type JSONResponse = {
    status: "success" | "fail";
    data?: any;
    error?: any;
};


export enum ORGS{
    PLATFORM = 'PLATFORM',
    PARTNER = 'PARTNER',
    SHOP = 'SHOP'
}
export enum ROLES {
    OWNER = 'OWNER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
    STAFF = 'STAFF',
}

export enum PERMISSIONS  {
    C = 'C',
    R = 'R',
    U = 'U',
    D = 'D'
}



export type Profiles = {
    user:               String,
    firstName:          String,
    lastName?:           String,
    firstNameTH?:        String,
    lastNameTH?:         String,
    picture?:            String,
    createAt:           Date,
    updateAt:           Date
}

export type Partners = {
    user:               String,
    brandName:          String,
    brandLogo?:         String,
    createAt:           Date,
    updateAt:           Date
}

export type User = {
    uuid: String,
    email: String,
    name: String,
    password: String,
    emailVerified?: Boolean,
    isActive?: Boolean,
    image?: String,
    organize: ORGS,
    role: ROLES,
    permission?: PERMISSIONS,
    profile? : Profiles,
    partnerCode? : String,
    // shop: Shops[],
    createAt:           Date,
    updateAt:           Date,
}
