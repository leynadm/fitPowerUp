const pathPoints = [
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F1.webp?alt=media&token=8a6d9989-0993-489f-92b2-127cde17d42b",
      bracket: 0,
      id:1,
      quote:"If only I hit the gym more, maybe Raditz wouldn't have turned my head into a vegetable with just one punch! Don't repeat my mistake!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F2.webp?alt=media&token=e076ddd0-5489-4af5-8c10-dd1a8b264db8",
      bracket: 618,
      id:2,
      quote:"The gym is my ring, and these weights are my challengers. Mr. Satan says, let's knock 'em out together!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F3.webp?alt=media&token=424da9b9-4e41-4dd3-b0c0-52498e3decf4",
      bracket: 736,
      id:3,
      quote:"In the gym, even the Turtle Hermit needs his shell. Time to train like a wise old tortoise on steroids! No need to take steroids though!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F4.webp?alt=media&token=27315818-0efe-4071-91b2-d27ddc8db13d",
      bracket: 854,
      id:4,
      quote:"Small in size, big in strength! Let every workout be a testament to the fact that greatness comes in all packages!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F5.webp?alt=media&token=047a5615-a2f5-462a-bdfa-c21826d58d9a",
      bracket: 972,
      id:5,
      quote:"Training's tough, but so is climbing Korin's Tower. Keep pushing, and you'll reach the top of your fitness journey!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F6.webp?alt=media&token=ecc70790-bfe7-4247-a8d6-598a8bc2c130",
      bracket: 1090,
      id:6,
      quote:"They say I'm unlucky in battles, but in the gym, luck has nothing to do with it. Train like never before, and emerge a hero for your close ones!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F7.webp?alt=media&token=8f03b025-c6db-496a-b626-e1b263899cbe",
      bracket: 1208,
      id:7,
      quote:"Why do I shave my head? So the gains reflect off it better, obviously! Train smart and shine bright, my friend."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F8.webp?alt=media&token=27c9d96a-1996-4299-a835-19e0a807062c",
      bracket: 1326,
      id:8,
      quote:"Just as I watch over the planet, I watch over your gains. The gym is your sanctuary, and I'm here to bless those lifts."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F9.webp?alt=media&token=060f31af-57a6-4f2d-a942-b93b31efe535",
      bracket: 1444,
      id:9,
      quote:"The Tri-Beam of workouts: Focus, Discipline, and Flexibility. Master these, and you'll be a true Z warrior in no time."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F10.webp?alt=media&token=e5ce2a82-7d30-4614-83ed-68f225225c2e",
      bracket: 1562,
      id:10,
      quote:"Train like a Namekian - regenerate your energy, push your limits, and rest when needed be. This is the recipe to become green in no time!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F11.webp?alt=media&token=c53d39f2-2de6-4a94-864a-05bff981ccfa",
      bracket: 1680,
      id:11,
      quote:"Just as I chase after stronger opponents, chase after your fitness goals. The gym is your battlefield, so give it your all! And don't forget to yell while lifting."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F12.webp?alt=media&token=7bd994ba-29d2-4bd5-9b27-98ceca984bbb",
      bracket: 1798,
      id:12,
      quote:"The gym is your battlefield. Crush those weights and show them you're a true Saiyan elite. If only Kakarot trained like me, he might have stood a chance by himself alone *ptui*!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F13.webp?alt=media&token=d0ee3b05-d883-452d-81ea-7e78a581992c",
      bracket: 1916,
      id:13,
      quote:"In the gym, I'm like the Destructo Disc – precise, effective, and a bit round. Train like a mini-bald superhero, and you'll be cutting through your fitness goals in no time!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F14.webp?alt=media&token=fcb8de1d-6d0e-4c87-aea7-bc6036fd3cbe",
      bracket: 2034,
      id:14,
      quote:"Why do I wear weighted clothing? Well, it's not just for fashion. It's my way of saying, 'Hey, gravity, is that all you got?' Train with the weights, and soon you'll be defying more than just fashion norms!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F15.webp?alt=media&token=5ed68b37-7675-45f5-bde4-0d459e97780d",
      bracket: 2152,
      id:15,
      quote:"In the gym, I'm like the black sheep of the Saiyan family. But hey, black is slimming, right? Train like the rebellious Saiyan, and watch your physique defy expectations - and potentially your hair!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F16.webp?alt=media&token=d7d76c7a-23c3-4c60-832f-1fe2cdc78470",
      bracket: 2270,
      id:16,
      quote:"They say I'm always hungry. Well, in the gym, I'm hungry for gains! Train like you're on your way to an all-you-can-lift buffet!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F17.webp?alt=media&token=bbf6f9cd-d9ef-44f0-b476-28d65bd8c0b3",
      bracket: 2388,
      id:17,
      quote:"They say a Namekian's power level is measured by his antennas. Well, in the gym, your power level is measured by the weights you lift. Train hard, and watch those antennas—I mean, muscles—grow!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F18.webp?alt=media&token=6b06e4d1-78eb-41cf-9398-1f0667c5e057",
      bracket: 2506,
      id:18,
      quote:"Why do I talk to my pet monkey, Bubbles? Because in the gym, you need a training buddy with a good sense of humor. Always seek to train by yourself, but if sometimes you can have a Bubbles with you then even better!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F19.webp?alt=media&token=b0c0c7ae-0359-438b-89ee-8530e8bc81f7",
      bracket: 2624,
      id:19,
      quote:"Gym time is battle time. Show those weights who's boss, and conquer the gym like a Saiyan warrior. Just don't let Vegeta catch you taking a break!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F20.webp?alt=media&token=3341420a-a96b-4d8c-9669-914bad122832",
      bracket: 2742,
      id:20,
      quote:"Why do I have a third eye? To keep an eye on my gains, of course! Train with focus, and your third eye will witness the transformation."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F21.webp?alt=media&token=32ac25ac-02d4-4bcb-bd64-ec4069707907",
      bracket: 2843,
      id:21,
      quote:"They say Vegeta's the prince, and I'm just the muscle. Well, in the gym, the prince of gains is YOU! Train like royalty, and claim your throne! P.S: Don't tell Vegeta I said that."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F22.webp?alt=media&token=570c877b-e885-4f22-9550-44cbc32e5c9b",
      bracket: 2944,
      id:22,
      quote:"Just as the Namekian Dragon Balls grant wishes, the gym grants gains. Train hard, and your wishes will come true."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F23.webp?alt=media&token=7180ddef-6f27-4a48-a148-c697f3fb35d9",
      bracket: 3045,
      id:23,
      quote:"Why do I study so much? Well, lifting books is great for the brain gains. But in the gym, we're here for muscle gains! Train like a scholar, lift like a Saiyan!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F24.webp?alt=media&token=2b70463d-975d-4e59-b523-8b383932cf3c",
      bracket: 3146,
      id:24,
      quote:"They say I'm always smiling. Well, in the gym, every set is a chance to flex those grin muscles. Smile your way through the burn, and the gains will follow!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F25.webp?alt=media&token=9d1e57fc-b8af-4aa0-bd89-4060a69ac4b2",
      bracket: 3247,
      id:25,
      quote:"They say Saiyans love to fight. Well, in the gym, every rep is a battle, and victory tastes like protein shakes. Train like a warrior, and feast on gains!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F26.webp?alt=media&token=c3b1a14b-3f43-433d-9b68-3547a0705f56",
      bracket: 3348,
      id:26
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F27.webp?alt=media&token=8cf5b904-55a0-4b7a-a9cc-c82ac3b4010c",
      bracket: 3449,
      id:27
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F28.webp?alt=media&token=7741f0c3-47e1-4cc8-bcba-fd1adbfbe5c9",
      bracket: 3550,
      id:28
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F29.webp?alt=media&token=a94d8a29-e9f5-4517-8ae7-dbef8e3a0f32",
      bracket: 3651,
      id:29
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F30.webp?alt=media&token=8d23b0e2-65ae-4400-bb73-c87f4f64c8c2",
      bracket: 3752,
      id:30
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F31.webp?alt=media&token=e6c08457-ce2f-46e4-a07c-535f4e14b4fb",
      bracket: 3853,
      id:31
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F32.webp?alt=media&token=ae15f8b1-3733-4dcc-b6e7-5b8361e0dd7c",
      bracket: 3954,
      id:32
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F33.webp?alt=media&token=09b9c98e-ee84-49ce-8607-fe06cb887afc",
      bracket: 4055,
      id:33
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F34.webp?alt=media&token=ebcd40bc-5f6a-4d52-91d4-b21a08d67cb2",
      bracket: 4156,
      id:34
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F35.webp?alt=media&token=6adeea7a-6b25-40fe-b18a-d7cb8e2246a3",
      bracket: 4257,
      id:35
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F36.webp?alt=media&token=46f11de9-34bd-4f1d-87df-dae222597dc9",
      bracket: 4358,
      id:36
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F37.webp?alt=media&token=4c5d7627-9176-4716-90d6-aa986d6b96fa",
      bracket: 4459,
      id:37
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F38.webp?alt=media&token=77d70224-28d6-4237-8844-752e3ac100c6",
      bracket: 4560,
      id:38
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F39.webp?alt=media&token=b4152cfb-3fb9-421b-a96c-d9bc0c20edc5",
      bracket: 4661,
      id:39
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F40.webp?alt=media&token=9022c61a-e652-4b9c-9e28-099afcb5aea0",
      bracket: 4762,
      id:40
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F41.webp?alt=media&token=0f463ce2-a472-42fa-a8f0-c1947d896ff0",
      bracket: 4839,
      id:41
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F42.webp?alt=media&token=1c818b8d-c167-4675-ab7e-b7464caa1e38",
      bracket: 4916,
      id:42
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F43.webp?alt=media&token=44ceb494-f0b6-47eb-ad2a-2cb1f2f3ed03",
      bracket: 4993,
      id:43
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F44.webp?alt=media&token=7702595b-89bc-4e50-8a9f-f1cbdf40c811",
      bracket: 5070,
      id:44
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F45.webp?alt=media&token=61b78b40-5efa-47b0-99d6-750e3bf4091f",
      bracket: 5147,
      id:45
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F46.webp?alt=media&token=c1c3b00e-1780-4c93-a19f-457ea2bffd2a",
      bracket: 5224,
      id:46
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F47.webp?alt=media&token=cfc12a57-a6e3-4795-ac7b-9bc44fa9bccd",
      bracket: 5301,
      id:47
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F48.webp?alt=media&token=ed6233a2-77c8-4bcb-a992-7b496402f6b2",
      bracket: 5378,
      id:48
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F49.webp?alt=media&token=6df44fc5-bfd6-4997-9a41-70a0476e53dd",
      bracket: 5455,
      id:49
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F50.webp?alt=media&token=bed59a04-718f-4a57-8bdb-12e663a53c3e",
      bracket: 5532,
      id:50
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F51.webp?alt=media&token=e9e4fe5a-7c62-4cd9-8b37-89519333a389",
      bracket: 5609,
      id:51
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F52.webp?alt=media&token=8d4716bd-5ce6-4543-8388-a38e980329e7",
      bracket: 5686,
      id:52
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F53.webp?alt=media&token=166c4c91-2b65-45c4-b4a8-2dbaa798a3ec",
      bracket: 5763,
      id:53
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F54.webp?alt=media&token=f6170f5a-f34b-4690-bf69-d2c4b9e9f7e9",
      bracket: 5840,
      id:54
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F55.webp?alt=media&token=997b758d-f747-4797-88b4-88aaee829818",
      bracket: 5917,
      id:55
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F56.webp?alt=media&token=8a3eb3d9-5ecf-4c02-9f12-dc9c6abde3e2",
      bracket: 5994,
      id:56
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F57.webp?alt=media&token=49a0bc45-a9ae-4c0c-959e-c753318dd9d1",
      bracket: 6071,
      id:57
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F58.webp?alt=media&token=e188bbd6-a497-4456-90cb-d98122ed0f3a",
      bracket: 6148,
      id:58
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F59.webp?alt=media&token=703308bb-7166-4aa8-a22e-6c5e59975302",
      bracket: 6225,
      id:59
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F60.webp?alt=media&token=6fd82ae0-d07f-4a6d-8e2e-c34e33bd1b25",
      bracket: 6302,
      id:60
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F61.webp?alt=media&token=fe31abe3-cbf2-4ae5-8004-2c8fb76e72f7",
      bracket: 6367,
      id:61
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F62.webp?alt=media&token=c4956f41-0b8b-4c6a-af25-a91d521dd172",
      bracket: 6432,
      id:62
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F63.webp?alt=media&token=17d17f88-197b-4251-a8b3-c277fd49a834",
      bracket: 6497,
      id:63
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F64.webp?alt=media&token=e7cfcb1e-86a3-4179-aea1-11eafdf98611",
      bracket: 6562,
      id:64
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F65.webp?alt=media&token=33e8d4ed-b5a0-4a4b-9f4a-a0c928eb15ad",
      bracket: 6627,
      id:65
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F66.webp?alt=media&token=50d6abb1-2afb-4b70-a1d1-65ce0f8cefd0",
      bracket: 6692,
      id:66
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F67.webp?alt=media&token=ebefd92f-06dc-4d1e-adc6-0f62ca7b769c",
      bracket: 6757,
      id:67
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F68.webp?alt=media&token=f6690955-f412-4776-a350-c7ca999515e6",
      bracket: 6822,
      id:68
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F69.webp?alt=media&token=6a8bdcf6-a636-4362-ae3a-eca938d78e3e",
      bracket: 6887,
      id:69
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F70.webp?alt=media&token=d2b24e9a-a932-448f-9193-2d434e29b523",
      bracket: 6952,
      id:70
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F71.webp?alt=media&token=0ec90c29-f975-400b-a005-64ae3d04afbc",
      bracket: 7017,
      id:71
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F72.webp?alt=media&token=94a00012-8cb0-4fce-85ce-e8c11a3479d2",
      bracket: 7082,
      id:72
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F73.webp?alt=media&token=6bfcb4c9-ed2d-4249-a861-9859decb05ff",
      bracket: 7147,
      id:73
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F74.webp?alt=media&token=631444a7-ccde-4295-adc5-988290b02b80",
      bracket: 7212,
      id:74
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F75.webp?alt=media&token=88e02944-5680-4c57-b22f-ac6cc766e178",
      bracket: 7277,
      id:75
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F76.webp?alt=media&token=bcfb2ff1-2698-4039-b9d5-11b8b3c82388",
      bracket: 7342,
      id:76
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F77.webp?alt=media&token=0982bd64-c0dd-4073-9631-fa029e6c2752",
      bracket: 7407,
      id:77
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F78.webp?alt=media&token=8e5127ca-393d-4f18-a23c-b00ab960b54f",
      bracket: 7472,
      id:78
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F79.webp?alt=media&token=f79f73cc-c55a-44fa-b746-7815a2246165",
      bracket: 7537,
      id:79
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F80.webp?alt=media&token=8dfa678d-0837-4ec2-a866-4ffa91f612e6",
      bracket: 7602,
      id:80
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F81.webp?alt=media&token=9eaa4022-af62-4729-b3bd-f778c16778ff",
      bracket: 7643,
      id:81
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F82.webp?alt=media&token=c269140d-afa2-48af-b74a-790fb7cdbcc9",
      bracket: 7684,
      id:82
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F83.webp?alt=media&token=ebacd761-fefe-478a-8aa7-fa4731b7a048",
      bracket: 7725,
      id:83
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F84.webp?alt=media&token=510824c7-decb-4064-955e-880307981535",
      bracket: 7766,
      id:84
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F85.webp?alt=media&token=df55badb-5d73-44a0-baee-b57e00e3fd56",
      bracket: 7807,
      id:85
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F86.webp?alt=media&token=29d5438a-4402-4a05-97ba-bf588490574f",
      bracket: 7848,
      id:86
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F87.webp?alt=media&token=ce9b5263-702b-4b09-a167-6c0d2228f59f",
      bracket: 7889,
      id:87
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F88.webp?alt=media&token=422e9f83-361f-421e-8fe5-cf4dc0989fd8",
      bracket: 7930,
      id:88
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F89.webp?alt=media&token=27f87ab7-d736-4129-976b-d44dcaa6c411",
      bracket: 7971,
      id:89
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F90.webp?alt=media&token=ffbda6fd-9741-4bae-b186-e400c6ee5fe7",
      bracket: 8012,
      id:90
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F91.webp?alt=media&token=ad1c32c1-3f9b-4f8a-997a-b6d9cea8268a",
      bracket: 8053,
      id:91
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F92.webp?alt=media&token=c5830a96-cabb-4735-ab79-fb981d2a361d",
      bracket: 8094,
      id:92
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F93.webp?alt=media&token=a90c743c-8a15-44cb-912f-242faed3617b",
      bracket: 8135,
      id:93
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F94.webp?alt=media&token=02dde392-b46e-44e8-bdd8-0d82f11d9ed1",
      bracket: 8176,
      id:94
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F95.webp?alt=media&token=5d13647c-2a4c-43c2-99d9-ce1912b0a786",
      bracket: 8217,
      id:95
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F96.webp?alt=media&token=3f6fe4b2-26ba-4b31-aead-19d0d7172e40",
      bracket: 8258,
      id:96
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F97.webp?alt=media&token=da6c03e8-52d8-4c68-bb37-bc901d2a8ef7",
      bracket: 8299,
      id:97
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F98.webp?alt=media&token=52cac8c7-a765-499d-be1b-8580e371034c",
      bracket: 8340,
      id:98
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F99.webp?alt=media&token=0d693903-8a66-4c6c-8bc7-b8f0fe6bed59",
      bracket: 8381,
      id:99
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F100.webp?alt=media&token=8411d840-df95-40ec-99e6-865ab76554a0",
      bracket: 8422,
      id:100
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F101.webp?alt=media&token=9b270089-5b3a-4e82-a3b1-b6d0a3640efb",
      bracket: 8450,
      id:101
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F102.webp?alt=media&token=147882f0-b3f7-45dc-8ddc-ce48e8a64c9f",
      bracket: 8478,
      id:102
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F103.webp?alt=media&token=ef3f98de-eb72-4006-8c77-00049e72d64c",
      bracket: 8506,
      id:103
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F104.webp?alt=media&token=58603769-f61c-4955-b01d-fe54f62ceed2",
      bracket: 8534,
      id:104
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F105.webp?alt=media&token=0d9a8ebc-f801-462a-b746-0ad684f6c02d",
      bracket: 8562,
      id:105
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F106.webp?alt=media&token=3baf3aef-d738-49cf-b09e-ac3a3e2a3fb6",
      bracket: 8590,
      id:106
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F107.webp?alt=media&token=68c01bb2-8e9c-494b-bc40-7b470c432c56",
      bracket: 8618,
      id:107
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F108.webp?alt=media&token=3db412ad-c9b2-472f-9cb4-2b31a93e1733",
      bracket: 8646,
      id:108
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F109.webp?alt=media&token=414d6789-11d4-4778-b1e2-522ce56322ce",
      bracket: 8674,
      id:109
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F110.webp?alt=media&token=43aef29f-2302-4c4c-a52b-7e18e71f9660",
      bracket: 8702,
      id:110
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F111.webp?alt=media&token=29f5a98b-3462-410d-ad07-82462932feec",
      bracket: 8730,
      id:111
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F112.webp?alt=media&token=7b66a586-f905-4cf8-92a1-3e0a9adf7b5e",
      bracket: 8758,
      id:112
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F113.webp?alt=media&token=ae4649e4-6276-438b-8487-15f8e3ec038d",
      bracket: 8786,
      id:113
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F114.webp?alt=media&token=a4a56bc9-245d-45f3-88c5-b3fd1242c22a",
      bracket: 8814,
      id:114
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F115.webp?alt=media&token=b7b75ebc-cc39-4afa-a855-d97b0fe9491e",
      bracket: 8842,
      id:115
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F116.webp?alt=media&token=0310ae25-db06-4b37-9e94-3dea51c867be",
      bracket: 8870,
      id:116
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F117.webp?alt=media&token=7384bb1b-5308-45b9-9cb5-28aaa17a7279",
      bracket: 8898,
      id:117
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F118.webp?alt=media&token=f50973c5-5612-42d6-a5bf-c8b63b5ece50",
      bracket: 8926,
      id:118
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F119.webp?alt=media&token=84a563f2-0987-4a09-b0c6-1e5f3bc69299",
      bracket: 8954,
      id:119
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F120.webp?alt=media&token=af172d67-2275-4f62-9acd-828e5391748f",
      bracket: 8982,
      id:120
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F121.webp?alt=media&token=736687a2-83b1-49eb-8d93-e6c2b3426bca",
      bracket: 9010,
      id:121
    },

  ];

  export default pathPoints