const preselectedExercises = [
  {
    category: "Legs",
    name: "Barbell Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsquat.jpg?alt=media&token=39905e5a-e88d-4b8d-ac3b-45a918e7fecf&_gl=1*xchox6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyMjI1LjMuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsquat-256x256.png?alt=media&token=be053fb6-8742-4710-9ee2-e6adc7da930e&_gl=1*1att00*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyMjg5LjMuMC4w",
    imageURLName: "squat.jpg",
    iconURLName: "squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Sled Leg Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsled-leg-press.jpg?alt=media&token=c102ba58-88c0-41ec-8ebd-096ce122381e&_gl=1*xgl32t*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyMzc5LjU3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsled-leg-press-256x256.png?alt=media&token=478dcf1d-1ef8-4422-9116-89016067ea25&_gl=1*zv7woo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNDExLjI1LjAuMA..",
    imageURLName: "sled-leg-press.jpg",
    iconURLName: "sled-leg-press-256x256.png",
  },
  {
    category: "Legs",
    name: "Front Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffront-squat.jpg?alt=media&token=e67262e3-d5c2-4199-bb9b-239286dad770&_gl=1*5l1g81*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNDQzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffront-squat-256x256.png?alt=media&token=38f8706f-d0cb-4058-a95d-1c666c4047dc&_gl=1*gjwzaq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5OTAwMTgyOC4xMjguMS4xNjk5MDAxOTkwLjYwLjAuMA..",
    imageURLName: "front-squat.jpg",
    iconURLName: "front-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Hip Thrust",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-thrust.jpg?alt=media&token=30964538-af8f-41c1-ae86-02a8cc9032a5&_gl=1*18gr529*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNTAwLjMuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-thrust-256x256.png?alt=media&token=0065a31c-bbc2-4859-afd3-d0ee2bebda20&_gl=1*mb46rv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNTE3LjQ3LjAuMA..",
    imageURLName: "hip-thrust.jpg",
    iconURLName: "hip-thrust-256x256.png",
  },
  {
    category: "Legs",
    name: "Horizontal Leg Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhorizontal-leg-press.jpg?alt=media&token=9eb17f1b-1326-4362-995e-d759c40e53a2&_gl=1*9ib7in*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNjU3LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhorizontal-leg-press-256x256.png?alt=media&token=5070abad-223f-4504-81a5-ef985b4ca34e&_gl=1*15qppsf*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNjY4LjQ5LjAuMA..",
    imageURLName: "horizontal-leg-press.jpg",
    iconURLName: "horizontal-leg-press-256x256.png",
  },
  {
    category: "Legs",
    name: "Leg Extensions",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fleg-extension.jpg?alt=media&token=44fc2c51-10ae-47bc-be04-37f41ddf719a&_gl=1*gshpi1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNzUyLjU1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fleg-extension-256x256.png?alt=media&token=e9586957-d24d-4954-82fa-654d80ee78e9&_gl=1*7dbsu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUyNzcxLjM2LjAuMA..",
    imageURLName: "leg-extension-256x256.jpg",
    iconURLName: "leg-extension-256x256.png",
  },
  {
    category: "Legs",
    name: "Seated Leg Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-leg-curl.jpg?alt=media&token=51acf07d-a942-49e3-bd05-e935b23648cf&_gl=1*1nqpcpg*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMDMzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-leg-curl-256x256.png?alt=media&token=3290c506-68d3-4570-b824-ae4dee0a044a&_gl=1*1jian4h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMDU2LjM3LjAuMA..",
    imageURLName: "seated-leg-curl.jpg",
    iconURLName: "seated-leg-curl-256x256.png",
  },
  {
    category: "Legs",
    name: "Hack Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhack-squat.jpg?alt=media&token=4e4240ee-befe-43fc-826c-b9c06dd494e7&_gl=1*1nhaz4y*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMTMwLjI5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhack-squat-256x256.png?alt=media&token=964ea611-eaba-44f8-9f15-7aa842f3a750&_gl=1*1wso2ha*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMTUxLjguMC4w",
    imageURLName: "hack-squat.jpg",
    iconURLName: "hack-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Bulgarian Split Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-bulgarian-split-squat.jpg?alt=media&token=807f709c-c62b-49bc-b08f-675feaade98e&_gl=1*16w61r9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMjAyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-bulgarian-split-squat-256x256.png?alt=media&token=a959c754-581e-4954-9b46-760f39f9f8b7&_gl=1*1vqd0ef*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMjE1LjQ3LjAuMA..",
    imageURLName: "dumbbell-bulgarian-split-squat.jpg",
    iconURLName: "dumbbell-bulgarian-split-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Lying Leg Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-leg-curl.jpg?alt=media&token=c3c8d6b8-888d-46ec-a719-d58f4cc92c6d&_gl=1*1dmsare*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMzI4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-leg-curl-256x256.png?alt=media&token=ea1f33ac-5da1-4ea7-b2da-a0e785af3143&_gl=1*1d8f4kv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMzM4LjUwLjAuMA..",
    imageURLName: "lying-leg-curl.jpg",
    iconURLName: "lying-leg-curl-256x256.png",
  },
  {
    category: "Legs",
    name: "Goblet Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fgoblet-squat.jpg?alt=media&token=8b0e3bb3-13c4-4b09-a290-dd4f509584fc&_gl=1*9c2vp2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzMzk4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fgoblet-squat-256x256.png?alt=media&token=dda837b8-1f49-4740-bca5-0d5a34d87656&_gl=1*cfuu7h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNDA4LjUwLjAuMA..",
    imageURLName: "goblet-squat.jpg",
    iconURLName: "goblet-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Machine Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-calf-raise.jpg?alt=media&token=ee1c614c-796d-4c91-ba56-dcfc8fface94&_gl=1*1el559l*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNDU0LjQuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-calf-raise-256x256.png?alt=media&token=40b554cc-b399-4002-89dc-f3a98b0fff86&_gl=1*1ruvscg*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNDc3LjUzLjAuMA..",
    imageURLName: "machine-calf-raise.jpg",
    iconURLName: "machine-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Lunge",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-lunge.jpg?alt=media&token=d22575ad-11be-4fd9-9865-6b6007997b05&_gl=1*1apx8tx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNTY2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-lunge-256x256.png?alt=media&token=3bc6e804-1fed-4cb0-9409-5c2327a2dd3e&_gl=1*gqui65*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNTc5LjQ3LjAuMA..",
    imageURLName: "dumbbell-lunge.jpg",
    iconURLName: "dumbbell-lunge-256x256.png",
  },
  {
    category: "Legs",
    name: "Vertical Leg Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fvertical-leg-press.jpg?alt=media&token=8c823aea-e1d2-413f-91e0-ca7dc9a1b3cb&_gl=1*1iobi1g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNjM5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fvertical-leg-press-256x256.png?alt=media&token=f7ba0fc4-c836-4aa6-b63b-37874825d1a0&_gl=1*13c9sh8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNjUzLjQ2LjAuMA..",
    imageURLName: "vertical-leg-press.jpg",
    iconURLName: "vertical-leg-press-256x256.png",
  },
  {
    category: "Legs",
    name: "Box Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbox-squat.jpg?alt=media&token=c092c446-c748-4142-a2c2-2b422e2ec13f&_gl=1*1qro68*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNjkyLjcuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbox-squat-256x256.png?alt=media&token=c5e37a40-f428-43d0-b57c-74893f556092&_gl=1*1teso1k*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNzA1LjU5LjAuMA..",
    imageURLName: "box-squat.jpg",
    iconURLName: "box-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Bodyweight Squat",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbodyweight-squat.jpg?alt=media&token=180d7edf-3b04-4b08-9d92-21eafa9f710b&_gl=1*11xpw0v*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNzQ5LjE1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbodyweight-squat-256x256.png?alt=media&token=0f4b5c6f-f7c7-4f21-bc51-dc7557953256&_gl=1*f7pqj5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc1MDY1OS4xMTguMS4xNjk4NzUzNzY0LjYwLjAuMA..",
    imageURLName: "bodyweight-squat.jpg",
    iconURLName: "bodyweight-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Bulgarian Split Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbulgarian-split-squat.jpg?alt=media&token=8b38e824-5f72-4144-b782-5a59e2934614&_gl=1*20ug0i*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1MzA2LjUwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbulgarian-split-squat-256x256.png?alt=media&token=e0d4b99a-d743-4018-b5b9-71682fa21702&_gl=1*1l9il06*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1MzQ4LjguMC4w",
    imageURLName: "bulgarian-split-squat.jpg",
    iconURLName: "bulgarian-split-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Seated Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-calf-raise.jpg?alt=media&token=26f66fa9-2c7a-4c1b-b3b6-986d79dbb5a0&_gl=1*1s2sukt*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NDE3LjExLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-calf-raise-256x256.png?alt=media&token=d1df598a-7ae1-497b-81ed-f8892ff7f4f0&_gl=1*1usirer*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NDMzLjU4LjAuMA..",
    imageURLName: "seated-calf-raise.jpg",
    iconURLName: "seated-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Smith Machine Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsmith-machine-squat.jpg?alt=media&token=b67768cf-7c30-42ce-88b9-1c8061a2ae6a&_gl=1*1m8ptyr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NDczLjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsmith-machine-squat-256x256.png?alt=media&token=89971b3d-050c-4255-a84d-ab52aea322c1&_gl=1*166svpl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NDg5LjIuMC4w",
    imageURLName: "smith-machine-squat.jpg",
    iconURLName: "smith-machine-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Good Morning",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fgood-morning.jpg?alt=media&token=ad78565d-8d95-483c-8c7c-b92123022fc5&_gl=1*1f4xydn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NTIzLjM3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fgood-morning-256x256.png?alt=media&token=17948c94-5294-4b28-a379-9807b6be9955&_gl=1*1splxr4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NTY5LjYwLjAuMA..",
    imageURLName: "good-morning.jpg",
    iconURLName: "good-morning-256x256.png",
  },
  {
    category: "Legs",
    name: "Hip Abduction",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-abduction.jpg?alt=media&token=d44d7d90-555e-407f-bdb9-f52e878db0e1&_gl=1*m94k5j*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NjAyLjI3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-abduction-256x256.png?alt=media&token=dcf9161d-6dc6-4103-9cc2-b4745a90a35c&_gl=1*e1n53f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NjIxLjguMC4w",
    imageURLName: "hip-abduction.jpg",
    iconURLName: "hip-abduction-256x256.png",
  },
  {
    category: "Legs",
    name: "Zercher Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fzercher-squat.jpg?alt=media&token=ad96fb3a-8991-4425-aa55-d6187490a03e&_gl=1*18oykjr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NjU3LjM3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fzercher-squat-256x256.png?alt=media&token=d3d056a7-f185-4750-83fc-e393b3c3cac7&_gl=1*8vhtj8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NzA3LjU4LjAuMA..",
    imageURLName: "zercher-squat.jpg",
    iconURLName: "zercher-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Barbell Lunge",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-lunge.jpg?alt=media&token=cc0a9399-46d9-49cb-8b50-f1f5d7010711&_gl=1*1ovfoig*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NzM5LjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-lunge-256x256.png?alt=media&token=e6a6f468-f30c-4e29-9b7d-895a6625e51b&_gl=1*nugak0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1NzU2LjkuMC4w",
    imageURLName: "barbell-lunge.jpg",
    iconURLName: "barbell-lunge-256x256.png",
  },
  {
    category: "Legs",
    name: "Overhead Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Foverhead-squat.jpg?alt=media&token=652d1688-0922-4fe0-ab8d-5f71d27025ff&_gl=1*12oqe1g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1ODAwLjMxLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Foverhead-squat-256x256.png?alt=media&token=a4609850-73a7-4a6f-b7ab-3d9d5f66e79b&_gl=1*1mp9ahw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1ODI2LjUuMC4w",
    imageURLName: "overhead-squat.jpg",
    iconURLName: "overhead-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Hip Adduction",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-adduction.jpg?alt=media&token=fa84ff0c-cab0-40ff-8a55-301a21ebaac0&_gl=1*1nvlquq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1ODU1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-adduction-256x256.png?alt=media&token=a82a579e-e4a8-416c-9572-9034cec976a9&_gl=1*100mmol*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1ODcyLjQzLjAuMA..",
    imageURLName: "hip-adduction.jpg",
    iconURLName: "hip-adduction-256x256.png",
  },
  {
    category: "Legs",
    name: "Barbell Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-calf-raise.jpg?alt=media&token=868a9d6b-e51f-4c7a-ba34-c6aa05b4050a&_gl=1*1c1lkfe*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1OTAyLjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-calf-raise-256x256.png?alt=media&token=d30523da-b8e3-4c5f-85f1-1c924bb07b4c&_gl=1*1jkn7uv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1OTE2LjU5LjAuMA..",
    imageURLName: "barbell-calf-raise.jpg",
    iconURLName: "barbell-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-squat.jpg?alt=media&token=b42d24b9-b1c8-4e23-8287-45e5c843dc7f&_gl=1*uk6khl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1OTUwLjI1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-squat-256x256.png?alt=media&token=12dbe636-0d8f-4d49-a7ec-5aac7075aee3&_gl=1*c3w4lt*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY1OTY3LjguMC4w",
    imageURLName: "dumbbell-squat.jpg",
    iconURLName: "dumbbell-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Split Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsplit-squat.jpg?alt=media&token=b055ac70-49c6-49e1-b51b-07a0d7518d8b&_gl=1*1f4731g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MDQ4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsplit-squat-256x256.png?alt=media&token=88f31308-7985-49b6-a018-964b7b76a448&_gl=1*16ff5w5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MDA2LjMyLjAuMA..",
    imageURLName: "split-squat.jpg",
    iconURLName: "split-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Cable Pull Through",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-pull-through.jpg?alt=media&token=87d41cbc-7661-41ba-81c2-36c31a929d84&_gl=1*1s5k72e*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MTE2LjUzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-pull-through-256x256.png?alt=media&token=41fb437a-1918-44b0-a9a3-053c69b39a96&_gl=1*hpczcn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MDk1LjEzLjAuMA..",
    imageURLName: "cable-pull-through.jpg",
    iconURLName: "cable-pull-through-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-calf-raise.jpg?alt=media&token=0477a8d3-b281-4eba-9a75-e7a846fae1e3&_gl=1*y00fhy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MTY0LjUuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-calf-raise-256x256.png?alt=media&token=aa67ac9c-6557-4317-bb06-34e99a978119&_gl=1*1ueieqx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MTg0LjUxLjAuMA..",
    imageURLName: "dumbbell-calf-raise.jpg",
    iconURLName: "dumbbell-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Standing Leg Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstanding-leg-curl.jpg?alt=media&token=51910937-cf03-42e4-bb20-f2ccbb4fc090&_gl=1*14o7f7q*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MjI1LjEwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstanding-leg-curl-256x256.png?alt=media&token=813297d4-0d70-4393-827f-5f48902e30ac&_gl=1*1c6xit3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MjQ5LjU4LjAuMA..",
    imageURLName: "standing-leg-curl.jpg",
    iconURLName: "standing-leg-curl-256x256.png",
  },
  {
    category: "Legs",
    name: "Landmine Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flandmine-squat.jpg?alt=media&token=599e6095-d130-456d-b2c6-7aa804b3717c&_gl=1*1jklw9h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2Mjg0LjIzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flandmine-squat-256x256.png?alt=media&token=18e11d45-f6fa-4b9e-9866-7bad8d970521&_gl=1*1dsyp7s*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MzEzLjU4LjAuMA..",
    imageURLName: "landmine-squat.jpg",
    iconURLName: "landmine-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Barbell Reverse Lunge",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-reverse-lunge.jpg?alt=media&token=1ee3f852-2c25-47a7-9265-1b9462c6a54e&_gl=1*1v4s1fd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MzQzLjI4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-reverse-lunge-256x256.png?alt=media&token=7d7ae368-640c-4a5f-8da1-6bfea66c4184&_gl=1*1h281x2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2MzYyLjkuMC4w",
    imageURLName: "barbell-reverse-lunge.jpg",
    iconURLName: "barbell-reverse-lunge-256x256.png",
  },
  {
    category: "Legs",
    name: "Barbell Glute Bridge",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-glute-bridge.jpg?alt=media&token=04a76469-bc23-43d1-b78a-a19daca25a33&_gl=1*1csn9lo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NDA1LjI4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-glute-bridge-256x256.png?alt=media&token=55f9d7da-52d1-4e47-b258-78b8adb2aa27&_gl=1*1h08xe0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NDE3LjE2LjAuMA..",
    imageURLName: "barbell-glute-bridge.jpg",
    iconURLName: "barbell-glute-bridge-256x256.png",
  },
  {
    category: "Legs",
    name: "Single Leg Squat",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-squat.jpg?alt=media&token=b5825364-15be-4cfb-b229-8c0ff41aaed9&_gl=1*12e7kaq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NTE4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-squat-256x256.png?alt=media&token=deaf91ce-fa49-4cde-ba51-323fe3b7db10&_gl=1*1igowd9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NTMyLjQ2LjAuMA..",
    imageURLName: "single-leg-squat.jpg",
    iconURLName: "single-leg-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Sled Press Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsled-press-calf-raise.jpg?alt=media&token=8f9f6853-295f-460a-a08a-7b75054c7bc0&_gl=1*1fjgg5v*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NTg2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsled-press-calf-raise-256x256.png?alt=media&token=9318c38f-64f3-4467-97d6-288ca4836f5e&_gl=1*1c0qadq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NTk3LjQ5LjAuMA..",
    imageURLName: "sled-press-calf-raise.jpg",
    iconURLName: "sled-press-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Single Leg Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-press.jpg?alt=media&token=c16fed3e-6bb4-41ed-bb86-60f43f767c25&_gl=1*1o1czui*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NzYxLjQxLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-press-256x256.png?alt=media&token=bbcf4d3d-8295-44ef-a7a8-5ed3ed790dbc&_gl=1*1kg9efv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2NzUwLjUyLjAuMA..",
    imageURLName: "single-leg-press.jpg",
    iconURLName: "single-leg-press-256x256.png",
  },
  {
    category: "Legs",
    name: "Safety Bar Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsafety-bar-squat.jpg?alt=media&token=7f75c8a4-8402-48e1-aaa4-c7b33c1c9ab8&_gl=1*1wy8pq9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2ODAyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsafety-bar-squat-256x256.png?alt=media&token=b4690ae6-0f32-4125-8dc1-7691f34e8bcd&_gl=1*a4o78p*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2ODE5LjQzLjAuMA..",
    imageURLName: "safety-bar-squat.jpg",
    iconURLName: "safety-bar-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Belt Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbelt-squat.jpg?alt=media&token=4a3a83fd-ae77-4b4a-968d-6695a2fe866f&_gl=1*1r8yez4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2ODQ4LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbelt-squat-256x256.png?alt=media&token=2a3b0772-e782-46f7-b5eb-413b573e9ad8&_gl=1*gxvfdl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2ODY4LjYwLjAuMA..",
    imageURLName: "belt-squat.jpg",
    iconURLName: "belt-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Barbell Hack Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-hack-squat.jpg?alt=media&token=13eefe42-afe3-4233-9cfa-a0d958f2c573&_gl=1*1gwj2k5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2ODkwLjM4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-hack-squat-256x256.png?alt=media&token=d8805180-f6eb-4436-acf8-2b5709d37bed&_gl=1*33hmqs*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2OTA4LjIwLjAuMA..",
    imageURLName: "barbell-hack-squat.jpg",
    iconURLName: "barbell-hack-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Pause Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpause-squat.jpg?alt=media&token=4ca605da-4bbc-4110-9d42-6a3fb72c915d&_gl=1*1sgp3be*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2OTQ1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpause-squat-256x256.png?alt=media&token=fb49e943-d6d7-40e8-871b-70c2fd70d5ce&_gl=1*yjjpq5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2OTU4LjQ3LjAuMA..",
    imageURLName: "pause-squat.jpg",
    iconURLName: "pause-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Sumo Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsumo-squat.jpg?alt=media&token=f5dd0480-c62f-40b9-915c-21ab6d338bb2&_gl=1*1lr0wat*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY2OTkyLjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsumo-squat-256x256.png?alt=media&token=da9dc49a-827d-47b7-80b1-adaff463ffed&_gl=1*o1ycj4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MDAzLjIuMC4w",
    imageURLName: "sumo-squat.jpg",
    iconURLName: "sumo-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Pistol Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpistol-squat.jpg?alt=media&token=e46c328c-d1d3-4109-a135-b440164fdd77&_gl=1*17kbeq8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MDUwLjE1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpistol-squat-256x256.png?alt=media&token=e78c806c-af38-4ffe-8891-bfb29d3b240a&_gl=1*1ffoua1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MDY0LjEuMC4w",
    imageURLName: "pistol-squat.jpg",
    iconURLName: "pistol-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Cable Kickback",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-kickback.jpg?alt=media&token=78d7f7c8-b4e1-4af6-a256-d282a3fb455d&_gl=1*1hbgnsj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MDk4LjM3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-kickback-256x256.png?alt=media&token=c094035f-b123-4676-96a6-980b5f8f27e1&_gl=1*1lhdmsq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MTEwLjI1LjAuMA..",
    imageURLName: "cable-kickback.jpg",
    iconURLName: "cable-kickback-256x256.png",
  },
  {
    category: "Legs",
    name: "Lunge",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flunge.jpg?alt=media&token=eaf4b77c-5229-4545-b2f9-6568020495ff&_gl=1*1y6yxor*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MTk4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flunge-256x256.png?alt=media&token=eb30013c-98f2-48ea-b455-c194847f7c5a&_gl=1*1lp0rif*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MjI0LjM0LjAuMA..",
    imageURLName: "lunge.jpg",
    iconURLName: "lunge-256x256.png",
  },
  {
    category: "Legs",
    name: "Bodyweight Calf raise",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbodyweight-calf-raise.jpg?alt=media&token=5804d059-b294-422d-b91d-db363f42d95a&_gl=1*1pk55fo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MjUyLjYuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbodyweight-calf-raise-256x256.png?alt=media&token=e2eedf2c-a3d8-4d2d-a684-f798ad335879&_gl=1*1fo4yre*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MjYzLjYwLjAuMA..",
    imageURLName: "bodyweight-calf-raise.jpg",
    iconURLName: "bodyweight-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Pin Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpin-squat.jpg?alt=media&token=0271b43c-ba5a-410e-80d3-3248343beba4&_gl=1*1ot02gn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3MzYxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpin-squat-256x256.png?alt=media&token=6a3a2762-3428-4233-b948-8e19c40734f0&_gl=1*1nch10h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3Mzc0LjQ3LjAuMA..",
    imageURLName: "pin-squat.jpg",
    iconURLName: "pin-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Glute Bridge",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fglute-bridge.jpg?alt=media&token=b7f48605-6515-441d-a1cb-a2be32342725&_gl=1*1wc9l9x*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3NDA5LjEyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fglute-bridge-256x256.png?alt=media&token=575c8c36-fc63-4e25-ab95-2a8d999f22fe&_gl=1*1y8ulig*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3NDIyLjU5LjAuMA..",
    imageURLName: "glute-bridge.jpg",
    iconURLName: "glute-bridge-256x256.png",
  },
  {
    category: "Legs",
    name: "Walking Lunge",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwalking-lunge.jpg?alt=media&token=4b164ebb-835d-465d-9209-887c6ed44c36&_gl=1*17592no*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3NDc1LjYuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwalking-lunge-256x256.png?alt=media&token=9debfa8f-9ace-4f1a-90ed-cd7cf9e7b8cd&_gl=1*55zc7n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3NTAxLjUxLjAuMA..",
    imageURLName: "walking-lunge.jpg",
    iconURLName: "walking-lunge-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Front Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-front-squat.jpg?alt=media&token=70196ccd-6b44-4cce-acd4-74ecc386b686&_gl=1*1i9bdn1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3NTc2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-front-squat-256x256.png?alt=media&token=630b7ca8-8339-4f7d-9ba0-1943ac736f08&_gl=1*1ildv3w*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3NjA4LjI4LjAuMA..",
    imageURLName: "dumbbell-front-squat.jpg",
    iconURLName: "dumbbell-front-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Reverse Lunge",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-lunge.jpg?alt=media&token=54029fdb-0cc1-434e-9cba-0a1c28411ae1&_gl=1*wpu7p7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3ODA2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-lunge-256x256.png?alt=media&token=6123976f-b134-4b3c-bd19-ffa2fdd3ad48&_gl=1*1taulcg*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3ODE5LjQ3LjAuMA..",
    imageURLName: "reverse-lunge.jpg",
    iconURLName: "reverse-lunge-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Split Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-split-squat.jpg?alt=media&token=ac539cd7-6bb4-4ae7-be5d-2d1dc10d6e12&_gl=1*19xl001*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3ODg4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-split-squat-256x256.png?alt=media&token=eca970af-c804-4bf2-8ad3-a1a453b112cd&_gl=1*1d7kwbg*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3ODk5LjQ5LjAuMA..",
    imageURLName: "dumbbell-split-squat.jpg",
    iconURLName: "dumbbell-split-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Squat Jump",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsquat-jump.jpg?alt=media&token=56e7ccf8-14b2-4925-a6fc-7804979eaf7a&_gl=1*1b5cn7g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3OTM4LjEwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsquat-jump-256x256.png?alt=media&token=4c300703-1016-407f-88a1-eb081aa0ad20&_gl=1*brdna*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3OTU0LjYwLjAuMA..",
    imageURLName: "squat-jump.jpg",
    iconURLName: "squat-jump-256x256.png",
  },
  {
    category: "Legs",
    name: "Nordic Hamstring Curl",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fnordic-hamstring-curl.jpg?alt=media&token=122d6de9-cb6d-4fd9-9dd7-a00d11881e0e&_gl=1*1tc2e26*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY3OTg2LjI4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fnordic-hamstring-curl-256x256.png?alt=media&token=1d873374-678c-48a8-ad09-72b4b8ffa243&_gl=1*r7ys6q*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4MDAyLjEyLjAuMA..",
    imageURLName: "nordic-hamstring-curl.jpg",
    iconURLName: "nordic-hamstring-curl-256x256.png",
  },
  {
    category: "Legs",
    name: "Glute Ham Raise",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fglute-ham-raise.jpg?alt=media&token=6b7360bd-536a-48bc-be8f-d40de2514b8d&_gl=1*6neajg*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4MjA2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fglute-ham-raise-256x256.png?alt=media&token=b4bb34eb-b5a5-4965-b478-b9d0bf564100&_gl=1*1vy836z*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4MjI5LjM3LjAuMA..",
    imageURLName: "glute-ham-raise.jpg",
    iconURLName: "glute-ham-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Single Leg Seated Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-seated-calf-raise.jpg?alt=media&token=09be1bd6-6e6f-4c42-ae82-7cf77b9f1c4a&_gl=1*o14kql*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4MzA4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-seated-calf-raise-256x256.png?alt=media&token=68ec6c95-569d-4a15-88cb-65ccdb73ce6a&_gl=1*vdkb9y*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4MzE5LjQ5LjAuMA..",
    imageURLName: "single-leg-seated-calf-raise.jpg",
    iconURLName: "single-leg-seated-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Sissy Squat",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsissy-squat.jpg?alt=media&token=9b306130-bf38-4618-9fd7-3309ce131caa&_gl=1*umakl0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4MzU0LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsissy-squat-256x256.png?alt=media&token=58e41d1e-eee3-4b47-9bb5-7c9c8616eda4&_gl=1*1l268va*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4MzgyLjUzLjAuMA..",
    imageURLName: "sissy-squat.jpg",
    iconURLName: "sissy-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Cable Leg Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-leg-extension.jpg?alt=media&token=ad5d856c-804a-49e4-968b-f014256ad57c&_gl=1*15v3vmu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4NDA2LjI5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-leg-extension-256x256.png?alt=media&token=d488abd0-b653-4ff5-9f6e-5840c96a62f0&_gl=1*b45ozh*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4NDIwLjE1LjAuMA..",
    imageURLName: "cable-leg-extension.jpg",
    iconURLName: "cable-leg-extension-256x256.png",
  },
  {
    category: "Legs",
    name: "Half Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhalf-squat.jpg?alt=media&token=4e1b8106-0037-48eb-956b-914bd124a9d7&_gl=1*1wim66u*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4NjY1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhalf-squat-256x256.png?alt=media&token=88bd2533-7ec0-41a5-b9b6-ff58c3049d36&_gl=1*1m3pi6a*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4Njc2LjQ5LjAuMA..",
    imageURLName: "half-squat.jpg",
    iconURLName: "half-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Side Lunge",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fside-lunge.jpg?alt=media&token=416b1e62-b455-4bad-ad28-125e3df33366&_gl=1*1n8u8tr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4NzEyLjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fside-lunge-256x256.png?alt=media&token=ebb93440-654f-44a0-a068-b3c9a3c949b3&_gl=1*b8s3z3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4NzMzLjYwLjAuMA..",
    imageURLName: "side-lunge.jpg",
    iconURLName: "side-lunge-256x256.png",
  },
  {
    category: "Legs",
    name: "Donkey Calf Raise",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdonkey-calf-raise.jpg?alt=media&token=69b21dc0-5f4c-4050-aac8-427f762266a8&_gl=1*150chy8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4Nzc4LjE1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdonkey-calf-raise-256x256.png?alt=media&token=026d338a-a51c-4f72-85f1-30600b862b6b&_gl=1*18i0763*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4ODA4LjYwLjAuMA..",
    imageURLName: "donkey-calf-raise.jpg",
    iconURLName: "donkey-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Glute Kickback",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fglute-kickback.jpg?alt=media&token=e1c8f722-628d-435e-a57c-799ab9d66dee&_gl=1*1p0prx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4ODM3LjMxLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fglute-kickback-256x256.png?alt=media&token=449056b1-2d57-42e2-a14b-7032ae64b3ef&_gl=1*1k7tlp5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4ODUwLjE4LjAuMA..",
    imageURLName: "glute-kickback.jpg",
    iconURLName: "glute-kickback-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Walking Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-walking-calf-raise.jpg?alt=media&token=26afc477-9912-4682-b6cc-867fe49a162f&_gl=1*uataf3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4ODk1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-walking-calf-raise-256x256.png?alt=media&token=c6f05d2f-3b3b-49ce-9b68-409ca318a80c&_gl=1*r8e1r*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4OTA2LjQ5LjAuMA..",
    imageURLName: "dumbbell-walking-calf-raise.jpg",
    iconURLName: "dumbbell-walking-calf-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Side Leg Raise",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fside-leg-raise.jpg?alt=media&token=f389a8ad-b62e-4f59-a9a8-8f3529b9d79b&_gl=1*11gx4wz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4OTQxLjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fside-leg-raise-256x256.png?alt=media&token=c32f401d-b2e6-483e-bca6-51efa31d3c85&_gl=1*6hrtg8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4OTUyLjMuMC4w",
    imageURLName: "side-leg-raise.jpg",
    iconURLName: "side-leg-raise-256x256.png",
  },
  {
    category: "Legs",
    name: "Jefferson Squat",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjefferson-squat.jpg?alt=media&token=502431d6-8f07-44f9-972e-a54e0e46c923&_gl=1*1zqteo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4OTgwLjQxLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjefferson-squat-256x256.png?alt=media&token=d3407ed3-6f84-4f9f-81cd-118c118f433e&_gl=1*1um6rol*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY4OTg5LjMyLjAuMA..",
    imageURLName: "jefferson-squat.jpg",
    iconURLName: "jefferson-squat-256x256.png",
  },
  {
    category: "Legs",
    name: "Floor Hip Abduction",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffloor-hip-abduction.jpg?alt=media&token=59e10997-cd7c-4228-a93a-76d711d24448&_gl=1*11lq6f7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MDM3LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffloor-hip-abduction-256x256.png?alt=media&token=8d315e73-d266-4bee-881d-e396b8d89c87&_gl=1*4fn7xp*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MDUxLjQ2LjAuMA..",
    imageURLName: "floor-hip-abduction.jpg",
    iconURLName: "floor-hip-abduction-256x256.png",
  },
  {
    category: "Legs",
    name: "Hip Extension",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-extension.jpg?alt=media&token=56fb27b2-af71-4b01-a08e-0e29a915336c&_gl=1*8t4om1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MDkwLjcuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhip-extension-256x256.png?alt=media&token=91402549-7411-40af-ac4f-7ff79993a926&_gl=1*1pz09lw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MTE3LjYwLjAuMA..",
    imageURLName: "hip-extension.jpg",
    iconURLName: "hip-extension-256x256.png",
  },
  {
    category: "Legs",
    name: "Floor Hip Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffloor-hip-extension.jpg?alt=media&token=93480bfd-303b-48ca-a14e-fd32f3bf661a&_gl=1*1ayswyu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MTU5LjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffloor-hip-extension-256x256.png?alt=media&token=b1bbcda4-a4ef-42e1-828b-33c98a8e9fc3&_gl=1*1p487dq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MTcyLjUuMC4w",
    imageURLName: "floor-hip-extension.jpg",
    iconURLName: "floor-hip-extension-256x256.png",
  },
  {
    category: "Forearms",
    name: "Wrist Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwrist-curl.jpg?alt=media&token=d49643fc-5f5d-46af-a0ce-389413d53680&_gl=1*x12soo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MjI3LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwrist-curl-256x256.png?alt=media&token=2ad3fbbb-69d6-4ee7-a887-ba40505ff5ff&_gl=1*m5jj2d*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MjQ3LjU5LjAuMA..",
    imageURLName: "wrist-curl.jpg",
    iconURLName: "wrist-curl-256x256.png",
  },
  {
    category: "Forearms",
    name: "Reverse Barbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-barbell-curl.jpg?alt=media&token=e65e7de2-fa01-40c2-8993-4b1f61675e8c&_gl=1*100dwl6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5Mjc5LjI3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-barbell-curl-256x256.png?alt=media&token=89ce64a0-8089-422d-9e3d-c2f2d04a2b9f&_gl=1*1yjk8aw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5Mjk0LjEyLjAuMA..",
    imageURLName: "reverse-barbell-curl.jpg",
    iconURLName: "reverse-barbell-curl-256x256.png",
  },
  {
    category: "Forearms",
    name: "Reverse Wrist Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-wrist-curl.jpg?alt=media&token=d8b8b75e-76e6-4e22-9c83-48c2143cd401&_gl=1*9jsa8y*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MzMxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-wrist-curl-256x256.png?alt=media&token=568016de-1f9e-4db8-ad87-8d9ac4244ca4&_gl=1*1pqrxk3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5MzUzLjM4LjAuMA..",
    imageURLName: "reverse-wrist-curl.jpg",
    iconURLName: "reverse-wrist-curl-256x256.png",
  },
  {
    category: "Forearms",
    name: "Dumbbell Wrist Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-wrist-curl.jpg?alt=media&token=95f76ba4-43f0-4834-baf9-478545a3785b&_gl=1*1apungd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5Mzg2LjUuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-wrist-curl-256x256.png?alt=media&token=527a4d95-82cc-4fb3-b9e0-05057a797c02&_gl=1*1chmnzf*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5NDA4LjQ5LjAuMA..",
    imageURLName: "dumbbell-wrist-curl.jpg",
    iconURLName: "dumbbell-wrist-curl-256x256.png",
  },
  {
    category: "Forearms",
    name: "Dumbbell Reverse Wrist Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-reverse-wrist-curl.jpg?alt=media&token=3403aaa9-bb6d-47ca-960a-03f2c73bf241&_gl=1*3holwx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5NDQ1LjEyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-reverse-wrist-curl-256x256.png?alt=media&token=2cb78846-7d62-437d-89cb-6f88a51ed002&_gl=1*ci83xx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5NDYyLjYwLjAuMA..",
    imageURLName: "dumbbell-reverse-wrist-curl.jpg",
    iconURLName: "dumbbell-reverse-wrist-curl-256x256.png",
  },
  {
    category: "Forearms",
    name: "Dumbell Reverse Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-reverse-curl.jpg?alt=media&token=4d816982-8538-4cdd-ad2d-67eb4f08885c&_gl=1*2734bi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5NDg1LjM3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-reverse-curl-256x256.png?alt=media&token=620b5403-1e14-4cdb-83ae-9d9a37b5e28c&_gl=1*1refjmb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc2NTI5Ni4xMTkuMS4xNjk4NzY5NDk2LjI2LjAuMA..",
    imageURLName: "dumbbell-reverse-curl.jpg",
    iconURLName: "dumbbell-reverse-curl-256x256.png",
  },
  {
    category: "Triceps",
    name: "Dips",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdips.jpg?alt=media&token=2e8d0daf-fb34-4a50-93df-e83bffacf38c&_gl=1*1k8y1b4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMDk1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdips-256x256.png?alt=media&token=9acf4454-222e-45a8-b41f-d01a0838db67&_gl=1*u9x5xc*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMTM5LjE2LjAuMA..",
    imageURLName: "dips.jpg",
    iconURLName: "dips-256x256.png",
  },
  {
    category: "Triceps",
    name: "Tricep Pushdown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftricep-pushdown.jpg?alt=media&token=06f83a82-3512-48a1-a6f1-637aa42f3aeb&_gl=1*u6siai*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMTgwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftricep-pushdown-256x256.png?alt=media&token=d16427a2-abc1-4307-a9c3-c20a2f99f86d&_gl=1*m4jz1x*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMTk2LjQ0LjAuMA..",
    imageURLName: "tricep-pushdown.jpg",
    iconURLName: "tricep-pushdown-256x256.png",
  },
  {
    category: "Triceps",
    name: "Lying Tricep Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-tricep-extension.jpg?alt=media&token=d385c8dd-bf5a-4856-875a-83afa1c01338&_gl=1*1gouble*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMjc0LjMyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-tricep-extension-256x256.png?alt=media&token=395409e0-8421-44e9-8c1c-bd33ed47d54b&_gl=1*jm4irp*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMjUwLjU2LjAuMA..",
    imageURLName: "lying-tricep-extension.jpg",
    iconURLName: "lying-tricep-extension-256x256.png",
  },
  {
    category: "Triceps",
    name: "Tricep Rope Pushdown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftricep-rope-pushdown.jpg?alt=media&token=fbb737a6-ab10-4274-952a-6f637fe7d4cf&_gl=1*vyi11i*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMzA4LjU5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftricep-rope-pushdown-256x256.png?alt=media&token=33952759-d1eb-4f85-9e1d-000ca73d215e&_gl=1*iyzvtq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMzIzLjQ0LjAuMA..",
    imageURLName: "tricep-rope-pushdown.jpg",
    iconURLName: "tricep-rope-pushdown-256x256.png",
  },
  {
    category: "Triceps",
    name: "Dumbbell Tricep Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-tricep-extension.jpg?alt=media&token=e4a7624d-dc92-47f2-9bf9-706d5549686a&_gl=1*149vnsd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMzY2LjEuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-tricep-extension-256x256.png?alt=media&token=4659944d-986c-43ad-9f29-f1c8e12341cf&_gl=1*iqsi0n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwMzg0LjQ3LjAuMA..",
    imageURLName: "dumbbell-tricep-extension.jpg",
    iconURLName: "dumbbell-tricep-extension-256x256.png",
  },
  {
    category: "Triceps",
    name: "Tricep Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftricep-extension.jpg?alt=media&token=e9d47022-9ac1-4a0e-be6a-9804dfc60883&_gl=1*hw0nwy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNDI4LjMuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftricep-extension-256x256.png?alt=media&token=7a960383-a981-4289-9d13-5667efc4aa98&_gl=1*pklkbd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNDU5LjM2LjAuMA..",
    imageURLName: "tricep-extension.jpg",
    iconURLName: "tricep-extension-256x256.png",
  },
  {
    category: "Triceps",
    name: "Lying Dumbbell Tricep Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-dumbbell-tricep-extension.jpg?alt=media&token=ff5b6005-9d6e-45a0-bee9-d538409c4b82&_gl=1*1nbbfqt*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNTAyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-dumbbell-tricep-extension-256x256.png?alt=media&token=37603c20-f7f8-43cc-9343-54f1aa77cfa9&_gl=1*1w85ml6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNTE3LjQ1LjAuMA..",
    imageURLName: "lying-dumbbell-tricep-extension.jpg",
    iconURLName: "lying-dumbbell-tricep-extension-256x256.png",
  },
  {
    category: "Triceps",
    name: "Seated Dip Machine",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dip-machine.jpg?alt=media&token=712b2876-a6f4-463e-8e64-7b5ed25c9b70&_gl=1*1ycms6r*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNTUyLjEwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dip-machine-256x256.png?alt=media&token=4956a7fe-41a0-4036-a5db-6306e9bb1df8&_gl=1*ga0z78*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNTY0LjU5LjAuMA..",
    imageURLName: "seated-dip-machine.jpg",
    iconURLName: "seated-dip-machine-256x256.png",
  },
  {
    category: "Triceps",
    name: "Dumbbell Tricep Kickback",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-tricep-kickback.jpg?alt=media&token=93bff3f5-6f25-4704-a95b-ea37ea3f3f2f&_gl=1*1lpm9ai*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNjA3LjE2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-tricep-kickback-256x256.png?alt=media&token=105f704c-1653-4005-adb6-3f8f669dfe17&_gl=1*1pxkct2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNjI1LjU5LjAuMA..",
    imageURLName: "dumbbell-tricep-kickback.jpg",
    iconURLName: "dumbbell-tricep-kickback-256x256.png",
  },
  {
    category: "Triceps",
    name: "Cable Overhead Tricep Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-overhead-tricep-extension.jpg?alt=media&token=b9ff4c64-5c2b-4598-936b-2937c4c79da6&_gl=1*1fdrp9u*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNjYwLjI0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-overhead-tricep-extension-256x256.png?alt=media&token=926f6e78-2b94-492a-8402-30b3dc495a96&_gl=1*v96e78*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNjc3LjcuMC4w",
    imageURLName: "cable-overhead-tricep-extension.jpg",
    iconURLName: "cable-overhead-tricep-extension-256x256.png",
  },
  {
    category: "Triceps",
    name: "Machine Tricep Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-tricep-extension.jpg?alt=media&token=1d01022e-d64c-43c9-9769-246ff362974c&_gl=1*17uf1dv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNzI4LjIwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-tricep-extension-256x256.png?alt=media&token=f1520582-2ee0-4769-9330-8d16c569cefe&_gl=1*17q263a*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNzM4LjEwLjAuMA..",
    imageURLName: "machine-tricep-extension.jpg",
    iconURLName: "machine-tricep-extension-256x256.png",
  },
  {
    category: "Triceps",
    name: "Seated Dumbbell Tricep Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dumbbell-tricep-extension.jpg?alt=media&token=21bfb8dd-42c3-4c67-9ed8-edcffd0f79d5&_gl=1*5l3kvo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNzgxLjMyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dumbbell-tricep-extension-256x256.png?alt=media&token=66dbf81d-6035-48c9-926e-0494566b2a71&_gl=1*18aij22*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgwNzkzLjIwLjAuMA..",
    imageURLName: "seated-dumbbell-tricep-extension.jpg",
    iconURLName: "seated-dumbbell-tricep-extension-256x256.png",
  },

  {
    category: "Triceps",
    name: "Reverse Grip Tricep Pushdown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-grip-tricep-pushdown.jpg?alt=media&token=a735d02f-12d1-4d7e-8ad2-55d4d4fa09f1&_gl=1*upyg72*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxMzkzLjU4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-grip-tricep-pushdown-256x256.png?alt=media&token=b658c1d4-554f-40ec-abe9-1ca451011126&_gl=1*1huwlpx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNDI5LjIyLjAuMA..",
    imageURLName: "reverse-grip-tricep-pushdown.jpg",
    iconURLName: "reverse-grip-tricep-pushdown-256x256.png",
  },
  {
    category: "Triceps",
    name: "JM Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjm-press.jpg?alt=media&token=80e2b1af-ed6c-498a-a95c-c52dc71bdc39&_gl=1*946xmw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNDcwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjm-press-256x256.png?alt=media&token=1b844289-7757-42ca-a430-978c4956eacc&_gl=1*16sshr0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNDg1LjQ1LjAuMA..",
    imageURLName: "jm-press.jpg",
    iconURLName: "jm-press-256x256.png",
  },
  {
    category: "Triceps",
    name: "Tate Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftate-press.jpg?alt=media&token=3c5d4943-0885-43c7-9d80-ccd4fb539ebf&_gl=1*1n6szfs*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNTM5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftate-press-256x256.png?alt=media&token=ff1706ec-f9fb-4dfa-8c1c-c4958f29d510&_gl=1*10e52g7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNTQ5LjUwLjAuMA..",
    imageURLName: "tate-press.jpg",
    iconURLName: "tate-press-256x256.png",
  },
  {
    category: "Triceps",
    name: "Bench Dips",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-dips.jpg?alt=media&token=4e95f812-12c6-44d5-aed9-5923aaf8066f&_gl=1*o4joza*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNTcxLjI4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-dips-256x256.png?alt=media&token=47255e6c-7e0c-4ada-97d7-77733e37bac1&_gl=1*s4xgwl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNTgwLjE5LjAuMA..",
    imageURLName: "bench-dips.jpg",
    iconURLName: "bench-dips-256x256.png",
  },
  {
    category: "Triceps",
    name: "Ring Dips",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fring-dips.jpg?alt=media&token=2f4cd57f-febb-4e12-b1ae-2e4d6eedb991&_gl=1*104futy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNjExLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fring-dips-256x256.png?alt=media&token=e88035de-a15b-4893-aca3-f7f007ee8dd4&_gl=1*1xym8nw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgxNjIyLjQ5LjAuMA..",
    imageURLName: "ring-dips.jpg",
    iconURLName: "ring-dips-256x256.png",
  },
  {
    category: "Core",
    name: "Sit Ups",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsit-ups.jpg?alt=media&token=cd3a839c-ce81-4ac7-8515-b5baf769ba95&_gl=1*n6dxx7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyMTMwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsit-ups-256x256.png?alt=media&token=a1e6b3d3-6ded-467b-a051-01a4cce72b97&_gl=1*1bfv4j0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyMTUwLjQwLjAuMA..",
    imageURLName: "sit-ups.jpg",
    iconURLName: "sit-ups-256x256.png",
  },
  {
    category: "Core",
    name: "Cable Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-crunch.jpg?alt=media&token=5be967b2-c588-498a-892e-5f5f08b35e63&_gl=1*ph3xhy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyMTc3LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-crunch-256x256.png?alt=media&token=b3b9f60a-28e1-4c7d-b930-405c738eabc4&_gl=1*pvucnz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyMTk1LjU3LjAuMA..",
    imageURLName: "cable-crunch.jpg",
    iconURLName: "cable-crunch-256x256.png",
  },
  {
    category: "Core",
    name: "Machine Seated Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-seated-crunch.jpg?alt=media&token=fabd3f12-0573-49b3-9025-db2977722b96&_gl=1*19pk8l9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyMzY3LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-seated-crunch-256x256.png?alt=media&token=e0e4d3c3-2d68-4c20-b134-61fa3de805c9&_gl=1*bhsj9n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyMzgwLjQ3LjAuMA..",
    imageURLName: "machine-seated-crunch.jpg",
    iconURLName: "machine-seated-crunch-256x256.png",
  },
  {
    category: "Core",
    name: "Crunches",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcrunches.jpg?alt=media&token=e8052f47-7c77-4d3d-be6c-15e51c18d704&_gl=1*1m8dhpb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNDYzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcrunches-256x256.png?alt=media&token=b7024fb3-dd1e-4b74-a3e8-6991a2fb4e0e&_gl=1*63bbbj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNDc3LjQ2LjAuMA..",
    imageURLName: "crunches.jpg",
    iconURLName: "crunches-256x256.png",
  },
  {
    category: "Core",
    name: "Dumbbell Side Bend",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-side-bend.jpg?alt=media&token=92cebb60-2d33-4f77-a81e-650d7393a55e&_gl=1*57c3ts*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNTMwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-side-bend-256x256.png?alt=media&token=d63492a5-7235-42ad-8161-b0cfa38cb2f7&_gl=1*74co6m*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNTQ0LjQ2LjAuMA..",
    imageURLName: "dumbbell-side-bend.jpg",
    iconURLName: "dumbbell-side-bend-256x256.png",
  },
  {
    category: "Core",
    name: "Cable Woodchopper",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-woodchopper.jpg?alt=media&token=300d3140-f296-40da-8adc-31c4ce8da8a0&_gl=1*1ssy2qz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNTg1LjUuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-woodchopper-256x256.png?alt=media&token=32562829-5ebe-4c6c-9b89-88f9c059c6fc&_gl=1*142w3i1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNTk5LjYwLjAuMA..",
    imageURLName: "cable-woodchopper.jpg",
    iconURLName: "cable-woodchopper-256x256.png",
  },
  {
    category: "Core",
    name: "Hanging Leg Raise",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhanging-leg-raise.jpg?alt=media&token=1881d8e3-67c4-48cd-9b6e-75b10ae3e14a&_gl=1*6bq3on*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNjM1LjI0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhanging-leg-raise-256x256.png?alt=media&token=4ab4c3cc-4b3e-4f1c-ba6f-840fb979b6ad&_gl=1*8jb4r1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNjU5LjYwLjAuMA..",
    imageURLName: "hanging-leg-raise.jpg",
    iconURLName: "hanging-leg-raise-256x256.png",
  },
  {
    category: "Core",
    name: "Russian Twist",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Frussian-twist.jpg?alt=media&token=6019265a-38a8-4d45-9b69-dc6eaab74c00&_gl=1*gyhbww*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNjkzLjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Frussian-twist-256x256.png?alt=media&token=1fd72c00-4499-473e-9436-1b26d24210e1&_gl=1*sjb922*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNzEwLjkuMC4w",
    imageURLName: "russian-twist.jpg",
    iconURLName: "russian-twist-256x256.png",
  },
  {
    category: "Core",
    name: "Lying Leg Raise",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-leg-raise.jpg?alt=media&token=c37fb921-4b44-42bb-82fa-db4f1bbeae85&_gl=1*13awckn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgyNzU2LjI4LjAuMA..",
    iconURL: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-leg-raise-256x256.png?alt=media&token=6bdc31a2-3e52-4328-8173-92b3f6c4b990&_gl=1*1nhvhvi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5OTAwMTgyOC4xMjguMS4xNjk5MDAxODU3LjMxLjAuMA..",
    imageURLName: "lying-leg-raise.jpg",
    iconURLName: "lying-leg-raise-256x256.png",
  },
  {
    category: "Core",
    name: "Ab Wheel Rollout",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fab-wheel-rollout.jpg?alt=media&token=00cec357-7d93-45c9-ad57-f81d86dff165&_gl=1*8dtqo5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzNDc5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fab-wheel-rollout-256x256.png?alt=media&token=d94db49f-cd73-421c-aae7-40f6706c87a5&_gl=1*hyv1lc*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzNjI5LjYwLjAuMA..",
    imageURLName: "ab-wheel-rollout.jpg",
    iconURLName: "ab-wheel-rollout-256x256.png",
  },
  {
    category: "Core",
    name: "Hanging Knee Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhanging-knee-raise.jpg?alt=media&token=03648d23-2fcf-43f7-b7d8-9feb0d79d277&_gl=1*s9qhud*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzNjYzLjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhanging-knee-raise-256x256.png?alt=media&token=1121e57e-8382-4016-a272-63accff0a454&_gl=1*rnfohh*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzNzEyLjYwLjAuMA..",
    imageURLName: "hanging-knee-raise.jpg",
    iconURLName: "hanging-knee-raise-256x256.png",
  },
  {
    category: "Core",
    name: "Decline Sit Up",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-sit-up.jpg?alt=media&token=b84b6c8f-7870-4eeb-b3f3-01b6774417e0&_gl=1*1r1o2a3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzNzU1LjE3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-sit-up-256x256.png?alt=media&token=197712c6-f7c4-4c05-837d-0f0fe06276fe&_gl=1*13smq78*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzNzY4LjQuMC4w",
    imageURLName: "decline-sit-up.jpg",
    iconURLName: "decline-sit-up-256x256.png",
  },
  {
    category: "Core",
    name: "Toes To Bar",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftoes-to-bar.jpg?alt=media&token=a52ed894-c0d5-433b-99b8-dfba7a8e07e9&_gl=1*kfx24n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzODEzLjE5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ftoes-to-bar-256x256.png?alt=media&token=578311bc-9e4c-4565-8a37-52d268f38403&_gl=1*cfxl4h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzODIxLjExLjAuMA..",
    imageURLName: "toes-to-bar.jpg",
    iconURLName: "toes-to-bar-256x256.png",
  },
  {
    category: "Core",
    name: "Decline Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-crunch.jpg?alt=media&token=c8a38b28-bd46-4d1d-b961-e59aee60c5ba&_gl=1*1c61mnl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzODU3LjM2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-crunch-256x256.png?alt=media&token=fef59c21-1252-4847-8ff5-9090b44d88f5&_gl=1*1k6gunv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzODY4LjI1LjAuMA..",
    imageURLName: "decline-crunch.jpg",
    iconURLName: "decline-crunch-256x256.png",
  },
  {
    category: "Core",
    name: "Jumping Jack",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjumping-jack.jpg?alt=media&token=4f71405f-90ab-4316-ab90-3bb32d761a20&_gl=1*1vegohr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzOTIyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjumping-jack-256x256.png?alt=media&token=942ef9c8-b3a5-4f61-bbb8-22bb24ffcd20&_gl=1*1mhjocw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzOTM3LjQ1LjAuMA..",
    imageURLName: "jumping-jack.jpg",
    iconURLName: "jumping-jack-256x256.png",
  },
  {
    category: "Core",
    name: "Bicycle Crunch",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbicycle-crunch.jpg?alt=media&token=8f2aaf08-daca-44db-8afd-f9f964e2b655&_gl=1*o3gc2f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzOTY4LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbicycle-crunch-256x256.png?alt=media&token=c64b785e-17bd-4303-ae8a-a4c58cafb36c&_gl=1*pwq27a*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4NzgzOTgxLjEuMC4w",
    imageURLName: "bicycle-crunch.jpg",
    iconURLName: "bicycle-crunch-256x256.png",
  },
  {
    category: "Core",
    name: "Reverse Crunches",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-crunches.jpg?alt=media&token=f7e786a5-a601-4ef9-a441-07ad7d2a4ee1&_gl=1*14qjrp9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MDIzLjI3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-crunches-256x256.png?alt=media&token=1a9e5572-bb1b-47f7-a448-a6f3af73a7cb&_gl=1*1ikxs4k*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MDQyLjguMC4w",
    imageURLName: "reverse-crunches.jpg",
    iconURLName: "reverse-crunches-256x256.png",
  },
  {
    category: "Core",
    name: "Flutter Kicks",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fflutter-kicks.jpg?alt=media&token=21bb3415-a47f-4063-a951-51f851b2b449&_gl=1*158dq4z*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MDcyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fflutter-kicks-256x256.png?alt=media&token=7930d544-7068-4487-983a-8a8853e6bf0e&_gl=1*173vu76*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MDg3LjQ1LjAuMA..",
    imageURLName: "flutter-kicks.jpg",
    iconURLName: "flutter-kicks-256x256.png",
  },
  {
    category: "Core",
    name: "Mountain Climbers",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmountain-climbers.jpg?alt=media&token=cc69841a-dc8a-45c6-88dc-0a302d254837&_gl=1*1pfvqiy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MTE3LjE1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmountain-climbers-256x256.png?alt=media&token=1797e2ac-7974-4a59-a220-5b02bc785fd0&_gl=1*5te6ww*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MTM3LjYwLjAuMA..",
    imageURLName: "mountain-climbers.jpg",
    iconURLName: "mountain-climbers-256x256.png",
  },
  {
    category: "Core",
    name: "High Pulley Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhigh-pulley-crunch.jpg?alt=media&token=f2dbe287-97ba-4066-83b1-f340069a3da0&_gl=1*1kkz9c6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MTcwLjI3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhigh-pulley-crunch-256x256.png?alt=media&token=ae2a855d-4e93-4fe9-9181-5ed663717f0e&_gl=1*1jmnm37*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0MTgwLjE3LjAuMA..",
    imageURLName: "high-pulley-crunch.jpg",
    iconURLName: "high-pulley-crunch-256x256.png",
  },
  {
    category: "Core",
    name: "Standing Cable Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstanding-cable-crunch.jpg?alt=media&token=689a396f-3ae6-4603-98fb-f0bc91279a75&_gl=1*1ub3jtq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NDA4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstanding-cable-crunch-256x256.png?alt=media&token=292378e3-b1a0-41d6-89a1-27ea4056d4bb&_gl=1*th7iiv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NDIxLjQ3LjAuMA..",
    imageURLName: "standing-cable-crunch.jpg",
    iconURLName: "standing-cable-crunch-256x256.png",
  },
  {
    category: "Core",
    name: "Superman",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsuperman.jpg?alt=media&token=1e8b45aa-e063-4f78-8d6d-573cc0abc5d9&_gl=1*o53g8k*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NDQ5LjE5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsuperman-256x256.png?alt=media&token=a87b441a-2d16-4261-b9a5-4bea5d28c19f&_gl=1*18ytwj4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NDYwLjguMC4w",
    imageURLName: "superman.jpg",
    iconURLName: "superman-256x256.png",
  },
  {
    category: "Core",
    name: "Side Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fside-crunch.jpg?alt=media&token=d3259ff2-4949-4cdb-9a2d-abc8e65e8f54&_gl=1*eb706p*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NDk5LjM2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fside-crunch-256x256.png?alt=media&token=870a36cc-6872-4004-b907-bbdea8b3bec4&_gl=1*g9ac2b*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NTEyLjIzLjAuMA..",
    imageURLName: "side-crunch.jpg",
    iconURLName: "side-crunch-256x256.png",
  },
  {
    category: "Core",
    name: "Roman Chair Side Bend",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Froman-chair-side-bend.jpg?alt=media&token=c0318369-c234-4639-8f59-b09dafff1d53&_gl=1*lwj93y*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NTQxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Froman-chair-side-bend-256x256.png?alt=media&token=5f03c899-cc65-4ea5-a446-e8a2fb067083&_gl=1*1jy92fj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NTU5LjQyLjAuMA..",
    imageURLName: "roman-chair-side-bend.jpg",
    iconURLName: "roman-chair-side-bend-256x256.png",
  },
  {
    category: "Core",
    name: "Scissor Kicks",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fscissor-kicks.jpg?alt=media&token=56a047c5-570d-4bb0-acbf-93e58efc23b1&_gl=1*s48xfx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NTk5LjIuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fscissor-kicks-256x256.png?alt=media&token=0f2b0031-9583-4a9f-a8b1-3c321bba74fc&_gl=1*1vrvaep*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODc3OTk5NC4xMjAuMS4xNjk4Nzg0NjA5LjUyLjAuMA..",
    imageURLName: "scissor-kicks.jpg",
    iconURLName: "scissor-kicks-256x256.png",
  },
  {
    category: "Biceps",
    name: "Dumbbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-curl.jpg?alt=media&token=97b4ab87-1600-48ca-8d4b-fed9f0358f2c&_gl=1*1f8hcvt*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgwODM4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-curl-256x256.png?alt=media&token=7ad3d3d5-4bf3-4639-b2b1-5f656dc12b6d&_gl=1*f5g2dl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgwODU3LjQxLjAuMA..",
    imageURLName: "dumbbell-curl.jpg",
    iconURLName: "dumbbell-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Barbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-curl.jpg?alt=media&token=8dfd7561-0e8e-4a9d-9f50-86674752bd0f&_gl=1*1f94c0n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgwODk2LjIuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-curl-256x256.png?alt=media&token=3ff85e81-5f35-4c85-8242-4c2000a4b72b&_gl=1*ogytfi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgwOTEwLjU4LjAuMA..",
    imageURLName: "barbell-curl.jpg",
    iconURLName: "barbell-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Hammer Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhammer-curl.jpg?alt=media&token=b8937df3-48f2-4362-a7c6-093d9f37e290&_gl=1*c7z6b0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgwOTQyLjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhammer-curl-256x256.png?alt=media&token=7cb4b546-4ef8-41f0-943d-edc091d1e77e&_gl=1*1c3ibj4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgwOTU1LjEzLjAuMA..",
    imageURLName: "hammer-curl.jpg",
    iconURLName: "hammer-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "EZ Bar Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fez-bar-curl.jpg?alt=media&token=eefa6b09-2fbe-4d03-89da-e5877ca96633&_gl=1*iiuccl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgwOTkxLjQwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fez-bar-curl-256x256.png?alt=media&token=239011ae-8c38-4b54-8481-ab7023420252&_gl=1*1tgisdm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMDAzLjI4LjAuMA..",
    imageURLName: "ez-bar-curl.jpg",
    iconURLName: "ez-bar-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Preacher Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpreacher-curl.jpg?alt=media&token=61d03021-e315-408c-9150-ab1d2852debc&_gl=1*77tsod*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMDMwLjEuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpreacher-curl-256x256.png?alt=media&token=945a4eef-4127-49f7-991b-58d5edbc309f&_gl=1*1j45pjj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMDU2LjM2LjAuMA..",
    imageURLName: "preacher-curl.jpg",
    iconURLName: "preacher-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Cable Bicep Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-bicep-curl.jpg?alt=media&token=02d12f91-3aa0-4e33-80c3-1623ca6f7b28&_gl=1*jciysb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMDg2LjYuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-bicep-curl-256x256.png?alt=media&token=e55dc92f-55bb-4840-afd4-5b52ee97aba7&_gl=1*1nj5vcb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMDk4LjYwLjAuMA..",
    imageURLName: "cable-bicep-curl.jpg",
    iconURLName: "cable-bicep-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Dumbbell Concentration Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-concentration-curl.jpg?alt=media&token=26d0415c-27c9-4086-aa90-298cde66dd67&_gl=1*1xjzzi2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMTM0LjI0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-concentration-curl-256x256.png?alt=media&token=08082c95-deb7-456e-b258-8cdf1aaac836&_gl=1*lc8ynu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMTU2LjIuMC4w",
    imageURLName: "dumbbell-concentration-curl.jpg",
    iconURLName: "dumbbell-concentration-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Incline Dumbbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-dumbbell-curl.jpg?alt=media&token=49f39f4f-a159-46cf-9f85-d76e256c9a02&_gl=1*17vly6p*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMTkxLjM0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-dumbbell-curl-256x256.png?alt=media&token=40e58c7b-81e5-47df-b94e-6fb7862355c5&_gl=1*1c7xck7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMjA4LjE3LjAuMA..",
    imageURLName: "incline-dumbbell-curl.jpg",
    iconURLName: "incline-dumbbell-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Machine Bicep Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-bicep-curl.jpg?alt=media&token=1634b3b4-9ad5-46db-9095-9546f82721bc&_gl=1*i73hxd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMjUzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-bicep-curl-256x256.png?alt=media&token=9973f6e6-7409-447a-b1dc-addc54466cc0&_gl=1*rwpuwz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMjc0LjM5LjAuMA..",
    imageURLName: "machine-bicep-curl.jpg",
    iconURLName: "machine-bicep-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "One Arm Cable Bicep Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-cable-bicep-curl.jpg?alt=media&token=84cb2540-5e45-4bc9-8494-2a6463e6ec7e&_gl=1*1a90zud*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMzA1LjguMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-cable-bicep-curl-256x256.png?alt=media&token=3e091f32-7eb4-4332-8646-c08884a27e1f&_gl=1*1y4l3ej*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMzE1LjU5LjAuMA..",
    imageURLName: "one-arm-cable-bicep-curl.jpg",
    iconURLName: "one-arm-cable-bicep-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Strict Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstrict-curl.jpg?alt=media&token=4f67c5f3-808f-4081-b098-a97b4c34a496&_gl=1*1n3935p*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMzQ1LjI5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstrict-curl-256x256.png?alt=media&token=e62d2d10-ca79-47b6-a74d-457593f7c551&_gl=1*1nrls4o*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMzU1LjE5LjAuMA..",
    imageURLName: "strict-curl.jpg",
    iconURLName: "strict-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "One Arm Dumbbell Preacher Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-dumbbell-preacher-curl.jpg?alt=media&token=b65d385b-f19e-4efe-b536-e8e8a1bd251b&_gl=1*1u07xqw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMzg2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-dumbbell-preacher-curl-256x256.png?alt=media&token=68d4facc-8151-4ae7-9602-8309819b0542&_gl=1*11a5mne*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxMzk3LjQ5LjAuMA..",
    imageURLName: "one-arm-dumbbell-preacher-curl.jpg",
    iconURLName: "one-arm-dumbbell-preacher-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Incline Hammer Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-hammer-curl.jpg?alt=media&token=8f2b4e7c-f7c0-40c0-b906-08560ed5531b&_gl=1*71ttea*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNDM3LjkuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-hammer-curl-256x256.png?alt=media&token=71be7864-6253-4d68-8cc4-854b80d92fcd&_gl=1*pwsmw9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNDUzLjYwLjAuMA..",
    imageURLName: "incline-hammer-curl.jpg",
    iconURLName: "incline-hammer-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Spider Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fspider-curl.jpg?alt=media&token=361a950f-0450-4b2c-8d97-a0c420484fef&_gl=1*1ong49a*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNDg4LjI1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fspider-curl-256x256.png?alt=media&token=73d14191-5634-4b8b-aa6d-aac19803256a&_gl=1*pegtkn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNTAzLjEwLjAuMA..",
    imageURLName: "spider-curl.jpg",
    iconURLName: "spider-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Zottman Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fzottman-curl.jpg?alt=media&token=74084b5f-2e5f-4b0f-a439-2c5beee4aab6&_gl=1*dpvc1o*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNTYyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fzottman-curl-256x256.png?alt=media&token=bb509836-262d-4f6a-9dcb-507edb2db642&_gl=1*1tmjzjl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNTc0LjQ4LjAuMA..",
    imageURLName: "zottman-curl.jpg",
    iconURLName: "zottman-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Seated Dumbbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dumbbell-curl.jpg?alt=media&token=62d4475d-c460-4061-aa95-65ae54fdc45b&_gl=1*mu0zu0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNjA4LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dumbbell-curl-256x256.png?alt=media&token=1a6b73de-c8bc-4c66-9974-6449e361a6b1&_gl=1*1vx89lj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNjI5LjYwLjAuMA..",
    imageURLName: "seated-dumbbell-curl.jpg",
    iconURLName: "seated-dumbbell-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Cheat Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcheat-curl.jpg?alt=media&token=18890581-1335-466a-b47a-d9c1741ec7a4&_gl=1*257b73*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNzIwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcheat-curl-256x256.png?alt=media&token=ea3351df-9d5a-48a6-a6d0-a40edf70cadb&_gl=1*1jxhdrp*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNzMzLjQ3LjAuMA..",
    imageURLName: "cheat-curl.jpg",
    iconURLName: "cheat-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Cable Hammer Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-hammer-curl.jpg?alt=media&token=6d67e651-4b70-42c0-a264-bdcd7df23af1&_gl=1*138wg0k*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNzcyLjguMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-hammer-curl-256x256.png?alt=media&token=16f5658f-9249-4482-b31d-7696b24247f0&_gl=1*1i6af3n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxNzg3LjYwLjAuMA..",
    imageURLName: "cable-hammer-curl.jpg",
    iconURLName: "cable-hammer-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "One Arm Pulldown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-pulldown.jpg?alt=media&token=8acb76f7-def6-456d-8754-d705fcc6e844&_gl=1*1f440sn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxODcyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-pulldown-256x256.png?alt=media&token=8e009923-e58f-4a6e-a02f-0aadd60b6754&_gl=1*155f3gs*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxODgyLjUwLjAuMA..",
    imageURLName: "one-arm-pulldown.jpg",
    iconURLName: "one-arm-pulldown-256x256.png",
  },
  {
    category: "Biceps",
    name: "Overhead Cable Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Foverhead-cable-curl.jpg?alt=media&token=afdf0f2b-e082-4aa0-8fd0-17a35236542b&_gl=1*1hqwgls*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxOTEyLjIwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Foverhead-cable-curl-256x256.png?alt=media&token=5607262e-7267-46d4-9984-950796616b8b&_gl=1*1hi0xqa*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxOTIzLjkuMC4w",
    imageURLName: "overhead-cable-curl.jpg",
    iconURLName: "overhead-cable-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Incline Cable Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-cable-curl.jpg?alt=media&token=e6090616-e036-4845-b19e-47a0cefe2cc9&_gl=1*1xi83al*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxOTY0LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-cable-curl-256x256.png?alt=media&token=2b7f8853-a62c-4118-bb47-ad7658b0bb52&_gl=1*6n9k3j*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgxOTc2LjQ4LjAuMA..",
    imageURLName: "incline-cable-curl.jpg",
    iconURLName: "incline-cable-curl-256x256.png",
  },
  {
    category: "Biceps",
    name: "Lying Cable Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-cable-curl.jpg?alt=media&token=6fb1e65c-7e95-409f-a8b7-93b8c5a59897&_gl=1*1lu1tzq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMDM1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flying-cable-curl-256x256.png?alt=media&token=bde019d0-63b3-467e-9fcc-648d2b79a249&_gl=1*y9588c*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMDQ4LjQ3LjAuMA..",
    imageURLName: "lying-cable-curl.jpg",
    iconURLName: "lying-cable-curl-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Shoulder Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fshoulder-press.jpg?alt=media&token=dc3759bd-7470-4f83-8429-dd357c1bff3d&_gl=1*bnk7pa*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMTEyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fshoulder-press-256x256.png?alt=media&token=f04e3ec9-2beb-436a-b3fe-a1df09a9703a&_gl=1*18yir37*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMTM3LjM1LjAuMA..",
    imageURLName: "shoulder-press.jpg",
    iconURLName: "shoulder-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell Shoulder Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-shoulder-press.jpg?alt=media&token=29c49ee7-a0ff-420e-9e72-eddecc5354d3&_gl=1*16znwve*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMTc0LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-shoulder-press-256x256.png?alt=media&token=e0bb9c85-7eab-4cd3-a9b6-fbc50f582ef0&_gl=1*1vlp620*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMTg0LjUwLjAuMA..",
    imageURLName: "dumbbell-shoulder-press.jpg",
    iconURLName: "dumbbell-shoulder-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell Lateral Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-lateral-raise.jpg?alt=media&token=80a934a2-af5c-4b6a-b7c4-5c1da2a18a4f&_gl=1*t99vtb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMjE5LjE1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-lateral-raise-256x256.png?alt=media&token=a9b81ded-8bfe-427a-9b0d-5eec4ce09922&_gl=1*17re482*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMjMxLjMuMC4w",
    imageURLName: "dumbbell-lateral-raise.jpg",
    iconURLName: "dumbbell-lateral-raise-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Military Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmilitary-press.jpg?alt=media&token=db388d31-a035-496b-8ae3-4642d5e3b8a6&_gl=1*14wql28*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMjYxLjQwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmilitary-press-256x256.png?alt=media&token=00823603-3d7c-4fd4-a5bf-2468cf9c61c2&_gl=1*1fmvfmm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMjc0LjI3LjAuMA..",
    imageURLName: "military-press.jpg",
    iconURLName: "military-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Push Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpush-press.jpg?alt=media&token=8f90191f-1af2-4b96-bb65-bbd6edbdaefb&_gl=1*4awp2h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMjk5LjIuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpush-press-256x256.png?alt=media&token=1b3e071c-ea03-43d4-b50b-79546446a835&_gl=1*1wy10cj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMzExLjUwLjAuMA..",
    imageURLName: "push-press.jpg",
    iconURLName: "push-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Seated Shoulder Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-shoulder-press.jpg?alt=media&token=3d6177a8-4843-4d3f-8ee8-9846f32ff92d&_gl=1*wxo04b*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMzQ4LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-shoulder-press-256x256.png?alt=media&token=84b7d1d2-8885-4355-8d22-6d7770697f14&_gl=1*1wsdcb6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyMzU4LjMuMC4w",
    imageURLName: "seated-shoulder-press.jpg",
    iconURLName: "seated-shoulder-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Machine Shoulder Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-shoulder-press.jpg?alt=media&token=64ec0ac4-7035-4387-9428-288145dd9488&_gl=1*186xxzz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNDA4LjQ4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-shoulder-press-256x256.png?alt=media&token=19cb6576-58cb-4ca9-95ea-c7fbc65fe445&_gl=1*1g2ypv2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNDE3LjM5LjAuMA..",
    imageURLName: "machine-shoulder-press.jpg",
    iconURLName: "machine-shoulder-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Seated Dumbbell Shoulder Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dumbbell-shoulder-press.jpg?alt=media&token=e8399911-1428-4ca9-9d29-b788d8df64df&_gl=1*1gjsov1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNDQ5LjcuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-dumbbell-shoulder-press-256x256.png?alt=media&token=ba618cef-6e70-406e-b734-3c47a7cc2164&_gl=1*z1wwg9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNDU4LjYwLjAuMA..",
    imageURLName: "seated-dumbbell-shoulder-press.jpg",
    iconURLName: "seated-dumbbell-shoulder-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Upright Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fupright-row.jpg?alt=media&token=87dcc791-adc5-44fe-a319-203a3279641a&_gl=1*4t6yci*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNDg5LjI5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fupright-row-256x256.png?alt=media&token=d85260fe-0e66-4745-be94-0ec09ae70abe&_gl=1*1vg2utu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNTAxLjE3LjAuMA..",
    imageURLName: "upright-row.jpg",
    iconURLName: "upright-row-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell Front Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-front-raise.jpg?alt=media&token=84324bf4-f397-4ecd-8814-5460d20d64b2&_gl=1*u7qwe0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNTQ5LjI5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-front-raise-256x256.png?alt=media&token=24e13fb4-c5f3-455f-bb08-031b38355c31&_gl=1*520hb0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNTY0LjE0LjAuMA..",
    imageURLName: "dumbbell-front-raise.jpg",
    iconURLName: "dumbbell-front-raise-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Cable Lateral Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-lateral-raise.jpg?alt=media&token=3e15e0b0-bc94-42c2-b7ee-51e1bf21c43c&_gl=1*1e0xdha*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNjI3LjI3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-lateral-raise-256x256.png?alt=media&token=31147e2c-d222-47c4-9ce2-31e264ac1822&_gl=1*1f0i86j*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNjM3LjE3LjAuMA..",
    imageURLName: "cable-lateral-raise.jpg",
    iconURLName: "cable-lateral-raise-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Arnold Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Farnold-press.jpg?alt=media&token=b1cd3755-2644-4afb-81f4-540881c3558a&_gl=1*1iklpee*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNzA1LjE2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Farnold-press-256x256.png?alt=media&token=81b3a8a1-0db6-4a7f-90bc-f1cbce599729&_gl=1*jgninf*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNzE0LjcuMC4w",
    imageURLName: "arnold-press.jpg",
    iconURLName: "arnold-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Face Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fface-pull.jpg?alt=media&token=6f9b394e-189f-42df-bcde-0e96a270141a&_gl=1*1b2v123*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNzQwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fface-pull-256x256.png?alt=media&token=17c1feb8-9f34-4b9a-99ff-cb800d7370ac&_gl=1*we9s1s*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNzUxLjQ5LjAuMA..",
    imageURLName: "face-pull.jpg",
    iconURLName: "face-pull-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Neck Curl",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fneck-curl.jpg?alt=media&token=58a08085-5fba-467d-9d2e-d472be5f70aa&_gl=1*1oa4zo8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNzcyLjI4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fneck-curl-256x256.png?alt=media&token=7678a141-49ac-4b15-bbb8-534e9829d21c&_gl=1*tc6h5p*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyNzgzLjE3LjAuMA..",
    imageURLName: "neck-curl.jpg",
    iconURLName: "neck-curl-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell Upright Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-upright-row.jpg?alt=media&token=4cceb5f3-510f-4219-b9d4-0da44f7f3cd6&_gl=1*1jtguke*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyODEyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-upright-row-256x256.png?alt=media&token=ecd17d6d-9d75-4f0c-bf86-a4b50edc4764&_gl=1*1owsp5q*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyODMwLjQyLjAuMA..",
    imageURLName: "dumbbell-upright-row.jpg",
    iconURLName: "dumbbell-upright-row-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Behind The Neck Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbehind-the-neck-press.jpg?alt=media&token=d295c518-049f-4ebe-847f-bda5b59b4e9b&_gl=1*q32v26*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyODY3LjUuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbehind-the-neck-press-256x256.png?alt=media&token=7f199175-7333-43fa-8fab-88607abaa210&_gl=1*v5nx9j*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyODg2LjYwLjAuMA..",
    imageURLName: "behind-the-neck-press.jpg",
    iconURLName: "behind-the-neck-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Barbell Front Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-front-raise.jpg?alt=media&token=ab402bd1-ee8f-4bcb-90ef-fc3cbb921811&_gl=1*xhxnza*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyOTE3LjI5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-front-raise-256x256.png?alt=media&token=245e6b0d-036d-4f4b-b4de-f039f6698079&_gl=1*k4lii2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyOTMwLjE2LjAuMA..",
    imageURLName: "barbell-front-raise.jpg",
    iconURLName: "barbell-front-raise-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Handstand Push Ups",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhandstand-push-ups.jpg?alt=media&token=5e12dc77-c132-42e7-abf5-fd42c5e957d0&_gl=1*1bgiuu8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgyOTk0LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhandstand-push-ups-256x256.png?alt=media&token=a67b878c-8ebe-45c7-ab35-ec2c10ee23cf&_gl=1*h9nflx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMDA0LjUwLjAuMA..",
    imageURLName: "handstand-push-ups.jpg",
    iconURLName: "handstand-push-ups-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Machine Lateral Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-lateral-raise.jpg?alt=media&token=0bd5eaef-d333-4341-87c4-3fce4ed4c7b7&_gl=1*18nh0dq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMDQ1LjkuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-lateral-raise-256x256.png?alt=media&token=aa936e7a-b8b9-43cd-b8f7-368813160a25&_gl=1*1182c8m*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMDUyLjIuMC4w",
    imageURLName: "machine-lateral-raise.jpg",
    iconURLName: "machine-lateral-raise-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Log Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flog-press.jpg?alt=media&token=15ce0847-ecf5-4e07-95cc-00fa6f5cc91e&_gl=1*luj474*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMDc3LjQ1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flog-press-256x256.png?alt=media&token=ee4805ca-33aa-4b21-b48d-81e6025d6a82&_gl=1*htr22h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMTE3LjUuMC4w",
    imageURLName: "log-press.jpg",
    iconURLName: "log-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Landmine Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flandmine-press.jpg?alt=media&token=1a0dd08b-f9ca-4543-b740-286076686d73&_gl=1*2x05wu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMTUyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flandmine-press-256x256.png?alt=media&token=ab7a043e-c2c8-42e3-8ed5-a8565d87cae4&_gl=1*1u7szw6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMTY0LjQ4LjAuMA..",
    imageURLName: "landmine-press.jpg",
    iconURLName: "landmine-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Neck Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fneck-extension.jpg?alt=media&token=53a46cd4-c556-4b88-8c98-77cade9e52dc&_gl=1*1lp3fm9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMTk5LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fneck-extension-256x256.png?alt=media&token=131d0961-2169-4c1c-bfa2-a402a51a1b81&_gl=1*1v24y00*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMjA4LjQuMC4w",
    imageURLName: "neck-extension.jpg",
    iconURLName: "neck-extension-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Z Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fz-press.jpg?alt=media&token=6aef794e-9244-4948-b9f0-fef8500f60d6&_gl=1*jhcgoo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMjQ0LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fz-press-256x256.png?alt=media&token=a051de3b-dea3-458b-88a3-f689809c01f2&_gl=1*vwfwb6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMjU3LjQ3LjAuMA..",
    imageURLName: "z-press.jpg",
    iconURLName: "z-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Viking Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fviking-press.jpg?alt=media&token=cecde5dc-a81d-40e7-925e-313290941c1f&_gl=1*1bbuq6s*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMjgyLjIyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fviking-press-256x256.png?alt=media&token=641d01c7-7fc8-45a2-a94f-ece7b82fea84&_gl=1*1q7pw24*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMjk3LjcuMC4w",
    imageURLName: "viking-press.jpg",
    iconURLName: "viking-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Shoulder Pin Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fshoulder-pin-press.jpg?alt=media&token=38c00d0f-1baa-4133-833e-f76ae1f28635&_gl=1*11dmrwr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMzM5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fshoulder-pin-press-256x256.png?alt=media&token=46183944-9147-4a77-8ec1-fe816f24b8a3&_gl=1*1lxml8k*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMzQ5LjUwLjAuMA..",
    imageURLName: "shoulder-pin-press.jpg",
    iconURLName: "shoulder-pin-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell Z Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-z-press.jpg?alt=media&token=8fef0cc2-2ba2-45f3-a767-4c6210a5a109&_gl=1*1a00ai7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMzc4LjIxLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-z-press-256x256.png?alt=media&token=a2d00f86-6f37-46bb-96c1-235086d2b034&_gl=1*1a7wvee*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzMzg3LjEyLjAuMA..",
    imageURLName: "dumbbell-z-press.jpg",
    iconURLName: "dumbbell-z-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell External Rotation",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-external-rotation.jpg?alt=media&token=0be82529-46b8-412b-a943-a51faeb31565&_gl=1*h24l6v*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNDI1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-external-rotation-256x256.png?alt=media&token=2c7c3702-88a1-46d2-bcbd-60ca777a9cb4&_gl=1*y1g4br*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNDM2LjQ5LjAuMA..",
    imageURLName: "dumbbell-external-rotation.jpg",
    iconURLName: "dumbbell-external-rotation-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell Push Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-push-press.jpg?alt=media&token=c8e51a6a-a875-4534-8785-9d0051da7dc2&_gl=1*mbt1jf*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNDcxLjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-push-press-256x256.png?alt=media&token=39d1e47f-83cb-4405-9ade-6e7468a35f55&_gl=1*az43mz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNDgwLjUuMC4w",
    imageURLName: "dumbbell-push-press.jpg",
    iconURLName: "dumbbell-push-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "One Arm Landmine Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-landmine-press.jpg?alt=media&token=5751c3d4-195c-4b80-8a18-1133e9433f32&_gl=1*ahkm6f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNTMxLjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-landmine-press-256x256.png?alt=media&token=52f13d4e-1fda-45ac-8deb-8f320ced575f&_gl=1*8i2smq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNTQxLjguMC4w",
    imageURLName: "one-arm-landmine-press.jpg",
    iconURLName: "one-arm-landmine-press-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Dumbbell Face Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-face-pull.jpg?alt=media&token=dcaab406-6ab7-496d-b0af-3e656a62cb1b&_gl=1*10z0dl4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNTgzLjM2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-face-pull-256x256.png?alt=media&token=98970a20-2d95-4415-88f9-ccae3d71e1d2&_gl=1*6nsm3b*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNTk0LjI1LjAuMA..",
    imageURLName: "dumbbell-face-pull.jpg",
    iconURLName: "dumbbell-face-pull-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Pike Push Up",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpike-push-up.jpg?alt=media&token=ef5337fa-3a63-4dfd-8fe9-42c321d6943b&_gl=1*eum8wy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNjI4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpike-push-up-256x256.png?alt=media&token=c8abc13c-834b-4375-88ee-d7425ed0ca80&_gl=1*50aceh*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNjM5LjQ5LjAuMA..",
    imageURLName: "pike-push-up.jpg",
    iconURLName: "pike-push-up-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Cable External Rotation",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-external-rotation.jpg?alt=media&token=4d4af348-abb6-4b46-aaa2-cdf4d5ea620a&_gl=1*wcnwo6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNjY4LjIwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-external-rotation-256x256.png?alt=media&token=ec587d0e-d5ef-4140-a818-6e9ceb0d440a&_gl=1*sfub8n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODg4MDc2OC4xMjEuMS4xNjk4ODgzNjgwLjguMC4w",
    imageURLName: "cable-external-rotation.jpg",
    iconURLName: "cable-external-rotation-256x256.png",
  },
  {
    category: "Chest",
    name: "Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-press.jpg?alt=media&token=a2fa64e0-5f96-4c24-8790-e8afa115609a&_gl=1*x7mjuz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzMDQxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-press-256x256.png?alt=media&token=2a34eed6-47ef-4728-9732-a3a7f0428f12&_gl=1*i7jchs*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzMDk1LjYuMC4w",
    imageURLName: "bench-press.jpg",
    iconURLName: "bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Dumbbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-bench-press.jpg?alt=media&token=0fa43c5b-f847-4a9c-9710-051cab6d7145&_gl=1*s65r3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzMTg4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-bench-press-256x256.png?alt=media&token=d71f91bd-3e71-423c-951d-4eef842cceca&_gl=1*9uu1z8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzMjA2LjQyLjAuMA..",
    imageURLName: "dumbbell-bench-press.jpg",
    iconURLName: "dumbbell-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Push Ups",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpush-ups.jpg?alt=media&token=cf6ad7fe-c6d5-49ea-8824-45b70f1f048a&_gl=1*u2fnzm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzMzgyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpush-ups-256x256.png?alt=media&token=79498891-308b-4178-aa40-7c861ab0fbb1&_gl=1*5vjzzk*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzMzk4LjQ0LjAuMA..",
    imageURLName: "push-ups.jpg",
    iconURLName: "push-ups-256x256.png",
  },
  {
    category: "Chest",
    name: "Incline Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-bench-press.jpg?alt=media&token=2e3bbfa1-9f28-4a5b-90e6-6bb946d219fd&_gl=1*j22vbp*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNDMxLjExLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-bench-press-256x256.png?alt=media&token=d6d5e882-04d0-474e-9fe2-feccc97b6faf&_gl=1*7ju0bt*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNDUwLjYwLjAuMA..",
    imageURLName: "incline-bench-press.jpg",
    iconURLName: "incline-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Incline Dumbbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-dumbbell-bench-press.jpg?alt=media&token=25b25b0f-aa63-4fff-8d8f-901b177963c5&_gl=1*9o5yzn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNDg0LjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-dumbbell-bench-press-256x256.png?alt=media&token=12aa13ea-159e-436c-89a6-c8d24c2d70e0&_gl=1*f4a7oa*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNDk2LjE0LjAuMA..",
    imageURLName: "incline-dumbbell-bench-press.jpg",
    iconURLName: "incline-dumbbell-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Chest Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fchest-press.jpg?alt=media&token=cedc7957-3675-4082-8bbc-cbd3fa43fb03&_gl=1*qrpn57*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNTMwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fchest-press-256x256.png?alt=media&token=97cad342-a9f9-441b-92f9-e6598f20a9c7&_gl=1*1xucvcb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNTQzLjQ3LjAuMA..",
    imageURLName: "chest-press.jpg",
    iconURLName: "chest-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Close Grip Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-bench-press.jpg?alt=media&token=e9e33220-934b-4899-aed5-a2d10d1e9452&_gl=1*cg3fiz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNTc4LjEyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-bench-press-256x256.png?alt=media&token=efecf18d-4756-42d1-93bf-54d6819ed9d6&_gl=1*1t32n7g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNTkwLjYwLjAuMA..",
    imageURLName: "close-grip-bench-press.jpg",
    iconURLName: "close-grip-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Decline Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-bench-press.jpg?alt=media&token=7dfaa57d-2d5b-496d-9779-5ef9d1ed59a5&_gl=1*12nm8l0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNjE5LjMxLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-bench-press-256x256.png?alt=media&token=0f062136-5223-4bcb-9ea1-290b8f162d65&_gl=1*uhplyq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNjMzLjE3LjAuMA..",
    imageURLName: "decline-bench-press.jpg",
    iconURLName: "decline-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Machine Chest Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-chest-fly.jpg?alt=media&token=6ef979ca-d9e3-4228-a982-10157f7a9bf8&_gl=1*4ygmna*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNjYyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-chest-fly-256x256.png?alt=media&token=7f0a14c8-99b6-45a8-a7e5-f54e66a830f2&_gl=1*vmqpl3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNjcyLjUwLjAuMA..",
    imageURLName: "machine-chest-fly.jpg",
    iconURLName: "machine-chest-fly-256x256.png",
  },
  {
    category: "Chest",
    name: "Dumbbell Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-fly.jpg?alt=media&token=713238c1-b9c4-4c1f-834a-b6fee951c08c&_gl=1*1lh6pai*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNzA0LjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-fly-256x256.png?alt=media&token=e0383101-5867-4cad-9e38-6ee3db7243ba&_gl=1*4y47kv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkxMjQ3Mi4xMjIuMS4xNjk4OTEzNzE4LjQuMC4w",
    imageURLName: "dumbbell-fly.jpg",
    iconURLName: "dumbbell-fly-256x256.png",
  },
  {
    category: "Chest",
    name: "Smith Machine Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsmith-machine-bench-press.jpg?alt=media&token=42ae6125-c02b-4ba9-9de0-68a62a728add&_gl=1*1ufegow*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzNTE1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsmith-machine-bench-press-256x256.png?alt=media&token=435ccc3d-f27a-4b67-a170-553a49dec1ea&_gl=1*csczzu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzNTY4LjcuMC4w",
    imageURLName: "smith-machine-bench-press.jpg",
    iconURLName: "smith-machine-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Cable Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-fly.jpg?alt=media&token=7653472c-b088-40cc-8a66-7d5cf106d1d9&_gl=1*1g9jdpl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzNTk0LjQzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-fly-256x256.png?alt=media&token=cb5dbee9-25cc-434d-b9cb-b31b05c65f11&_gl=1*cpfi8g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzNjExLjI2LjAuMA..",
    imageURLName: "cable-fly.jpg",
    iconURLName: "cable-fly-256x256.png",
  },
  {
    category: "Chest",
    name: "Barbell Floor Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffloor-press.jpg?alt=media&token=e96760b7-bc49-41e1-be72-40faf76cbdc2&_gl=1*1tnzf0g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzNzgxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ffloor-press-256x256.png?alt=media&token=0c6343da-218a-4d01-bbda-6cd9827054cf&_gl=1*b5bh33*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzODE2LjI1LjAuMA..",
    imageURLName: "floor-press.jpg",
    iconURLName: "floor-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Incline Dumbbell Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-dumbbell-fly.jpg?alt=media&token=0a8e063d-f6c8-4eea-8ac3-c84042899202&_gl=1*tb0p06*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzODYxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-dumbbell-fly-256x256.png?alt=media&token=325e289a-12bb-474f-9159-854fe34be8ce&_gl=1*1kvdr2t*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzODc3LjQ0LjAuMA..",
    imageURLName: "incline-dumbbell-fly.jpg",
    iconURLName: "incline-dumbbell-fly-256x256.png",
  },
  {
    category: "Chest",
    name: "Dumbbell Floor Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-floor-press.jpg?alt=media&token=08386d40-4436-48e2-8499-220f95fd671f&_gl=1*12kqshw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzOTEwLjExLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-floor-press-256x256.png?alt=media&token=49d2a8e4-60ae-4fe9-99fa-3006341a17cb&_gl=1*rxgwa3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzOTIxLjYwLjAuMA..",
    imageURLName: "dumbbell-floor-press.jpg",
    iconURLName: "dumbbell-floor-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Decline Dumbbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-dumbbell-bench-press.jpg?alt=media&token=318b065c-feec-45f9-850c-1b47ae52ec05&_gl=1*1kt01y6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTIzOTc4LjMuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-dumbbell-bench-press-256x256.png?alt=media&token=f90914c6-e70a-49d3-a4a1-e91e3361c504&_gl=1*17hs2hj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MDAwLjYwLjAuMA..",
    imageURLName: "decline-dumbbell-bench-press.jpg",
    iconURLName: "decline-dumbbell-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Paused Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpaused-bench-press.jpg?alt=media&token=9a69a83d-e015-485a-9eea-e3bcd22ed1ab&_gl=1*1pidpt7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MDQ2LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpaused-bench-press-256x256.png?alt=media&token=9daf6607-f4bb-4631-bde4-ba67b39f020d&_gl=1*1vp2ubj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MDU4LjIuMC4w",
    imageURLName: "paused-bench-press.jpg",
    iconURLName: "paused-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Reverse Grip Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-grip-bench-press.jpg?alt=media&token=b3dc09b9-ecd4-4023-8b74-0e28d1033f8f&_gl=1*1qez480*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MDk0LjM4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-grip-bench-press-256x256.png?alt=media&token=0f5b652a-09fb-46bc-84c3-a27ec9196d9d&_gl=1*8cyqum*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MTA2LjI2LjAuMA..",
    imageURLName: "reverse-grip-bench-press.jpg",
    iconURLName: "reverse-grip-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "One Arm Push Ups",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-push-ups.jpg?alt=media&token=c9717214-8374-47e0-bbd9-3f8c5047a154&_gl=1*6ajvvr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MTQ3LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-push-ups-256x256.png?alt=media&token=95039687-0e71-4ca1-a583-13c4cfa470eb&_gl=1*1epwhgo*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MTYzLjQ0LjAuMA..",
    imageURLName: "one-arm-push-ups.jpg",
    iconURLName: "one-arm-push-ups-256x256.png",
  },
  {
    category: "Chest",
    name: "Close Grip Dumbbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-dumbbell-bench-press.jpg?alt=media&token=d4a6b289-ca8f-4593-899d-adb02432ce62&_gl=1*1jxwutq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MTk5LjguMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-dumbbell-bench-press-256x256.png?alt=media&token=c7aab80c-7194-4e82-836b-a242a200f20b&_gl=1*jk52ow*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MjA4LjYwLjAuMA..",
    imageURLName: "close-grip-dumbbell-bench-press.jpg",
    iconURLName: "close-grip-dumbbell-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Diamond Push Ups",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdiamond-push-ups.jpg?alt=media&token=d480727e-9a26-48ff-9c67-14763fd3fe91&_gl=1*d28qp3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MjQwLjI4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdiamond-push-ups-256x256.png?alt=media&token=b13a2664-54c8-486e-8878-ce2e8470d354&_gl=1*1p8vjvi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MjY4LjYwLjAuMA..",
    imageURLName: "diamond-push-ups.jpg",
    iconURLName: "diamond-push-ups-256x256.png",
  },
  {
    category: "Chest",
    name: "Bench Pin Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-pin-press.jpg?alt=media&token=c4647330-e248-42b9-b709-0fd2b92241b5&_gl=1*1si443f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MzA2LjIyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-pin-press-256x256.png?alt=media&token=b2389037-dd0f-4bf5-9c39-05001046d361&_gl=1*acvkfi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MzIwLjguMC4w",
    imageURLName: "bench-pin-press.jpg",
    iconURLName: "bench-pin-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Wide Grip Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwide-grip-bench-press.jpg?alt=media&token=edb501d4-e9ea-4124-820c-4cb000c40d20&_gl=1*g35pmw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MzU5LjM1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwide-grip-bench-press-256x256.png?alt=media&token=2102206f-ad5f-4806-bf17-7bd64c686846&_gl=1*12s92uq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0MzczLjIxLjAuMA..",
    imageURLName: "wide-grip-bench-press.jpg",
    iconURLName: "wide-grip-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Decline Push Up",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-push-up.jpg?alt=media&token=dcefb689-e9b0-4874-b880-dadbe1b3c003&_gl=1*3rdt40*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0NDA1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-push-up-256x256.png?alt=media&token=0bf8c7cd-d4dc-4671-93a5-d62621c63312&_gl=1*1t1qwep*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0NDE3LjQ4LjAuMA..",
    imageURLName: "decline-push-up.jpg",
    iconURLName: "decline-push-up-256x256.png",
  },
  {
    category: "Chest",
    name: "Close Grip Incline Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-incline-bench-press.jpg?alt=media&token=6bc3b8fd-c427-4d13-9b8a-b4097fd1c6a6&_gl=1*1fxlu9g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0NDQ3LjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-incline-bench-press-256x256.png?alt=media&token=35b0bac4-7de6-4fcf-9df7-31d3f90f85b4&_gl=1*1ykm71n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0NDYwLjUuMC4w",
    imageURLName: "close-grip-incline-bench-press.jpg",
    iconURLName: "close-grip-incline-bench-press-256x256.png",
  },
  {
    category: "Chest",
    name: "Close Grip Push Up",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-push-up.jpg?alt=media&token=445be38f-7aea-45dd-a0a9-5c7505b21ced&_gl=1*1a4mt0d*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0ODkxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-push-up-256x256.png?alt=media&token=a174d87a-e2a0-454c-b92e-ee7523c3bff7&_gl=1*bsg0e1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0OTA1LjQ2LjAuMA..",
    imageURLName: "close-grip-push-up.jpg",
    iconURLName: "close-grip-push-up-256x256.png",
  },
  {
    category: "Chest",
    name: "Incline Push Up",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-push-up.jpg?alt=media&token=d3e707da-05f0-4c5a-9413-6bdd3cef6814&_gl=1*1swb5ir*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0OTM4LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fincline-push-up-256x256.png?alt=media&token=bec1ec8e-6ad5-4a6d-ab5b-1a459ad82a9f&_gl=1*efipsy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI0OTgyLjQ4LjAuMA..",
    imageURLName: "incline-push-up.jpg",
    iconURLName: "incline-push-up-256x256.png",
  },
  {
    category: "Chest",
    name: "Archer Push Ups",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Farcher-push-ups.jpg?alt=media&token=e57316ac-5f11-4617-957d-234be37b9ef8&_gl=1*gf1fmr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1MDE0LjE2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Farcher-push-ups-256x256.png?alt=media&token=6846755a-0f64-4b37-acc4-3f33c139b9d3&_gl=1*to4aj5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1MDI2LjQuMC4w",
    imageURLName: "archer-push-ups.jpg",
    iconURLName: "archer-push-ups-256x256.png",
  },
  {
    category: "Chest",
    name: "Decline Dumbbell Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-dumbbell-fly.jpg?alt=media&token=cb448aa8-8e96-4cca-b3bc-136551410359&_gl=1*6yq3gb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1MDUzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdecline-dumbbell-fly-256x256.png?alt=media&token=d03b5943-820e-400b-964e-111f20ea06a4&_gl=1*22quq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1MDY5LjQ0LjAuMA..",
    imageURLName: "decline-dumbbell-fly.jpg",
    iconURLName: "decline-dumbbell-fly-256x256.png",
  },
  {
    category: "Chest",
    name: "Spoto Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fspoto-press.jpg?alt=media&token=020f4d54-19b4-496d-a25f-1f367b398f1f&_gl=1*1nidqrh*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1MDk1LjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fspoto-press-256x256.png?alt=media&token=3b346486-e7eb-46a1-a923-a46b518789e6&_gl=1*1527g5n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1MTE0LjYwLjAuMA..",
    imageURLName: "spoto-press.jpg",
    iconURLName: "spoto-press-256x256.png",
  },
  {
    category: "Back",
    name: "Pull Ups",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpull-ups.jpg?alt=media&token=91c3bd52-5a1d-47e3-9558-c9de020b1259&_gl=1*xa45f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1NTEzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpull-ups-256x256.png?alt=media&token=f922551e-ea0f-43e6-a7b4-04e47a5502ea&_gl=1*lknsra*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1NTI0LjQ5LjAuMA..",
    imageURLName: "pull-ups.jpg",
    iconURLName: "pull-ups-256x256.png",
  },
  {
    category: "Back",
    name: "Bent Over Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbent-over-row.jpg?alt=media&token=1190a689-9906-499d-b1cb-e88bf5cdc50f&_gl=1*1djw9b3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1NTU4LjE1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbent-over-row-256x256.png?alt=media&token=7abb2efa-e50a-4ac8-bca6-9a91e32450ad&_gl=1*1klllnx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1NjU1LjYwLjAuMA..",
    imageURLName: "bent-over-row.jpg",
    iconURLName: "bent-over-row-256x256.png",
  },
  {
    category: "Back",
    name: "Lat Pulldown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flat-pulldown.jpg?alt=media&token=b94404b3-b39a-4f20-96ab-bfe7eb4efda5&_gl=1*8bzwoa*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1Njc3LjM4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Flat-pulldown-256x256.png?alt=media&token=49a3e6da-373f-411f-9595-5980626d3b4b&_gl=1*5as93o*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1NjkwLjI1LjAuMA..",
    imageURLName: "lat-pulldown.jpg",
    iconURLName: "lat-pulldown-256x256.png",
  },
  {
    category: "Back",
    name: "Chin Ups",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fchin-ups.jpg?alt=media&token=5df42d46-8bcf-4937-805e-7f7635bdccfa&_gl=1*38sliz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1NzIyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fchin-ups-256x256.png?alt=media&token=e623e172-f88d-44dc-9257-4376b7e27a74&_gl=1*297a7i*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1NzMyLjUwLjAuMA..",
    imageURLName: "chin-ups.jpg",
    iconURLName: "chin-ups-256x256.png",
  },
  {
    category: "Back",
    name: "Dumbbell Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-row.jpg?alt=media&token=c58d7028-5000-4b57-9880-e77379eb21ec&_gl=1*h5f6yk*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1Nzg2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-row-256x256.png?alt=media&token=4ae4dd25-a843-4db3-b57c-3310c2448d0a&_gl=1*121o0yr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1ODA1LjQxLjAuMA..",
    imageURLName: "dumbbell-row.jpg",
    iconURLName: "dumbbell-row-256x256.png",
  },
  {
    category: "Back",
    name: "Seated Cable Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-cable-row.jpg?alt=media&token=bb2de010-5dcd-4395-89a0-ddc2708c7631&_gl=1*1d9el3b*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1ODI4LjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fseated-cable-row-256x256.png?alt=media&token=ac76ca42-8877-49c1-9f6d-aa31fa040c65&_gl=1*1qoimzs*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1ODQwLjYuMC4w",
    imageURLName: "seated-cable-row.jpg",
    iconURLName: "seated-cable-row-256x256.png",
  },
  {
    category: "Back",
    name: "Barbell Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-shrug.jpg?alt=media&token=a9c5f90c-b5ed-42a3-b868-0ba3a368cb41&_gl=1*8k1spe*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1ODcwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-shrug-256x256.png?alt=media&token=ad8fa39c-41f9-4a36-970b-e8dfbd1fee1b&_gl=1*1ib1sqx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1ODgxLjQ5LjAuMA..",
    imageURLName: "barbell-shrug.jpg",
    iconURLName: "barbell-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "T-Bar Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ft-bar-row.jpg?alt=media&token=929f6b10-ce85-4c92-bb9b-0bce46ddae34&_gl=1*m1tx2f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1OTEyLjE4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Ft-bar-row-256x256.png?alt=media&token=6152b185-a158-44a7-98da-6b9c6eb7aed6&_gl=1*fd90x6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkyMzQ0NC4xMjMuMS4xNjk4OTI1OTI5LjEuMC4w",
    imageURLName: "t-bar-row.jpg",
    iconURLName: "t-bar-row-256x256.png",
  },
  {
    category: "Back",
    name: "Dumbbell Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-shrug.jpg?alt=media&token=47b2ba3e-ed13-4639-b4b7-ef89b518ed19&_gl=1*1x65sl8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2MzM0LjM5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-shrug-256x256.png?alt=media&token=a01bbab1-dd9d-4138-bc4b-0e55149900d8&_gl=1*s3sgjk*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2MzQ3LjI2LjAuMA..",
    imageURLName: "dumbbell-shrug.jpg",
    iconURLName: "dumbbell-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "Pendlay Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpendlay-row.jpg?alt=media&token=b876f656-8837-4e23-8889-ec84d47915f1&_gl=1*16tzy9y*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2Mzg5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpendlay-row-256x256.png?alt=media&token=57a39ecb-a9ed-458a-aa6b-db0e75044f29&_gl=1*1bbyspx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2Mzk5LjUwLjAuMA..",
    imageURLName: "pendlay-row.jpg",
    iconURLName: "pendlay-row-256x256.png",
  },
  {
    category: "Back",
    name: "Machine Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-row.jpg?alt=media&token=d5d90d98-8fd6-41dc-9cf0-18bfdd040638&_gl=1*nztw8d*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NDM2LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-row-256x256.png?alt=media&token=0fb9f987-6d6e-41ad-a7ff-07c56b61399d&_gl=1*31q16l*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NDQ0LjUuMC4w",
    imageURLName: "machine-row.jpg",
    iconURLName: "machine-row-256x256.png",
  },
  {
    category: "Back",
    name: "Dumbbell Pullover",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-pullover.jpg?alt=media&token=f8d0c6de-ea99-4890-91d8-f3a897b58792&_gl=1*1xjd1j7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NDc3LjM0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-pullover-256x256.png?alt=media&token=d6e4bca0-a806-4b0b-8afa-67050056e9b4&_gl=1*1o0sajx*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NDkwLjIxLjAuMA..",
    imageURLName: "dumbbell-pullover.jpg",
    iconURLName: "dumbbell-pullover-256x256.png",
  },
  {
    category: "Back",
    name: "Dumbbell Reverse Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-reverse-fly.jpg?alt=media&token=28d25e7e-ff8d-4a80-adfb-07879ca01f08&_gl=1*13dcs7n*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NTQyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-reverse-fly-256x256.png?alt=media&token=c01a6913-b884-4705-9f12-b36dcf7767fd&_gl=1*1k3mik3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NTUzLjQ5LjAuMA..",
    imageURLName: "dumbbell-reverse-fly.jpg",
    iconURLName: "dumbbell-reverse-fly-256x256.png",
  },
  {
    category: "Back",
    name: "Chest Supported Dumbbell Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fchest-supported-dumbbell-row.jpg?alt=media&token=b0ecf165-1db5-42e7-ada8-ccf1cb5fa9fe&_gl=1*1x6xgl5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NTgyLjIwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fchest-supported-dumbbell-row-256x256.png?alt=media&token=a787d006-2d30-4d16-8fb3-3226ed269fac&_gl=1*1kiydou*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NTkxLjExLjAuMA..",
    imageURLName: "chest-supported-dumbbell-row.jpg",
    iconURLName: "chest-supported-dumbbell-row-256x256.png",
  },
  {
    category: "Back",
    name: "Close Grip Lat Pulldown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-lat-pulldown.jpg?alt=media&token=017cf61a-f6f3-48e3-92e1-9c9f1c325554&_gl=1*yhu3oy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NjIwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclose-grip-lat-pulldown-256x256.png?alt=media&token=e1354b0b-1aec-4858-bb52-d7139d5427f1&_gl=1*zg5orr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NjMwLjUwLjAuMA..",
    imageURLName: "close-grip-lat-pulldown.jpg",
    iconURLName: "close-grip-lat-pulldown-256x256.png",
  },
  {
    category: "Back",
    name: "Machine Reverse Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-reverse-fly.jpg?alt=media&token=ad8b028a-9a6a-49ee-b9cf-6d43d3b9ce2f&_gl=1*z9gc1p*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NjU5LjIxLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-reverse-fly-256x256.png?alt=media&token=1b8e14e2-67aa-4379-803a-0fe868d37c4a&_gl=1*m5u8ny*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NjY5LjExLjAuMA..",
    imageURLName: "machine-reverse-fly.jpg",
    iconURLName: "machine-reverse-fly-256x256.png",
  },
  {
    category: "Back",
    name: "Reverse Grip Lat Pulldown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-grip-lat-pulldown.jpg?alt=media&token=13df27f9-c116-403c-83b1-ef4acc9c542e&_gl=1*18red4f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NzA0LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-grip-lat-pulldown-256x256.png?alt=media&token=bcd6a752-3283-40c5-b825-cfbedcc825e3&_gl=1*195qsfu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NzE0LjUwLjAuMA..",
    imageURLName: "reverse-grip-lat-pulldown.jpg",
    iconURLName: "reverse-grip-lat-pulldown-256x256.png",
  },
  {
    category: "Back",
    name: "Straight Arm Pulldown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstraight-arm-pulldown.jpg?alt=media&token=a36cef0b-ccb7-4743-acc6-7912b38ccfe5&_gl=1*37q2ok*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NzYwLjQuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstraight-arm-pulldown-256x256.png?alt=media&token=a4ba3802-59cb-4816-add3-e2c8affe1210&_gl=1*1vecxw0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2NzcwLjYwLjAuMA..",
    imageURLName: "straight-arm-pulldown.jpg",
    iconURLName: "straight-arm-pulldown-256x256.png",
  },
  {
    category: "Back",
    name: "Cable Reverse Fly",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-reverse-fly.jpg?alt=media&token=0daf6d4f-2a69-4949-a801-028e50325c2e&_gl=1*1kk3hw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2OTU2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-reverse-fly-256x256.png?alt=media&token=7aaffa01-1725-4103-8bed-611ac83d3aee&_gl=1*12c8zce*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM2OTY2LjUwLjAuMA..",
    imageURLName: "cable-reverse-fly.jpg",
    iconURLName: "cable-reverse-fly-256x256.png",
  },
  {
    category: "Back",
    name: "Neutral Grip Pull Ups",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fneutral-grip-pull-ups.jpg?alt=media&token=499dd296-c066-4da4-908d-a8689b0b70ac&_gl=1*14byfr0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MDA4LjguMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fneutral-grip-pull-ups-256x256.png?alt=media&token=7fc9e2ed-414f-4e28-9906-8cd0aa0038b9&_gl=1*svzbqr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MDIyLjU5LjAuMA..",
    imageURLName: "neutral-grip-pull-ups.jpg",
    iconURLName: "neutral-grip-pull-ups-256x256.png",
  },
  {
    category: "Back",
    name: "Yates Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fyates-row.jpg?alt=media&token=fd521db5-24ef-4238-b1cf-9e03da06c49d&_gl=1*1k3cexl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MDc1LjYuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fyates-row-256x256.png?alt=media&token=ccb295bb-4cf4-45d2-84b4-a3dcee04ba14&_gl=1*mqy6pb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MDg4LjYwLjAuMA..",
    imageURLName: "yates-row.jpg",
    iconURLName: "yates-row-256x256.png",
  },
  {
    category: "Back",
    name: "Bench Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-pull.jpg?alt=media&token=437c8529-b832-4887-a409-0ea68d9fc2b6&_gl=1*i8ruws*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MTcxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbench-pull-256x256.png?alt=media&token=d15f180b-5302-4d74-bea1-0b62153efef7&_gl=1*r5ovrn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MTg2LjQ1LjAuMA..",
    imageURLName: "bench-pull.jpg",
    iconURLName: "bench-pull-256x256.png",
  },
  {
    category: "Back",
    name: "Machine Back Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-back-extension.jpg?alt=media&token=71150ebf-a168-46cb-a572-6257b9d4533c&_gl=1*1j0doho*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MjE3LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-back-extension-256x256.png?alt=media&token=dab434dc-f76d-48a0-a080-91d9add08d0d&_gl=1*1lmjwbw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MjM0LjYwLjAuMA..",
    imageURLName: "machine-back-extension.jpg",
    iconURLName: "machine-back-extension-256x256.png",
  },
  {
    category: "Back",
    name: "Bent Over Dumbbell Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbent-over-dumbbell-row.jpg?alt=media&token=cc1dc866-d8c0-43ea-839a-d328db59b8eb&_gl=1*1b0tfga*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MjY4LjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbent-over-dumbbell-row-256x256.png?alt=media&token=460f532f-92fe-4bb8-a45f-0db0cd99f363&_gl=1*1k84yxn*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3Mjc4LjE2LjAuMA..",
    imageURLName: "bent-over-dumbbell-row.jpg",
    iconURLName: "bent-over-dumbbell-row-256x256.png",
  },
  {
    category: "Back",
    name: "Back Extension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fback-extension.jpg?alt=media&token=4f0265f9-cb63-4cac-9aaf-2eceefe9ad04&_gl=1*q6f4b1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MzM0LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fback-extension-256x256.png?alt=media&token=791c12b8-0b95-42ed-8f3c-e3cff9c766d3&_gl=1*c9t9h8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3MzQ1LjQ5LjAuMA..",
    imageURLName: "back-extension.jpg",
    iconURLName: "back-extension-256x256.png",
  },
  {
    category: "Back",
    name: "Barbell Pullover",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-pullover.jpg?alt=media&token=659fb1ad-4d88-42b8-8b03-0b83517d33a6&_gl=1*pdz7ue*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3Mzc3LjE3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-pullover-256x256.png?alt=media&token=af6488af-c2d0-4641-8cd7-3712a91358e4&_gl=1*vurjv7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3Mzg5LjUuMC4w",
    imageURLName: "barbell-pullover.jpg",
    iconURLName: "barbell-pullover-256x256.png",
  },
  {
    category: "Back",
    name: "One Arm Pull Ups",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-pull-ups.jpg?alt=media&token=5bb0a615-80e1-43d0-9a35-001a0de33949&_gl=1*1derm9g*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NDE3LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-pull-ups-256x256.png?alt=media&token=0d44c8d9-efae-4de2-a93e-32edf9db7aab&_gl=1*zs57cz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NDI2LjUxLjAuMA..",
    imageURLName: "one-arm-pull-ups.jpg",
    iconURLName: "one-arm-pull-ups-256x256.png",
  },
  {
    category: "Back",
    name: "Dumbbell Bench Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-bench-pull.jpg?alt=media&token=a3f940c2-8ece-4a5f-97b2-1d9b461a2335&_gl=1*hvfium*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NDY0LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-bench-pull-256x256.png?alt=media&token=b0c121bd-99bc-462f-912a-c81b52f6474a&_gl=1*k59x4u*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NDc3LjYwLjAuMA..",
    imageURLName: "dumbbell-bench-pull.jpg",
    iconURLName: "dumbbell-bench-pull-256x256.png",
  },
  {
    category: "Back",
    name: "Renegade Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Frenegade-row.jpg?alt=media&token=e3b9742b-3513-4f39-a3ff-d7278f7e6da5&_gl=1*2cvj2y*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NTI0LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Frenegade-row-256x256.png?alt=media&token=1b7f671f-1b2e-40d0-b2fa-6c9b211ae896&_gl=1*ueygf8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NTM2LjEuMC4w",
    imageURLName: "renegade-row.jpg",
    iconURLName: "renegade-row-256x256.png",
  },
  {
    category: "Back",
    name: "Inverted Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Finverted-row.jpg?alt=media&token=7f9647b3-b57b-4177-ad3a-b73218980195&_gl=1*oe7ee9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NTYxLjM3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Finverted-row-256x256.png?alt=media&token=366b70c0-f62d-45ee-a17f-e16103d05775&_gl=1*1tcxq74*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NTc2LjIyLjAuMA..",
    imageURLName: "inverted-row.jpg",
    iconURLName: "inverted-row-256x256.png",
  },
  {
    category: "Back",
    name: "One Arm Lat Pulldown",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-lat-pulldown.jpg?alt=media&token=2d6a37a7-80ba-4b6a-8b24-ec8970f37374&_gl=1*1u8b24t*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NjAzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-lat-pulldown-256x256.png?alt=media&token=5cba362f-fdb8-450b-9813-874de2caaaf9&_gl=1*zks0bz*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NjE2LjQ3LjAuMA..",
    imageURLName: "one-arm-lat-pulldown.jpg",
    iconURLName: "one-arm-lat-pulldown-256x256.png",
  },
  {
    category: "Back",
    name: "One Arm Seated Cable Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-seated-cable-row.jpg?alt=media&token=0a853390-eef1-406d-b1c9-3808962bc42f&_gl=1*1irwy1q*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NjQzLjIwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fone-arm-seated-cable-row-256x256.png?alt=media&token=f68cdabf-fa30-402c-b399-8902459e60fe&_gl=1*19niytw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NjUyLjExLjAuMA..",
    imageURLName: "one-arm-seated-cable-row.jpg",
    iconURLName: "one-arm-seated-cable-row-256x256.png",
  },
  {
    category: "Back",
    name: "Cable Upright Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-upright-row.jpg?alt=media&token=51d47f2e-f5c5-418b-85df-66c612b2a917&_gl=1*e62ocq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3Njk0LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-upright-row-256x256.png?alt=media&token=9fd302d9-0282-4157-9738-59938d85b14c&_gl=1*j7tyif*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NzA3LjQ3LjAuMA..",
    imageURLName: "cable-upright-row.jpg",
    iconURLName: "cable-upright-row-256x256.png",
  },
  {
    category: "Back",
    name: "Machine Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-shrug.jpg?alt=media&token=898a59e9-ddde-4a6e-8b3a-03272f07954d&_gl=1*iaq0co*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NzM3LjE3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmachine-shrug-256x256.png?alt=media&token=b67330cb-0385-44de-9523-79c42fd723cf&_gl=1*12gg8cu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NzY1LjYwLjAuMA..",
    imageURLName: "machine-shrug.jpg",
    iconURLName: "machine-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "Hex Bar Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhex-bar-shrug.jpg?alt=media&token=377a0f4b-7ab8-4acf-9fd8-34de4ce3ede3&_gl=1*q83sji*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3NzkwLjM1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhex-bar-shrug-256x256.png?alt=media&token=7429b800-a974-4c7b-829c-f64ad04145a5&_gl=1*12p12ta*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3ODExLjE0LjAuMA..",
    imageURLName: "hex-bar-shrug.jpg",
    iconURLName: "hex-bar-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "Dumbbell Incline Y Raise",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-incline-y-raise.jpg?alt=media&token=d045224d-0b70-423a-a64c-13960eac3355&_gl=1*1vxp7ak*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3ODQ2LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-incline-y-raise-256x256.png?alt=media&token=fa55ca1d-ce5b-492a-83b3-eb55fab22202&_gl=1*1mppnkb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3ODU4LjQ4LjAuMA..",
    imageURLName: "dumbbell-incline-y-raise.jpg",
    iconURLName: "dumbbell-incline-y-raise-256x256.png",
  },
  {
    category: "Back",
    name: "Smith Machine Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsmith-machine-shrug.jpg?alt=media&token=b110d588-5dc4-41a8-a1a0-df9707a2dda4&_gl=1*1olvc4y*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3ODk2LjEwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsmith-machine-shrug-256x256.png?alt=media&token=61c1f9c4-5ed0-443e-b3db-924eeee35f67&_gl=1*1ljwu3*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3OTEwLjYwLjAuMA..",
    imageURLName: "smith-machine-shrug.jpg",
    iconURLName: "smith-machine-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "Bent Arm Barbell Pullover",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbent-arm-barbell-pullover.jpg?alt=media&token=ad972643-03ab-4e53-bd93-c9ff78a7121d&_gl=1*er0pwp*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3OTQxLjI5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbent-arm-barbell-pullover-256x256.png?alt=media&token=5d9fedde-c32e-4098-a0c2-e057e34e6d6c&_gl=1*1kf5u05*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3OTYwLjEwLjAuMA..",
    imageURLName: "bent-arm-barbell-pullover.jpg",
    iconURLName: "bent-arm-barbell-pullover-256x256.png",
  },
  {
    category: "Back",
    name: "Cable Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-shrug.jpg?alt=media&token=0be603bc-11e2-4dda-b0e4-827ab64596b6&_gl=1*1othp1x*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3OTgxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fcable-shrug-256x256.png?alt=media&token=4cb1c721-2ee1-4a16-82a6-8e7516fbd53b&_gl=1*1jkmvv0*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM3OTk2LjQ1LjAuMA..",
    imageURLName: "cable-shrug.jpg",
    iconURLName: "cable-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "Barbell Power Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-power-shrug.jpg?alt=media&token=9eaed694-a863-4421-8d22-7ee16bc2a9d8&_gl=1*7e2rtj*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MDMxLjEwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbarbell-power-shrug-256x256.png?alt=media&token=aa750538-8273-432f-8a89-46ac55dc2906&_gl=1*xsi87l*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MDQyLjYwLjAuMA..",
    imageURLName: "barbell-power-shrug.jpg",
    iconURLName: "barbell-power-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "Behind the Back Barbell Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbehind-the-back-barbell-shrug.jpg?alt=media&token=c8974ae9-71ab-4fb7-8427-b766f040fcb2&_gl=1*4c0nei*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MDkwLjEyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbehind-the-back-barbell-shrug-256x256.png?alt=media&token=30be596b-b781-4a2c-b899-bee8314694d7&_gl=1*du1wf9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MTAyLjYwLjAuMA..",
    imageURLName: "behind-the-back-barbell-shrug.jpg",
    iconURLName: "behind-the-back-barbell-shrug-256x256.png",
  },
  {
    category: "Back",
    name: "Meadows Row",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmeadows-row.jpg?alt=media&token=737022db-3d8f-4e65-a626-2ffb2364536f&_gl=1*1t7bmw7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MTM5LjIzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmeadows-row-256x256.png?alt=media&token=980997db-a6fa-420f-943d-b444638886c9&_gl=1*udxo11*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MTUzLjkuMC4w",
    imageURLName: "meadows-row.jpg",
    iconURLName: "meadows-row-256x256.png",
  },
  {
    category: "Back",
    name: "Reverse Hyperextension",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-hyperextension.jpg?alt=media&token=ec96d22a-0dac-40da-968e-4e38f758c4c7&_gl=1*i9gnk2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MTgwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Freverse-hyperextension-256x256.png?alt=media&token=2704a3d0-ea74-498a-8011-ad304044d9dc&_gl=1*c7xnhc*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM4MTk0LjQ2LjAuMA..",
    imageURLName: "reverse-hyperextension.jpg",
    iconURLName: "reverse-hyperextension-256x256.png",
  },
  {
    category: "Legs",
    name: "Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdeadlift.jpg?alt=media&token=eeb37c74-fe19-4187-b443-aac37df48964&_gl=1*19h16xe*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5MTYxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdeadlift-256x256.png?alt=media&token=da2a8bd3-2acd-4c5a-9a15-e3af595e0daf&_gl=1*13ijmr8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5MTk2LjI1LjAuMA..",
    imageURLName: "deadlift.jpg",
    iconURLName: "deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Hex Bar Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhex-bar-deadlift.jpg?alt=media&token=12426ca9-a27d-4d7c-94c2-20fe8c3e82eb&_gl=1*mfue7o*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5MjU0LjM2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhex-bar-deadlift-256x256.png?alt=media&token=c04eb9eb-073e-4a93-9e66-7e6f0680effa&_gl=1*ankpty*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5MzA2LjU4LjAuMA..",
    imageURLName: "hex-bar-deadlift.jpg",
    iconURLName: "hex-bar-deadlift-256x256.png",
  },
  {
    category: "Back",
    name: "Power Clean",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpower-clean.jpg?alt=media&token=fed7f3f1-780c-4f70-9f69-ffa84f71976c&_gl=1*96qk3c*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5MzkyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpower-clean-256x256.png?alt=media&token=b18abd98-b5be-4301-ba19-6123ec7aa1bf&_gl=1*i5tbmc*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NDA1LjQ3LjAuMA..",
    imageURLName: "power-clean.jpg",
    iconURLName: "power-clean-256x256.png",
  },
  {
    category: "Legs",
    name: "Sumo Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsumo-deadlift.jpg?alt=media&token=cda36a1f-85c4-4297-ae42-5e971483f851&_gl=1*17v73j7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NDI5LjIzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsumo-deadlift-256x256.png?alt=media&token=c4497484-3823-4bdb-91c9-b0349563f9a0&_gl=1*17plcfq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NDM5LjEzLjAuMA..",
    imageURLName: "sumo-deadlift.jpg",
    iconURLName: "sumo-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Romanian Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fromanian-deadlift.jpg?alt=media&token=a07d0a4a-041c-4a9e-b297-4fd93be4d206&_gl=1*13l90vh*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NDY3LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fromanian-deadlift-256x256.png?alt=media&token=3d794b68-650c-43d0-9e2d-97eb3fe1bf79&_gl=1*7xgfeb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NDgxLjQ2LjAuMA..",
    imageURLName: "romanian-deadlift.jpg",
    iconURLName: "romanian-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Clean and Jerk",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-and-jerk.jpg?alt=media&token=13c01742-e2b1-417e-90bd-bf36066a5acd&_gl=1*1o2br0i*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NTE0LjEzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-and-jerk-256x256.png?alt=media&token=390a4b72-ccd2-4ab0-9cbb-48757fd0c23b&_gl=1*pgvsjw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NjI2LjYwLjAuMA..",
    imageURLName: "clean-and-jerk.jpg",
    iconURLName: "clean-and-jerk-256x256.png",
  },
  {
    category: "Legs",
    name: "Snatch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsnatch.jpg?alt=media&token=c183aa5c-3e47-4467-8cea-5f29b1649081&_gl=1*1dv9wcu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NjUyLjM0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsnatch-256x256.png?alt=media&token=94942332-59b0-4906-9f6f-db1f7d39fe33&_gl=1*24h5no*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NjkzLjU4LjAuMA..",
    imageURLName: "snatch.jpg",
    iconURLName: "snatch-256x256.png",
  },
  {
    category: "Legs",
    name: "Clean",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean.jpg?alt=media&token=e7c77698-68c0-4b5a-8186-5aec0580cbce&_gl=1*kuds07*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NzYzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-256x256.png?alt=media&token=9605d3f0-7266-43b4-9cc2-9968e2eef322&_gl=1*ddgakv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5NzgyLjQxLjAuMA..",
    imageURLName: "clean.jpg",
    iconURLName: "clean-256x256.png",
  },
  {
    category: "Shoulders",
    name: "Clean and Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-and-press.jpg?alt=media&token=7078db6b-dfe3-4956-a819-03e53a5ecd06&_gl=1*kedc6e*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5ODE3LjYuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-and-press-256x256.png?alt=media&token=7e5b88e5-fc47-4049-b7b5-a6af1091f0df&_gl=1*hx5hpy*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5ODI4LjYwLjAuMA..",
    imageURLName: "clean-and-press.jpg",
    iconURLName: "clean-and-press-256x256.png",
  },
  {
    category: "Back",
    name: "Rack Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Frack-pull.jpg?alt=media&token=7f313dad-92b5-4310-bd8e-2f6931a351fd&_gl=1*157ytrv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5OTIyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Frack-pull-256x256.png?alt=media&token=7c825062-622f-41e3-b583-e51c31abf890&_gl=1*mdrgk4*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5OTM2LjQ2LjAuMA..",
    imageURLName: "rack-pull.jpg",
    iconURLName: "rack-pull-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Romanian Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-romanian-deadlift.jpg?alt=media&token=d87ddeb1-5288-49a8-9c2a-fc13aa91cfb9&_gl=1*h5ruww*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTM5OTg4LjU5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-romanian-deadlift-256x256.png?alt=media&token=fafd93c2-781c-44f7-a7a2-00c6ebcf0c84&_gl=1*1rhfjqm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMDA5LjM4LjAuMA..",
    imageURLName: "dumbbell-romanian-deadlift.jpg",
    iconURLName: "dumbbell-romanian-deadlift-256x256.png",
  },
  {
    category: "Core",
    name: "Hang Clean",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhang-clean.jpg?alt=media&token=c467440d-7b3d-4e45-883a-f12c505a50db&_gl=1*1llkrbm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMDQzLjQuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhang-clean-256x256.png?alt=media&token=abdc8d1a-789c-45b6-a1cd-05f07a6cdbce&_gl=1*mwg4nd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMDU5LjYwLjAuMA..",
    imageURLName: "hang-clean.jpg",
    iconURLName: "hang-clean-256x256.png",
  },
  {
    category: "Legs",
    name: "Stiff Leg Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstiff-leg-deadlift.jpg?alt=media&token=d4e3fd10-c6ff-470b-8eb4-6a33ed67701d&_gl=1*mxq3lw*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMDk3LjIyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fstiff-leg-deadlift-256x256.png?alt=media&token=f46721ce-40f5-4f44-8ca9-9ffb2220bfaa&_gl=1*5gbtxi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMTA3LjEyLjAuMA..",
    imageURLName: "stiff-leg-deadlift.jpg",
    iconURLName: "stiff-leg-deadlift-256x256.png",
  },
  {
    category: "Back",
    name: "Muscle Ups",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmuscle-ups.jpg?alt=media&token=503d3e8b-016b-4e28-94fb-b2954e6d9f47&_gl=1*1d1omm9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMTQxLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmuscle-ups-256x256.png?alt=media&token=6cfbd998-1170-43e4-965c-5911f3d33f87&_gl=1*1pola5f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMTU0LjQ3LjAuMA..",
    imageURLName: "muscle-ups.jpg",
    iconURLName: "muscle-ups-256x256.png",
  },
  {
    category: "Legs",
    name: "Thruster",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fthruster.jpg?alt=media&token=6a1fa14b-51f5-4cfa-b819-42a12d697f76&_gl=1*xe99ff*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMTk3LjQuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fthruster-256x256.png?alt=media&token=4a05d535-3ba3-4cef-9a0f-e2e6170f83e3&_gl=1*1bu95b7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMjE4LjUwLjAuMA..",
    imageURLName: "thruster.jpg",
    iconURLName: "thruster-256x256.png",
  },
  {
    category: "Legs",
    name: "Power Snatch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpower-snatch.jpg?alt=media&token=325a9762-4054-4f42-9ed0-8beb8c72845c&_gl=1*10zng88*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMjU2LjEyLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpower-snatch-256x256.png?alt=media&token=dd405de3-d7c7-4e78-8b4f-81a7f933e7a4&_gl=1*93mq2f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMjkyLjYwLjAuMA..",
    imageURLName: "power-snatch.jpg",
    iconURLName: "power-snatch-256x256.png",
  },
  {
    category: "Legs",
    name: "Push Jerk",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpush-jerk.jpg?alt=media&token=cb973710-86a8-4476-92e2-b2a04e81957f&_gl=1*105uvg2*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMzE2LjM2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpush-jerk-256x256.png?alt=media&token=fd27e91b-9728-4100-921b-a845100f3cf3&_gl=1*3ohfq5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMzI0LjI4LjAuMA..",
    imageURLName: "push-jerk.jpg",
    iconURLName: "push-jerk-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-deadlift.jpg?alt=media&token=7b9552b5-7885-4e13-9d01-9ccf75230a91&_gl=1*cd7cie*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMzYzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-deadlift-256x256.png?alt=media&token=639d9a7d-298e-4fb6-8cbb-f39e41d5b5c0&_gl=1*12chdeb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwMzkxLjMyLjAuMA..",
    imageURLName: "dumbbell-deadlift.jpg",
    iconURLName: "dumbbell-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Deficit Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdeficit-deadlift.jpg?alt=media&token=7a847b8f-ee72-476a-9cb2-99c43fb6bc1a&_gl=1*1dgb8at*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNDQzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdeficit-deadlift-256x256.png?alt=media&token=7940aab2-141f-4540-b8f9-ea0e3a08b6ee&_gl=1*1lpa146*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNDU0LjQ5LjAuMA..",
    imageURLName: "deficit-deadlift.jpg",
    iconURLName: "deficit-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Single Leg Romanian Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-romanian-deadlift.jpg?alt=media&token=a3a1f597-6836-4529-bdde-414e498c30e0&_gl=1*1vjmbb8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNTI3LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-romanian-deadlift-256x256.png?alt=media&token=a71f7eaf-4e7a-40e3-a88d-ef89f78e7df7&_gl=1*oitkso*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNTM1LjUyLjAuMA..",
    imageURLName: "single-leg-romanian-deadlift.jpg",
    iconURLName: "single-leg-romanian-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Split Jerk",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsplit-jerk.jpg?alt=media&token=44b65105-7a6f-4095-925a-eaef922fa915&_gl=1*1i8ny0p*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNTYxLjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsplit-jerk-256x256.png?alt=media&token=82d0c14c-75e2-4e69-a648-99d9f5d3595e&_gl=1*j2hx5k*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNTcyLjE1LjAuMA..",
    imageURLName: "split-jerk.jpg",
    iconURLName: "split-jerk-256x256.png",
  },
  {
    category: "Legs",
    name: "Hang Power Clean",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhang-power-clean.jpg?alt=media&token=b1ddb187-97b4-4d51-b0ae-1b23287ddafe&_gl=1*zredz7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNjIyLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhang-power-clean-256x256.png?alt=media&token=730b6898-d9b5-47a6-addf-b4b67647195d&_gl=1*1qy73ww*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNjUyLjMwLjAuMA..",
    imageURLName: "hang-power-clean.jpg",
    iconURLName: "hang-power-clean-256x256.png",
  },
  {
    category: "Legs",
    name: "Clean High Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-high-pull.jpg?alt=media&token=5cfb3c4b-a639-4b8f-97ae-8ae4dec3f338&_gl=1*hezw2u*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNjkzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-high-pull-256x256.png?alt=media&token=26d4ca90-5c68-4eb3-9717-221ded847e19&_gl=1*1kgel90*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNzA1LjQ4LjAuMA..",
    imageURLName: "clean-high-pull.jpg",
    iconURLName: "clean-high-pull-256x256.png",
  },
  {
    category: "Cardio",
    name: "Burpees",
    measurement: ["reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fburpees.jpg?alt=media&token=f9bd8abc-2edc-4b22-82a4-49f360e241f0&_gl=1*fc2781*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNzU4LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fburpees-256x256.png?alt=media&token=14feb0f4-72d7-4176-b6e2-8a1a17f59956&_gl=1*stv7np*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQwNzc5LjM5LjAuMA..",
    imageURLName: "burpees.jpg",
    iconURLName: "burpees-256x256.png",
  },
  {
    category: "Legs",
    name: "Snatch Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsnatch-deadlift.jpg?alt=media&token=e3b409d8-740c-486a-8ccf-20fc085014b7&_gl=1*1eksiwm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNjA5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsnatch-deadlift-256x256.png?alt=media&token=c90e7c35-7339-4822-bc06-7a487cf0b083&_gl=1*1cms2zi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNjMxLjM4LjAuMA..",
    imageURLName: "snatch-deadlift.jpg",
    iconURLName: "snatch-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Snatch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-snatch.jpg?alt=media&token=2f1d4abe-a3fa-4609-b025-00fb7efa1279&_gl=1*1207gsk*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNjY2LjMuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-snatch-256x256.png?alt=media&token=39f24901-b2a5-4a3e-9be7-aef6e2ebd5dd&_gl=1*14984ik*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNjgwLjYwLjAuMA..",
    imageURLName: "dumbbell-snatch.jpg",
    iconURLName: "dumbbell-snatch-256x256.png",
  },
  {
    category: "Legs",
    name: "Clean Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-pull.jpg?alt=media&token=a23c98e0-3f40-46d4-9a01-258084406450&_gl=1*fno3eb*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNzE3LjIzLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclean-pull-256x256.png?alt=media&token=3d922260-eaef-460e-9df8-b9d75ef34316&_gl=1*l6mryl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNzI4LjEyLjAuMA..",
    imageURLName: "clean-pull.jpg",
    iconURLName: "clean-pull-256x256.png",
  },
  {
    category: "Legs",
    name: "Pause Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpause-deadlift.jpg?alt=media&token=9a182dd1-da3c-438b-a301-ed8aff2e5d94&_gl=1*9z399*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNzgwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fpause-deadlift-256x256.png?alt=media&token=f4664bf2-b090-42a4-b3e6-0617357c623b&_gl=1*6ufeyq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxNzg5LjUxLjAuMA..",
    imageURLName: "pause-deadlift.jpg",
    iconURLName: "pause-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Muscle Snatch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmuscle-snatch.jpg?alt=media&token=9918a2c9-fc9e-4206-a582-5fe2c43b2897&_gl=1*1lqrei6*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxODE0LjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fmuscle-snatch-256x256.png?alt=media&token=c77c36c1-4322-4ff6-b215-4e2b83e75161&_gl=1*84u38f*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxODMzLjcuMC4w",
    imageURLName: "muscle-snatch.jpg",
    iconURLName: "muscle-snatch-256x256.png",
  },
  {
    category: "Legs",
    name: "Single Leg Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-deadlift.jpg?alt=media&token=3c09b71a-3a38-4091-9e49-a97d5fe674ca&_gl=1*1qi2jaq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxODc1LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-deadlift-256x256.png?alt=media&token=290df1b8-ae50-4234-8968-1c4d5a0e909b&_gl=1*ireidm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxODg3LjQ4LjAuMA..",
    imageURLName: "single-leg-deadlift.jpg",
    iconURLName: "single-leg-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Jefferson Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjefferson-deadlift.jpg?alt=media&token=bb03cd36-ebe6-4a0f-9af4-08b7621e0c9d&_gl=1*am9b96*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxOTM5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fjefferson-deadlift-256x256.png?alt=media&token=87c5d88b-3213-4e9e-9c66-d3136bf3087d&_gl=1*1lydf62*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxOTU0LjQ1LjAuMA..",
    imageURLName: "jefferson-deadlift.jpg",
    iconURLName: "jefferson-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Snatch Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsnatch-pull.jpg?alt=media&token=c997a2dd-8a0d-4ba1-ad47-74d9724cd908&_gl=1*bfevsu*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxOTgwLjE5LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsnatch-pull-256x256.png?alt=media&token=f201c248-184d-45dc-ae38-e670058ac5a6&_gl=1*5be83x*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQxOTkyLjcuMC4w",
    imageURLName: "snatch-pull.jpg",
    iconURLName: "snatch-pull-256x256.png",
  },
  {
    category: "Core",
    name: "Wall Ball",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwall-ball.jpg?alt=media&token=d384f55a-2718-449b-b26f-f7da72569186&_gl=1*qvvgjv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMDM2LjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fwall-ball-256x256.png?alt=media&token=12868371-4a83-438e-8336-3a2a3f6d70f5&_gl=1*1r31bnv*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMDUxLjExLjAuMA..",
    imageURLName: "wall-ball.jpg",
    iconURLName: "wall-ball-256x256.png",
  },
  {
    category: "Legs",
    name: "Zercher Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fzercher-deadlift.jpg?alt=media&token=e4615f95-3c44-4964-8512-9f0eb371d741&_gl=1*i4mr5l*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMDgzLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fzercher-deadlift-256x256.png?alt=media&token=787b65c1-9641-41df-b7aa-5e33e2a3f168&_gl=1*12t07w5*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMTAxLjQyLjAuMA..",
    imageURLName: "zercher-deadlift.jpg",
    iconURLName: "zercher-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Single Leg Dumbbell Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-dumbbell-deadlift.jpg?alt=media&token=623b5471-c5e5-47d6-aca1-d51bca93677a&_gl=1*18p6ejl*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMTI5LjE0LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsingle-leg-dumbbell-deadlift-256x256.png?alt=media&token=6eaa8714-87a7-4c3c-8601-246b795a933c&_gl=1*1oe39c1*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMTM5LjQuMC4w",
    imageURLName: "single-leg-dumbbell-deadlift.jpg",
    iconURLName: "single-leg-dumbbell-deadlift-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Clean And Press",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-clean-and-press.jpg?alt=media&token=f56b8258-5112-497b-b1c4-d1af26fc1386&_gl=1*hz6679*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMTY5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-clean-and-press-256x256.png?alt=media&token=20d0cae2-aacf-426e-b764-4302b6569f01&_gl=1*4x20ob*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMjA3LjIyLjAuMA..",
    imageURLName: "dumbbell-clean-and-press.jpg",
    iconURLName: "dumbbell-clean-and-press-256x256.png",
  },
  {
    category: "Core",
    name: "Ring Muscle Ups",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fring-muscle-ups.jpg?alt=media&token=b06b3252-177d-421c-8cfc-e3633c1a23f6&_gl=1*1g53vr9*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMjM5LjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fring-muscle-ups-256x256.png?alt=media&token=a8a94a38-fc3c-4a29-9798-224a4248d5f3&_gl=1*1q9sdh8*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMjUxLjQ4LjAuMA..",
    imageURLName: "ring-muscle-ups.jpg",
    iconURLName: "ring-muscle-ups-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Thruster",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-thruster.jpg?alt=media&token=0f8bb378-166b-4d12-81c2-f56353c3acaa&_gl=1*h18et7*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMjgyLjE3LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-thruster-256x256.png?alt=media&token=e2d6f42d-7035-419c-b09b-dff6c8c16c50&_gl=1*67b1eq*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMjk2LjMuMC4w",
    imageURLName: "dumbbell-thruster.jpg",
    iconURLName: "dumbbell-thruster-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell High Pull",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-high-pull.jpg?alt=media&token=51c2e032-df3b-494c-84b2-09a44180d84c&_gl=1*yy839v*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMzQyLjM1LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-high-pull-256x256.png?alt=media&token=b44e4908-deee-41cc-a47b-c96b1702322f&_gl=1*1j7s873*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyMzUzLjI0LjAuMA..",
    imageURLName: "dumbbell-high-pull.jpg",
    iconURLName: "dumbbell-high-pull-256x256.png",
  },
  {
    category: "Legs",
    name: "Hang Snatch",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhang-snatch.jpg?alt=media&token=ac1ca803-80f6-4c7e-acb2-1640e60285da&_gl=1*19zcpxk*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNDI5LjQ4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fhang-snatch-256x256.png?alt=media&token=823fb07c-51ae-4014-ad78-a4710467d6a3&_gl=1*3013hi*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNDQzLjM0LjAuMA..",
    imageURLName: "hang-snatch.jpg",
    iconURLName: "hang-snatch-256x256.png",
  },
  {
    category: "Legs",
    name: "Dumbbell Hang Clean",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-hang-clean.jpg?alt=media&token=b251cf95-303d-41b3-bd57-c32f8d7d1995&_gl=1*13rd35h*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNDkwLjYwLjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fdumbbell-hang-clean-256x256.png?alt=media&token=22eb2ee1-4f26-4a2d-882e-407f396e0d24&_gl=1*1l88hbr*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNTAwLjUwLjAuMA..",
    imageURLName: "dumbbell-hang-clean.jpg",
    iconURLName: "dumbbell-hang-clean-256x256.png",
  },
  {
    category: "Legs",
    name: "Behind The Back Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbehind-the-back-deadlift.jpg?alt=media&token=d79caf10-2cca-4e05-9052-8a38c4a17927&_gl=1*1csj7pd*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNTQ3LjMuMC4w",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fbehind-the-back-deadlift-256x256.png?alt=media&token=6bee7490-ef5e-4b26-a821-f21c4aa9d8bf&_gl=1*1gblo2s*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNTU3LjYwLjAuMA..",
    imageURLName: "behind-the-back-deadlift.jpg",
    iconURLName: "behind-the-back-deadlift-256x256.png",
  },
  {
    category: "Back",
    name: "Clap Pull Up",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclap-pull-up.jpg?alt=media&token=8528c58a-c7aa-468e-b739-9c87d0f0d316&_gl=1*15r8hje*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNTg5LjI4LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fclap-pull-up-256x256.png?alt=media&token=ae34ec3c-57e6-4acb-a796-719936b4a2d3&_gl=1*18kmq0u*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNjA3LjEwLjAuMA..",
    imageURLName: "clap-pull-up.jpg",
    iconURLName: "clap-pull-up-256x256.png",
  },
  {
    category: "Legs",
    name: "Squat Thrust",
    measurement: ["weight", "reps"],
    favorite: false,
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsquat-thrust.jpg?alt=media&token=b6a7eafa-e3ff-4f73-8410-1f0193b1e297&_gl=1*1ngqznm*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNjUyLjI2LjAuMA..",
    iconURL:
      "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fexercises-images%2Fsquat-thrust-256x256.png?alt=media&token=51052efa-5d69-42bc-8916-631aa78abdc6&_gl=1*16da3ar*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5ODkzNjMxMy4xMjUuMS4xNjk4OTQyNjY0LjE0LjAuMA..",
    imageURLName: "squat-thrust.jpg",
    iconURLName: "squat-thrust-256x256.png",
  },

  /* 
  
  {
  category: "",
  name: "",
  measurement: ["weight", "reps"],
  favorite: false,
  imageURL:"",
  iconURL:"",
  imageURLName:"",
  iconURLName:""
}, 
  
  {
    category: "Shoulders",
    name: "Arnold Dumbbell Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Behind The Neck Barbell Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Cable Face Pull",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Dumbbell Overhead Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Front Dumbbell Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Hammer Strength Shoulder Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "High Pull",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Kneeled Shoulder Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Lateral Dumbbell Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Lateral Machine Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Log Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "One-Arm Standing Dumbbell Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Overhead Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Push Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Rear Delt Dumbbell Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Rear Delt Machine Fly",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Seated Dumbbell Lateral Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Seated Dumbbell Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Smith Machine Overhead Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Shoulders",
    name: "Standing Shoulders Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Cable Overhead Triceps Extension",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Close Grip Barbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Dumbbell Overhead Triceps Extension",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "EZ-Bar Skullcrusher",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Incline Bench Triceps Push",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Lying Triceps Extension",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Overhead Barbell Extension",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Parallel Bar Triceps Dip",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Ring Dip",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Rope Push Down",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "Smith Machine Close Grip Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Triceps",
    name: "V-Bar Push Down",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Barbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Barbell Preacher Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Barbell Cable Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Dumbbell Concentration Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Dumbbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Dumbbell Hammer Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Dumbbell Preacher Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "EZ-Bar Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "EZ-Bar Preacher Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Seated Incline Dumbbell Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Biceps",
    name: "Seated Machine Curl",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Bar Push Ups",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Barbell Floor Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Cable Crossover",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Chest Push Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Chest Push Rubber Band Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Close Grip Bench Pin Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Decline Barbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Decline Hammer Strength Chest Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Diamond Push Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Dips",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Dumbbell Upper Flies",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Dumbbell Floor Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Eccentric Floor Chest Fly",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Flat Dumbbell Fly",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Floor Barbell Pinch Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Flat Barbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Incline Barbell Bench Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Incline Dumbbell Fly",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Incline Hammer Strength Chest Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Incline Plate Chest Press",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Punch Push Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Push Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Seated Machine Fly",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Chest",
    name: "Single Arm Cable Chest Fly",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Barbell Row",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Barbell Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Chin Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Close Grip Pull Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Dumbbell Dead Row",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Dumbbell Row",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Good Morning",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Hammer Strength Row",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Inverted Horizontal Ring Rows",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Lat Pulldown",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Machine Shrug",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Negative Pull Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Neutral Chin Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Pendlay Row",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Pull Up",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Rack Pull",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Row Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Seated Cable Row",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Straight-Arm Cable Pushdown",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "T-Bar Row",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "T-Bar Row Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Back",
    name: "Wide Grip Pull Down",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Barbell Box Squat",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Barbell Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Barbell Front Squat",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Barbell Glute Bridge",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Beginner Shrimp Squat",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Donkey Calf Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Farmer's Walk",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Glute-Ham Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Leg Extension Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Lying Leg Curl Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Nordic Curls",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Reverse Hyperextension",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Romanian Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Seated Calf Raise Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Seated Leg Curl Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Standing Calf Raise Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Stiff-Legged Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Sumo Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Legs",
    name: "Trap Bar Deadlift",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Ab-Wheel Rollout",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Cable Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Crunch Machine",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Decline Crunch",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Dragon Flag",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Hanging Knee Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Hanging Leg Raise",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Plank",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Side Plank",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Abs",
    name: "Standing Cable Crunch",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Cycling",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Elyptical Trainer",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Rowing Machine",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Running (Outdoor)",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Running (Treadmill)",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Stationary Bike",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Swimming",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Cardio",
    name: "Walking",
    measurement: ["distance", "time"],
    favorite: false,
  },
  {
    category: "Corrective",
    name: "Double Hand Scapula Stretch",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Corrective",
    name: "Look Down Shoulder Stretch",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Corrective",
    name: "Push Up Plus",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Corrective",
    name: "Serreatus Plus Push Ups",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Corrective",
    name: "Single Lat Stretch",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Corrective",
    name: "Wall Screw Stretch",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  {
    category: "Corrective",
    name: "Wrist Shoulder Dead Hang",
    measurement: ["weight", "reps"],
    favorite: false,
  },
  */
];

export default preselectedExercises;
