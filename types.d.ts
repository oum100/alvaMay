declare module "@auth/core/types" {
    interface Session {
      user?: User
    }

    interface User {
        email: string,
        name: string,
        password:string,
        organization:string,
        role: string,
        permission:string,
        partnerCode:string,
        // shop:[{
        //     shopCode:string,
        //     shopName:string
        // }]
    }

  }
  
export {}