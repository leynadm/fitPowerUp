import { SkillType } from "beautiful-skill-tree";
import { SkillNode } from "../../../pages/Progress/Mentor/MentorTree";

type MentorData = {
  skillTree: SkillType[];
  description: string;
};



export const krillinSkillTree: SkillNode = 
  {
    id: "upper-foundation",
    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up.svg?alt=media&token=8df512ed-6039-4da9-be77-eed40f7525a2",
    title: "Upper Foundation",  
    tooltip: {
      content:
        "Perform a total of 100 push ups",
    },

    children: [
  
      {
        id: "lower-foundation",
        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbodyweight-squat.svg?alt=media&token=1db0a1e1-6dd2-4ada-8256-e742a218d5e7",
        title: "Lower Foundation",  
        tooltip: {
          content:
            "Perform a total of 100 bodyweight squats",
        },
    
        children: [
      
          {
            id: "core-foundation",
            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fsit-up.svg?alt=media&token=a6b84924-54ef-4a72-87c9-db59f02599df",
            title: "Core Foundation",  
            tooltip: {
              content:
                "Perform a total of 200 sit ups",
            },
        
            children: [
              {
                id: "turtle-plank",
                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fplank.svg?alt=media&token=16554ac3-2448-419e-87d1-97965bb7627d",
                title: "Turtle Plank",              
                tooltip: {
                  content:
                    "Accumulate over 5 minutes in the plank stance",
                },
              
                children: [
                  {
                    id: "triceps-time",
                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Ftriceps.svg?alt=media&token=e340f8fd-a807-4837-9b7a-3ee74c92949c",
                    title: "Triceps Time",
                    tooltip: {
                      content:
                        "Complete over 200 cumulative reps of triceps bodyweight exercises",
                    },
                    children: [
                      {
                        id: "diamond-distro",
                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up-v3.svg?alt=media&token=63ca1b8a-3074-45d4-8f0e-b5a081ef9ca3",
                        title: "Diamond Distro",
                        tooltip: {
                          content:
                            "Complete over 200 cumulative reps of diamond push-ups",
                        },
                        children: [
                          {
                            id: "biceps-beginning",
                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbiceps.svg?alt=media&token=2ea783c2-d6bd-48f8-a009-3f5ca29b79f1",
                            title: "Biceps Beginning",
                            tooltip: {
                              content:
                                "Complete over 50 cumulative reps of chin-ups",
                            },
                            children: [
                              {
                                id: "inverted-power",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpull-up-bar.svg?alt=media&token=c8f6ec93-41ff-4064-9a94-b4dbb3e10559",
                                title: "Inverted Power",
                                tooltip: {
                                  content:
                                    "Complete over 150 cumulative reps of inverted rows",
                                },
                                children: [
                                  {
                                    id: "Steel Endurance",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fleg-lift-plank.svg?alt=media&token=40b05a3c-6a78-429b-b8cb-77f27606a2b9",
                                    title: "Steel Endurance",
                                    tooltip: {
                                      content:
                                        "Accumulate over 5 minutes in the plank stance",
                                    },
                                    children: [
                                      {
                                        id: "padded-shoulders",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpadded-shoulders.svg?alt=media&token=564d11b9-b164-4584-95e8-92cd7dac0f21",
                                        title: "Padded Shoulders",
                                        tooltip: {
                                          content:
                                            "Complete over 175 cumulative reps of pike push ups",
                                        },
                                        children: [
                                          {
                                            id: "limitless-push",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up-v2.svg?alt=media&token=0aef6257-8688-4b05-8700-b1430b98bdf0",
                                            title: "Limitless Push",
                                            tooltip: {
                                              content:
                                                "Complete over 250 cumulative reps of push ups",
                                            },
                                            children: [
                                              {
                                                id: "limitless-push",
                                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up-v2.svg?alt=media&token=0aef6257-8688-4b05-8700-b1430b98bdf0",
                                                title: "Limitless Push",
                                                tooltip: {
                                                  content:
                                                    "Complete over 250 cumulative reps of push ups",
                                                },
                                                children: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                id: "declined-improvement",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fdecline-push-up.svg?alt=media&token=14388979-ec98-47c5-9fc4-37fcc6e5efb5",
                                title: "Declined Improvement",
                                tooltip: {
                                  content:
                                    "Complete over 100 cumulative reps of decline push ups",
                                },
                                children: [
                                  {
                                    id: "ascended-dips",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fdips.svg?alt=media&token=c89b1019-acc9-4356-9fd9-c375588b479d",
                                    title: "Ascended Dips",
                                    tooltip: {
                                      content:
                                        "Complete over 150 cumulative reps of triceps or chest dips ",
                                    },
                                    children: [
                                      {
                                        id: "crunch-crank",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fcrunch.svg?alt=media&token=1e7a83c3-175e-4b7b-a238-858dd9b7430c",
                                        title: "Crunch Crank",
                                        tooltip: {
                                          content:
                                            "Complete over 250 cumulative reps of crunches or sit ups",
                                        },
                                        children: [
                                          {
                                            id: "biceps-pursuit",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fchin-up-v3.svg?alt=media&token=acae5b34-9586-4a5f-b70c-fc5d349fa845",
                                            title: "Biceps Pursuit",
                                            tooltip: {
                                              content:
                                                "Complete over 100 cumulative reps of chin-ups",
                                            },
                                            children: [
                                              {
                                                id: "handstand-victory",
                                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fhandstand-push-up.svg?alt=media&token=7e1debe6-1d4d-43d8-87c2-5440035cbf12",
                                                title: "Handstand Victory",
                                                tooltip: {
                                                  content:
                                                    "Complete over 100 cumulative reps of handstand push ups",
                                                },
                                                children: [
                                                  {
                                                    id: "test",
                                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fhandstand-push-up.svg?alt=media&token=7e1debe6-1d4d-43d8-87c2-5440035cbf12",
                                                    title: "test",
                                                    tooltip: {
                                                      content:
                                                        "Complete over 100 cumulative reps of handstand push ups",
                                                    },
                                                    children: [
                                                      {
                                                        id: "testa",
                                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fhandstand-push-up.svg?alt=media&token=7e1debe6-1d4d-43d8-87c2-5440035cbf12",
                                                        title: "testa",
                                                        tooltip: {
                                                          content:
                                                            "Complete over 100 cumulative reps of handstand push ups",
                                                        },
                                                        children: [],
                                                      }
                                                    ],
                                                  }
                                                ],
                                              }
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "big-back",
                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpull-up.svg?alt=media&token=c815d9ed-beb1-4ec4-bf69-1163351ea4fa",
                title: "Big Back",
                tooltip: {
                  content:
                    "Complete over 50 cumulative reps of pull ups",
                },
                children: [
                  {
                    id: "big-legs-big-you",
                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fsingle-leg-squat.svg?alt=media&token=b0cbdd42-da90-4127-8334-b465179375d0",
                    title: "Big Legs Big You",
                    tooltip: {
                      content:
                        "Complete over 75 cumulative reps of pistol squats",
                    },
                    children: [
                      {
                        id: "strong-core-strong-everything",
                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Freverse-crunch.svg?alt=media&token=db9e4754-5cfb-4452-adb6-61adec41e459",
                        title: "Strong Core Strong You",
                        tooltip: {
                          content:
                            "Complete over 125 cumulative reverse crunches",
                        },
                        children: [
                          {
                            id: "iron-biceps",
                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fchin-up-v3.svg?alt=media&token=acae5b34-9586-4a5f-b70c-fc5d349fa845",
                            title: "Iron Biceps",
                            tooltip: {
                              content:
                                "Complete over 75 cumulative reps of chin ups",
                            },
                            children: [
                              {
                                id: "super-saiyan",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fsuperman.svg?alt=media&token=dd1c370a-e054-4755-954c-ab9266c24858",
                                title: "Super Saiyan",
                                tooltip: {
                                  content:
                                    "Complete over 100 cumulative reps of superman raises",
                                },
                                children: [
                                  {
                                    id: "pulling-the-limits",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpull-up-bar.svg?alt=media&token=c8f6ec93-41ff-4064-9a94-b4dbb3e10559",
                                    title: "Pulling The Limits",
                                    tooltip: {
                                      content:
                                        "Complete over 250 cumulative reps of inverted rows",
                                    },
                                    children: [
                                      {
                                        id: "back-to-back",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fwide-grip-pull-up.svg?alt=media&token=ae0800ee-e261-4590-9d2d-ef0d050f6391",
                                        title: "Back To Back",
                                        tooltip: {
                                          content:
                                            "Complete over 150 cumulative reps of wide grip pull ups",
                                        },
                                        children: [
                                          {
                                            id: "back-to-back2",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fwide-grip-pull-up.svg?alt=media&token=ae0800ee-e261-4590-9d2d-ef0d050f6391",
                                            title: "Back To Back2",
                                            tooltip: {
                                              content:
                                                "Complete over 150 cumulative reps of wide grip pull ups",
                                            },
                                            children: [
                                              {
                                                id: "unshakeable-balance73",
                                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                                title: "Unshakeable Balance73",
                                                tooltip: {
                                                  content:
                                                    "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                                },
                                                children: [
                                                  
                                                ],
                                              }
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "stability-master",
                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                            title: "Stability Master",
                            tooltip: {
                              content:
                                "Hold a side plank for 2 cumulative minutes per side and perform 50 single-arm dumbbell rows on each side while balancing on one leg.",
                            },
                            children: [
                              {
                                id: "unshakeable-balance",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                title: "Unshakeable Balance",
                                tooltip: {
                                  content:
                                    "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                },
                                children: [
                                  {
                                    id: "unshakeable-balance-1",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                    title: "Unshakeable Balance 1",
                                    tooltip: {
                                      content:
                                        "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                    },
                                    children: [
                                      {
                                        id: "unshakeable-balance2",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                        title: "Unshakeable Balance2",
                                        tooltip: {
                                          content:
                                            "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                        },
                                        children: [
                                          {
                                            id: "unshakeable-balance3",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                            title: "Unshakeable Balance3",
                                            tooltip: {
                                              content:
                                                "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                            },
                                            children: [
                                              {
                                                id: "unshakeable-balance6",
                                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                                title: "Unshakeable Balance6",
                                                tooltip: {
                                                  content:
                                                    "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                                },
                                                children: [
                                                  
                                                ],
                                              }   
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },    
                                ],
                              },
                            ],
                          },
                        ],
                      },  
                    ],
                  },    
                ],
              }, 
            ]
          }

        ]
      }

    ]
  }

  export const simpleSkillTree: SkillNode = 
  {
    id: "upper-foundation",
    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up.svg?alt=media&token=8df512ed-6039-4da9-be77-eed40f7525a2",
    title: "Upper Foundation",  
    tooltip: {
      content:
        "Perform a total of 100 push ups",
    },

    children: [
  
      {
        id: "lower-foundation",
        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbodyweight-squat.svg?alt=media&token=1db0a1e1-6dd2-4ada-8256-e742a218d5e7",
        title: "Lower Foundation",  
        tooltip: {
          content:
            "Perform a total of 100 bodyweight squats",
        },
    
        children: [
      
           {
            id: "core-foundation",
            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fsit-up.svg?alt=media&token=a6b84924-54ef-4a72-87c9-db59f02599df",
            title: "Core Foundation",  
            tooltip: {
              content:
                "Perform a total of 200 sit ups",
            },
        
            children: [
              {
                id: "turtle-plank",
                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fplank.svg?alt=media&token=16554ac3-2448-419e-87d1-97965bb7627d",
                title: "Turtle Plank",              
                tooltip: {
                  content:
                    "Accumulate over 5 minutes in the plank stance",
                },
              
                children: [
                  {
                    id: "triceps-time",
                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Ftriceps.svg?alt=media&token=e340f8fd-a807-4837-9b7a-3ee74c92949c",
                    title: "Triceps Time",
                    tooltip: {
                      content:
                        "Complete over 200 cumulative reps of triceps bodyweight exercises",
                    },
                    children: [
                      {
                        id: "diamond-distro",
                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up-v3.svg?alt=media&token=63ca1b8a-3074-45d4-8f0e-b5a081ef9ca3",
                        title: "Diamond Distro",
                        tooltip: {
                          content:
                            "Complete over 200 cumulative reps of diamond push-ups",
                        },
                        children: [
                          {
                            id: "biceps-beginning",
                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbiceps.svg?alt=media&token=2ea783c2-d6bd-48f8-a009-3f5ca29b79f1",
                            title: "Biceps Beginning",
                            tooltip: {
                              content:
                                "Complete over 50 cumulative reps of chin-ups",
                            },
                            children: [
                              {
                                id: "inverted-power",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpull-up-bar.svg?alt=media&token=c8f6ec93-41ff-4064-9a94-b4dbb3e10559",
                                title: "Inverted Power",
                                tooltip: {
                                  content:
                                    "Complete over 150 cumulative reps of inverted rows",
                                },
                                children: [
                                  {
                                    id: "Steel Endurance",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fleg-lift-plank.svg?alt=media&token=40b05a3c-6a78-429b-b8cb-77f27606a2b9",
                                    title: "Steel Endurance",
                                    tooltip: {
                                      content:
                                        "Accumulate over 5 minutes in the plank stance",
                                    },
                                    children: [
                                      {
                                        id: "padded-shoulders",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpadded-shoulders.svg?alt=media&token=564d11b9-b164-4584-95e8-92cd7dac0f21",
                                        title: "Padded Shoulders",
                                        tooltip: {
                                          content:
                                            "Complete over 175 cumulative reps of pike push ups",
                                        },
                                        children: [
                                          {
                                            id: "limitless-push",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up-v2.svg?alt=media&token=0aef6257-8688-4b05-8700-b1430b98bdf0",
                                            title: "Limitless Push",
                                            tooltip: {
                                              content:
                                                "Complete over 250 cumulative reps of push ups",
                                            },
                                            children: [
                                              {
                                                id: "limitless-push",
                                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up-v2.svg?alt=media&token=0aef6257-8688-4b05-8700-b1430b98bdf0",
                                                title: "Limitless Push",
                                                tooltip: {
                                                  content:
                                                    "Complete over 250 cumulative reps of push ups",
                                                },
                                                children: [{
                                                  id: "limitless-push3",
                                                  icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpush-up-v2.svg?alt=media&token=0aef6257-8688-4b05-8700-b1430b98bdf0",
                                                  title: "Limitless Push3",
                                                  tooltip: {
                                                    content:
                                                      "Complete over 250 cumulative reps of push ups",
                                                  },
                                                  children: [],
                                                }],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                id: "declined-improvement",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fdecline-push-up.svg?alt=media&token=14388979-ec98-47c5-9fc4-37fcc6e5efb5",
                                title: "Declined Improvement",
                                tooltip: {
                                  content:
                                    "Complete over 100 cumulative reps of decline push ups",
                                },
                                children: [
                                  {
                                    id: "ascended-dips",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fdips.svg?alt=media&token=c89b1019-acc9-4356-9fd9-c375588b479d",
                                    title: "Ascended Dips",
                                    tooltip: {
                                      content:
                                        "Complete over 150 cumulative reps of triceps or chest dips ",
                                    },
                                    children: [
                                      {
                                        id: "crunch-crank",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fcrunch.svg?alt=media&token=1e7a83c3-175e-4b7b-a238-858dd9b7430c",
                                        title: "Crunch Crank",
                                        tooltip: {
                                          content:
                                            "Complete over 250 cumulative reps of crunches or sit ups",
                                        },
                                        children: [
                                          {
                                            id: "biceps-pursuit",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fchin-up-v3.svg?alt=media&token=acae5b34-9586-4a5f-b70c-fc5d349fa845",
                                            title: "Biceps Pursuit",
                                            tooltip: {
                                              content:
                                                "Complete over 100 cumulative reps of chin-ups",
                                            },
                                            children: [
                                              {
                                                id: "handstand-victory",
                                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fhandstand-push-up.svg?alt=media&token=7e1debe6-1d4d-43d8-87c2-5440035cbf12",
                                                title: "Handstand Victory",
                                                tooltip: {
                                                  content:
                                                    "Complete over 100 cumulative reps of handstand push ups",
                                                },
                                                children: [],
                                              }
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "big-back",
                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpull-up.svg?alt=media&token=c815d9ed-beb1-4ec4-bf69-1163351ea4fa",
                title: "Big Back",
                tooltip: {
                  content:
                    "Complete over 50 cumulative reps of pull ups",
                },
                children: [
                  {
                    id: "big-legs-big-you",
                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fsingle-leg-squat.svg?alt=media&token=b0cbdd42-da90-4127-8334-b465179375d0",
                    title: "Big Legs Big You",
                    tooltip: {
                      content:
                        "Complete over 75 cumulative reps of pistol squats",
                    },
                    children: [
                      {
                        id: "strong-core-strong-everything",
                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Freverse-crunch.svg?alt=media&token=db9e4754-5cfb-4452-adb6-61adec41e459",
                        title: "Strong Core Strong You",
                        tooltip: {
                          content:
                            "Complete over 125 cumulative reverse crunches",
                        },
                        children: [
                          {
                            id: "iron-biceps",
                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fchin-up-v3.svg?alt=media&token=acae5b34-9586-4a5f-b70c-fc5d349fa845",
                            title: "Iron Biceps",
                            tooltip: {
                              content:
                                "Complete over 75 cumulative reps of chin ups",
                            },
                            children: [
                              {
                                id: "super-saiyan",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fsuperman.svg?alt=media&token=dd1c370a-e054-4755-954c-ab9266c24858",
                                title: "Super Saiyan",
                                tooltip: {
                                  content:
                                    "Complete over 100 cumulative reps of superman raises",
                                },
                                children: [
                                  {
                                    id: "pulling-the-limits",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fpull-up-bar.svg?alt=media&token=c8f6ec93-41ff-4064-9a94-b4dbb3e10559",
                                    title: "Pulling The Limits",
                                    tooltip: {
                                      content:
                                        "Complete over 250 cumulative reps of inverted rows",
                                    },
                                    children: [
                                      {
                                        id: "back-to-back",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fwide-grip-pull-up.svg?alt=media&token=ae0800ee-e261-4590-9d2d-ef0d050f6391",
                                        title: "Back To Back",
                                        tooltip: {
                                          content:
                                            "Complete over 150 cumulative reps of wide grip pull ups",
                                        },
                                        children: [
                                          {
                                            id: "back-to-back2",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fwide-grip-pull-up.svg?alt=media&token=ae0800ee-e261-4590-9d2d-ef0d050f6391",
                                            title: "Back To Back2",
                                            tooltip: {
                                              content:
                                                "Complete over 150 cumulative reps of wide grip pull ups",
                                            },
                                            children: [
                                              
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "stability-master",
                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                            title: "Stability Master",
                            tooltip: {
                              content:
                                "Hold a side plank for 2 cumulative minutes per side and perform 50 single-arm dumbbell rows on each side while balancing on one leg.",
                            },
                            children: [
                              {
                                id: "unshakeable-balance",
                                icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                title: "Unshakeable Balance",
                                tooltip: {
                                  content:
                                    "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                },
                                children: [
                                  {
                                    id: "unshakeable-balance-1",
                                    icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                    title: "Unshakeable Balance 1",
                                    tooltip: {
                                      content:
                                        "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                    },
                                    children: [
                                      {
                                        id: "unshakeable-balance2",
                                        icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                        title: "Unshakeable Balance2",
                                        tooltip: {
                                          content:
                                            "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                        },
                                        children: [
                                          {
                                            id: "unshakeable-balance3",
                                            icon: "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fskill-trees-icons%2Fbarbell-squat.svg?alt=media&token=5b118193-cdf0-4fe8-bbd1-92975522b4ad",
                                            title: "Unshakeable Balance3",
                                            tooltip: {
                                              content:
                                                "Perform 30 single-leg Romanian deadlifts per leg using a 10kg dumbbell to improve balance and core engagement.",
                                            },
                                            children: [
                                              
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },    
                                ],
                              },
                            ],
                          },
                        ],
                      },  
                    ],
                  },    
                ],
              }, 
            ]
          } 

        ]
      }

    ]
  }
export const allMentorsSkillTreesWorkouts:Record<string, MentorData> ={
  /* "krillin":{
    "skillTree":krillinSkillTree,
    "description":"Test"
  }, */
}


/* 

*/