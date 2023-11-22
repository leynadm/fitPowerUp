function checkUserFeats() {
  
  const feats = [
    {
      feat: "Complete First Workout",
      name: "",
      state: false,
      date:"",
      level: 1,
      type: "Workouts Consistency",
      featValue:1
    },
    {
      feat: "Complete 5 Workouts",
      name: "",
      state: false,
      date:"",
      level: 1,
      type: "Workouts Consistency",
      featValue:5
    },
    {
      feat: "Complete 10 Workouts",
      name: "",
      state: false,
      date:"",
      level: 1,
      type: "Workouts Consistency",
      featValue:10
    },
    {
      feat: "Complete 25 Workouts",
      name: "",
      state: false,
      date:"",
      level: 1,
      type: "Workouts Consistency",
      featValue:25
    },
    {
      feat: "Complete 50 Workouts",
      name: "",
      state: false,
      date:"",
      level: 2,
      type: "Workouts Consistency",
      featValue:50
    },
    {
      feat: "Complete 75 Workout",
      name: "",
      state: false,
      date:"",
      level: 2,
      type: "Workouts Consistency",
      featValue:75
    },
    {
      feat: "Complete 100 Workouts",
      name: "",
      state: false,
      date:"",
      level: 3,
      type: "Workouts Consistency",
      featValue:100
    },
    {
      feat: "Complete 250 Workouts",
      name: "",
      state: false,
      date:"",
      level: 4,
      type: "Workouts Consistency",
      featValue:250
    },
    {
      feat: "Complete 500 Workouts",
      name: "",
      state: false,
      date:"",
      level: 5,
      type: "Workouts Consistency",
      featValue:500
    },
    {
      feat: "Complete 750 Workouts",
      name: "",
      state: false,
      date:"",
      level: 6,
      type: "Workouts Consistency",
      featValue:750
    },
    {
      feat: "Complete 1000 Workouts",
      name: "",
      state: false,
      date:"",
      level: 7,
      type: "Workouts Consistency",
      featValue:1000
    },
    
    {
      feat: "Complete 3 Workouts In A Week",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Workouts Streak",
      featValue:3
    },
    {
      feat: "Complete 4 Workouts In A Week",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Workouts Streak",
      featValue:4
    },
    {
      feat: "Complete 5 Workouts In A Week",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Workouts Streak",
      featValue:5
    },
    {
      feat: "Complete 6 Workouts In A Week",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Workouts Streak",
      featValue:6
    },
    {
      feat: "Complete 7 Workouts In A Week",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Workouts Streak",
      featValue:7
    },
    {
      feat: "Perform 100 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Sets",
      featValue:100
    },
    {
      feat: "Perform 500 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Sets",
      featValue:500
    },
    {
      feat: "Perform 1000 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Sets",
      featValue:1000
    },
    {
      feat: "Perform 2500 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Sets",
      featValue:2500
    },
    {
      feat: "Perform 5000 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Sets",
      featValue:5000
    },
    {
      feat: "Perform 7500 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Sets",
      featValue:7500
    },
    {
      feat: "Perform 10000 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Sets",
      featValue:10000
    },
    {
      feat: "Perform 1000 Reps",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Reps",
      featValue:1000
    },
    {
      feat: "Perform 10000 Reps",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Reps",
      featValue:10000
    },
    {
      feat: "Perform 25000 Reps",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Reps",
      featValue:25000
    },

    {
      feat: "Perform 50000 Reps",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Reps",
      featValue:50000
    },
    {
      feat: "Perform 75000 Reps",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Reps",
      featValue:75000
    },
    {
      feat: "Perform 100000 Sets",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Reps",
      featValue:100000
    },

    {
      feat: "Lift 100.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:100000
    },
    {
      feat: "Lift 250.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:250000
    },
    {
      feat: "Lift 500.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:500000
    },
    {
      feat: "Lift 750.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:750000
    },
    {
      feat: "Lift 1.000.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:1000000
    },
    {
      feat: "Lift 1.250.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:1250000
    },
    {
      feat: "Lift 1.500.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:1500000
    },
    {
      feat: "Lift 1.750.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:1750000
    },
    {
      feat: "Lift 2.000.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:2000000
    },
    {
      feat: "Lift 2.250.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:2250000
    },
    {
      feat: "Lift 2.500.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:2500000
    },
    {
      feat: "Lift 2.750.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:2750000
    },
    {
      feat: "Lift 4.000.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:4000000
    },
    {
      feat: "Lift 4.250.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:4250000
    },
    {
      feat: "Lift 4.500.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:4500000
    },
    {
      feat: "Lift 4.750.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:4750000
    },
    {
      feat: "Lift 5.000.000 Volume",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Volume",
      featValue:5000000
    },
    {
      feat: "Deadlift Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Deadlift",
      featValue:1
    },
    {
      feat: "Deadlift 1.5x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Deadlift",
      featValue:1
    },
    {
      feat: "Deadlift 2x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Deadlift",
      featValue:1
    },
    {
      feat: "Bench Press 0.5x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Bench Press",
      featValue:1
    },
    {
      feat: "Bench Press Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Bench Press",
      featValue:1
    },
    {
      feat: "Bench Press 1.5x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Bench Press",
      featValue:1
    },
    {
      feat: "Squat 0.5x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Squat",
      featValue:1
    },
    {
      feat: "Squat 1x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Squat",
      featValue:1
    },
    {
      feat: "Squat 1.5x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Squat",
      featValue:1
    },
    {
      feat: "Squat 1.75x Your Bodyweight",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Squat",
      featValue:1
    },
    {
      feat: "Perform 1 Pull Up",
      name: "Maria's Challenge",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Pull Up",
      featValue:1
    },
    {
      feat: "Perform 10 Pull Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Pull Up",
      featValue:1
    },
    {
      feat: "Perform 15 Pull Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Pull Up",
      featValue:1
    },
    {
      feat: "Perform 20 Pull Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Pull Up",
      featValue:1
    },
    {
      feat: "Perform 30 Pull Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Pull Up",
      featValue:1
    },
    {
      feat: "Perform 1 Push Up",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Push Up",
      featValue:1
    },
    {
      feat: "Perform 10 Push Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Push Up",
      featValue:1
    },
    {
      feat: "Perform 20 Push Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Push Up",
      featValue:1
    },
    {
      feat: "Perform 30 Push Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Push Up",
      featValue:1
    },
    {
      feat: "Perform 40 Push Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Push Up",
      featValue:1
    },
    {
      feat: "Perform 50 Push Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Push Up",
      featValue:1
    },
    {
      feat: "Hold A Plank For 1 Minute",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Plank",
      featValue:1
    },
    {
      feat: "Hold A Plank For 2 Minutes",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Plank",
      featValue:1
    },

    {
      feat: "Hold A Plank For 5 Minutes",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Plank",
      featValue:1
    },
    {
      feat: "Hold A Plank For 10 Minutes",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Plank",
      featValue:1
    },
    {
      feat: "Perform 10 Different Exercises",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises",
      featValue:10
    },

    {
      feat: "Perform 25 Different Exercises",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises",
      featValue:25
    },

    {
      feat: "Perform 50 Different Exercises",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises",
      featValue:50
    },
    {
      feat: "Perform 10 Consecutive Sit-ups or Crunches",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Sit-Ups/Crunches",
      featValue:1
    },
    {
      feat: "Perform 50 Consecutive Sit-ups or Crunches",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Sit-Ups/Crunches",
      featValue:1
    },
    {
      feat: "Perform 100 Consecutive Sit-ups or Crunches",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Sit-Ups/Crunches",
      featValue:1
    },
    {
      feat: "Perform 25 Consecutive Burpees",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Burpees",
      featValue:1
    },
    {
      feat: "Perform 50 Consecutive Burpees",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Burpees",
      featValue:1
    },
    {
      feat: "Perform 75 Consecutive Burpees",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Burpees",
      featValue:1
    },
    {
      feat: "Perform 100 Consecutive Burpees",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Burpees",
      featValue:1
    },

    {
      feat: "Perform 10 Leg Raises",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Burpees",
      featValue:1
    },
    {
      feat: "Perform 25 Leg Raises",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Burpees",
      featValue:1
    },
    {
      feat: "Perform 50 Leg Raises",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Burpees",
      featValue:1
    },
    {
      feat: "Perform 1 Pull Up",
      name: "Maria's Challenge",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Pull Up",
      featValue:1
    },
    {
      feat: "Perform 1 Chin Ups",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Chin Up",
      featValue:1
    },
    {
      feat: "Perform 6 Chin Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Chin Up",
      featValue:1
    },
    {
      feat: "Perform 14 Chin Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Chin Up",
      featValue:1
    },
    {
      feat: "Perform 24 Chin Ups In A Set",
      name: "",
      state: false,
      date:"",
      level: 0,
      type: "Exercises - Chin Up",
      featValue:1
    },


  ];
}

export default checkUserFeats;
