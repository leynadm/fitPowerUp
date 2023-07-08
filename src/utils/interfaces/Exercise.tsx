interface Exercise {
    exercise: string;
    date: Date | string;
    weight: number;
    reps: number;
    distance: number;
    distance_unit: number | object;
    time: number;
    category: string;
    comment?:string
    weekday?:string
    id:number
    is_pr?:boolean
    dropset:boolean
    // Add other properties here as per your exercise object structure
  }

  export default Exercise

