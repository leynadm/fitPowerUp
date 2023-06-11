export interface User {
    id?:string
    fullname: [string,string,string];
    name: string;
    sex: string;
    surname: string;
    profileImage:string
    verified:boolean
    privateAccount:boolean
  }

  export default User