interface Exercise {
    exercise: string;
    date: string;
    weight: number;
    reps: number;
    distance: number;
    distance_unit: string;
    time: number;
    group: string;
    comment?:string
    weekday?:string
    id:number
    is_pr?:boolean
    dropset:boolean
  }

  export default Exercise

