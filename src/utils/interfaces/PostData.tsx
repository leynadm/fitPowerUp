export type PostData = {
    userId: string; 
    createdAt: Date; 
    postText:string,
    name?:string
    surname?:string,
    timestamp:any
    commentsCount:number
    postId:string
    workoutData?:any
    profileImage:string
    postImage:string
  };