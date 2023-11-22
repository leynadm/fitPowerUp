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
      quote:"They say Vegeta's the prince, and I'm just the muscle. Well, in the gym, the Prince of Gains is YOU! Train like royalty, and claim your throne! P.S: Don't tell Vegeta I said that, he's the actual Prince."
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
      id:26,
      quote:"They say I'm always seeking stronger opponents. Well, in the gym, your strongest opponent is the person you were yesterday. Train to surpass that guy, and you'll always be victorious!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F27.webp?alt=media&token=8cf5b904-55a0-4b7a-a9cc-c82ac3b4010c",
      bracket: 3449,
      id:27,
      quote:"Unlike my Saiyan pride, the only place I don't have an ego is in the gym. In there, it's not about showing off – it's about pushing limits, humbling yourself before the weights, and letting the gains speak louder than any ego ever could."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F28.webp?alt=media&token=7741f0c3-47e1-4cc8-bcba-fd1adbfbe5c9",
      bracket: 3550,
      id:28,
      quote:"Think of your workout as a Kamehameha wave. Start slow, build up the energy, and then unleash it all with full power. That's how you conquer those weights!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F29.webp?alt=media&token=a94d8a29-e9f5-4517-8ae7-dbef8e3a0f32",
      bracket: 3651,
      id:29,
      quote:"Transforming into an Oozaru in the gym? That's my warm-up. The real workout is about to begin, and it's going to be legendary!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F30.webp?alt=media&token=8d23b0e2-65ae-4400-bb73-c87f4f64c8c2",
      bracket: 3752,
      id:30,
      quote:"Hey, if we can handle a hundred sit-ups, we can handle a hundred more! It's like eating chips, you can't just have one... or a hundred."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F31.webp?alt=media&token=e6c08457-ce2f-46e4-a07c-535f4e14b4fb",
      bracket: 3853,
      id:31,
      quote:"Don't just stand there looking scared of the dumbbells or barbells, attack them! Pretend they insulted your face. That should fire you up! No, I'm...not talking from experience, what do you mean..."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F32.webp?alt=media&token=ae15f8b1-3733-4dcc-b6e7-5b8361e0dd7c",
      bracket: 3954,
      id:32,
      quote:"Darling, don't just lift those weights, make love to them. Each curl should be as graceful as it is passionate."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F33.webp?alt=media&token=09b9c98e-ee84-49ce-8607-fe06cb887afc",
      bracket: 4055,
      id:33,
      quote:"What is this, a gym for low-class warriors? Push harder! You won't get to my level with those baby weights!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F34.webp?alt=media&token=ebcd40bc-5f6a-4d52-91d4-b21a08d67cb2",
      bracket: 4156,
      id:34,
      quote:"Training's like eating a giant bowl of ramen - it's tough to finish, but man, it feels great when you do!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F35.webp?alt=media&token=6adeea7a-6b25-40fe-b18a-d7cb8e2246a3",
      bracket: 4257,
      id:35,
      quote:"Being bald means I don't have to worry about bad hair days. But in the gym, every day is a good hair day when you're sweating it out and crushing those lifts!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F36.webp?alt=media&token=46f11de9-34bd-4f1d-87df-dae222597dc9",
      bracket: 4358,
      id:36,
      quote:"Being a pretty boy - or girl - is nice, but in the gym, it's all about becoming a beast of raw power and strength! Don't forget about that!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F37.webp?alt=media&token=4c5d7627-9176-4716-90d6-aa986d6b96fa",
      bracket: 4459,
      id:37,
      quote:"You think this is hard? Please, I've had sparring sessions with Kakarot that were more tiring than your entire workout. Push yourself!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F38.webp?alt=media&token=77d70224-28d6-4237-8844-752e3ac100c6",
      bracket: 4560,
      id:38,
      quote:"If Piccolo saw us slacking in the gym, none of us would be able to dodge what would come. Let's give it our all and make him proud!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F39.webp?alt=media&token=b4152cfb-3fb9-421b-a96c-d9bc0c20edc5",
      bracket: 4661,
      id:39,
      quote:"You think this workout is tough? Try holding your breath while performing a time freeze. Actually, that's what failing a squat usually feels like - I have short legs!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F40.webp?alt=media&token=9022c61a-e652-4b9c-9e28-099afcb5aea0",
      bracket: 4762,
      id:40,
      quote:"So what if you're sore? I've fought battles with every bone in my body broken. Your muscles can handle another set!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F41.webp?alt=media&token=0f463ce2-a472-42fa-a8f0-c1947d896ff0",
      bracket: 4839,
      id:41,
      quote:"Remember, every muscle you build should be as show-off-able as Recoome's. If you're not flexing in the mirror, you're not doing it right!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F42.webp?alt=media&token=1c818b8d-c167-4675-ab7e-b7464caa1e38",
      bracket: 4916,
      id:42,
      quote:"Recoome says, show those weights who's boss! And after you're done, give them the good old Recoome pose to celebrate victory!"

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
      id:45,
      quote:"In the gym, be the Burter of your workout group. So fast, so smooth, they won't see you coming... or ever leaving! You gotta lift like Burter - fastest in the universe!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F46.webp?alt=media&token=c1c3b00e-1780-4c93-a19f-457ea2bffd2a",
      bracket: 5224,
      id:46,
      quote:"Kakarot may be a fool, and you might be too, but even a fool can lift a dumbbell. Surpass him, surpass everyone. That's the Saiyan way!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F47.webp?alt=media&token=cfc12a57-a6e3-4795-ac7b-9bc44fa9bccd",
      bracket: 5301,
      id:47,
      quote:"Alright, mate, let's not muck about. Hit those weights like you're smashing a space cricket ball. Full swing, full strength!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F48.webp?alt=media&token=ed6233a2-77c8-4bcb-a992-7b496402f6b2",
      bracket: 5378,
      id:48,
      quote:"Remember, swapping bodies might be easy for me, but it's not an option for you. Train your body like you don't have another one, and who knows, maybe one day you'll be strong enough for me to swap with you!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F49.webp?alt=media&token=6df44fc5-bfd6-4997-9a41-70a0476e53dd",
      bracket: 5455,
      id:49,
      quote:"Training is about shedding your limits, like I shed my weighted gear. Push harder, go further, and reveal the real warrior within."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F50.webp?alt=media&token=bed59a04-718f-4a57-8bdb-12e663a53c3e",
      bracket: 5532,
      id:50,
      quote:"Consider each weight as a stepping stone to your domination! Ha ha ha ha ha! Lift like you're conquering planets, not just pumping iron."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F51.webp?alt=media&token=e9e4fe5a-7c62-4cd9-8b37-89519333a389",
      bracket: 5609,
      id:51,
      quote:"Just as removing my weights reveals my true power, each exercise you complete reveals your true strength. Don't hold back. Train like a Namekian warrior."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F52.webp?alt=media&token=8d4716bd-5ce6-4543-8388-a38e980329e7",
      bracket: 5686,
      id:52,
      quote:"In the gym, you are the emperor of your body - which is good enough considering I rule the universe. But you, you can rule over your muscles with an iron will, and watch as they obey your every command."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F53.webp?alt=media&token=166c4c91-2b65-45c4-b4a8-2dbaa798a3ec",
      bracket: 5763,
      id:53,
      quote:"Just like when I fused with Nail, combining forces can lead to greater strength. Pair your workout with determination, and you'll be unstoppable."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F54.webp?alt=media&token=f6170f5a-f34b-4690-bf69-d2c4b9e9f7e9",
      bracket: 5840,
      id:54,
      quote:"I know best how true power lies in surpassing your limits. Don't be satisfied with mere gains; aim for transformation, like my various forms."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F55.webp?alt=media&token=997b758d-f747-4797-88b4-88aaee829818",
      bracket: 5917,
      id:55,
      quote:"Wearing this Saiyan armor reminds me that we can adapt to any challenge, just like in school. In the gym, embrace every new exercise like adapting to a new world. Push through, no matter how tough it gets."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F56.webp?alt=media&token=8a3eb3d9-5ecf-4c02-9f12-dc9c6abde3e2",
      bracket: 5994,
      id:56,
      quote:"Many times training is about unleashing brute force. Hit those weights like you're destroying those pesky humans on Namek. Show no mercy, show no weakness."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F57.webp?alt=media&token=49a0bc45-a9ae-4c0c-959e-c753318dd9d1",
      bracket: 6071,
      id:57,
      quote:"Even in Saiyan armor, it's not the gear that makes the warrior. It's the heart. Train with heart, and you'll be as strong as any Saiyan!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F58.webp?alt=media&token=e188bbd6-a497-4456-90cb-d98122ed0f3a",
      bracket: 6148,
      id:58,
      quote:"After a Zenkai boost, I feel unstoppable. In the gym, treat every recovery as your own Zenkai. Come back stronger, more determined, and ready to crush any workout that stands in your way."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F59.webp?alt=media&token=703308bb-7166-4aa8-a22e-6c5e59975302",
      bracket: 6225,
      id:59,
      quote:"In my final form, I am a symbol of ultimate power and control - Vegeta knows very well about it. In your workouts, seek the goal of achieving your ultimate form as well." 
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F60.webp?alt=media&token=6fd82ae0-d07f-4a6d-8e2e-c34e33bd1b25",
      bracket: 6302,
      id:60,
      quote:"Even battered and bruised, a Saiyan's spirit never wavers. In the gym, let every ache be a reminder of your strength and every pain a badge of your perseverance - good muscle pain that is, not weird joint pain."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F61.webp?alt=media&token=fe31abe3-cbf2-4ae5-8004-2c8fb76e72f7",
      bracket: 6367,
      id:61,
      quote:"Elegance and power can coexist, as they do in my final form. Let every exercise be a blend of strength and ruthlessness, mirroring the perfection of the universe's ultimate emperor - that's me, not you, but you can also do well."

    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F62.webp?alt=media&token=c4956f41-0b8b-4c6a-af25-a91d521dd172",
      bracket: 6432,
      id:62,
      quote:"Training with Kaioken means never saying 'I can't.' It's all about 'I will' and 'I must.' It's about thinking 'I can lift that weight' and 'I must eat that ramen'. Let's turn up the intensity!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F63.webp?alt=media&token=17d17f88-197b-4251-a8b3-c277fd49a834",
      bracket: 6497,
      id:63,
      quote:"In the face of anger, control is power. Let your workout be your battleground. Conquer your limits with the wrath of a tyrant - but don't be a tyrant, that's my job."

    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F64.webp?alt=media&token=e7cfcb1e-86a3-4179-aea1-11eafdf98611",
      bracket: 6562,
      id:64,
      quote:"Imagine every rep is like gathering energy for a Spirit Bomb. The more you put in, the more powerful you become. Let's charge up!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F65.webp?alt=media&token=33e8d4ed-b5a0-4a4b-9f4a-a0c928eb15ad",
      bracket: 6627,
      id:65,
      quote:"When I'm angry, my power surges. Channel your rage into your workout. Let every lift, every rep, be a release of fury, transforming weakness into strength."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F66.webp?alt=media&token=50d6abb1-2afb-4b70-a1d1-65ce0f8cefd0",
      bracket: 6692,
      id:66,
      quote:"It was done, I became a Super Saiyan, and for that to happen I had to push beyond what I thought was possible. Remember, every workout, every training session, is a step towards your own transformation. Keep pushing."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F67.webp?alt=media&token=ebefd92f-06dc-4d1e-adc6-0f62ca7b769c",
      bracket: 6757,
      id:67,
      quote:"There are four things I cannot tolerate: cowardice, bad haircuts, military insurection and lazyness in the gym. Train like you'd have to fight me to save your specie - not like you'd stand a chance anyway!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F68.webp?alt=media&token=f6690955-f412-4776-a350-c7ca999515e6",
      bracket: 6822,
      id:68,
      quote:"Becoming a Super Saiyan is just the beginning of another journey. What made you get here needs to continue, so you go even further beyond. Let each workout rep be a another step towards legacy."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F69.webp?alt=media&token=6a8bdcf6-a636-4362-ae3a-eca938d78e3e",
      bracket: 6887,
      id:69,
      quote:"Harness the fusion of your raw strength and advanced technology (this app), just like I have. Let your training be a blend of primal force and calculated precision."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F70.webp?alt=media&token=d2b24e9a-a932-448f-9193-2d434e29b523",
      bracket: 6952,
      id:70,
      quote:"The future is uncertain, but your strength isn't. Train like you're preparing for the challenges ahead, and you'll be ready for anything."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F71.webp?alt=media&token=0ec90c29-f975-400b-a005-64ae3d04afbc",
      bracket: 7017,
      id:71,
      quote:"King Cold knows the value of supremacy. In the gym, claim dominion over your fitness journey. *whispers towards the camera* I'm done, I will leave now. Good bye. *walks away slowly*"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F72.webp?alt=media&token=94a00012-8cb0-4fce-85ce-e8c11a3479d2",
      bracket: 7082,
      id:72,
      quote:"Remember, the weights won't fight back like the androids did in my time. But your determination can still make your training an epic battle!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F73.webp?alt=media&token=6bfcb4c9-ed2d-4249-a861-9859decb05ff",
      bracket: 7147,
      id:73,
      quote:"King Cold knows the importance of strength."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F74.webp?alt=media&token=631444a7-ccde-4295-adc5-988290b02b80",
      bracket: 7212,
      id:74,
      quote:"I've faced androids and villains from the future. That squat rack doesn't stand a chance, but that treadmill...that scares me."

    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F75.webp?alt=media&token=88e02944-5680-4c57-b22f-ac6cc766e178",
      bracket: 7277,
      id:75,
      quote:"In the gym, aim to go Super Saiyan, not Super Sandwich! Train hard and stay away from the snacks!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F76.webp?alt=media&token=bcfb2ff1-2698-4039-b9d5-11b8b3c82388",
      bracket: 7342,
      id:76,
      quote:"I absorb energy, you generate strength. *raises eybrows repeatedly* Train like your only chance to stop me is to overload my system with too much energy - damn you Vegeta!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F77.webp?alt=media&token=0982bd64-c0dd-4073-9631-fa029e6c2752",
      bracket: 7407,
      id:77,
      quote:"I am a Super Saiyan."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F78.webp?alt=media&token=8e5127ca-393d-4f18-a23c-b00ab960b54f",
      bracket: 7472,
      id:78,
      quote:"Just as I created androids, you can create a stronger you. Train with the precision of a scientist, and you'll achieve remarkable transformations."
      
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F79.webp?alt=media&token=f79f73cc-c55a-44fa-b746-7815a2246165",
      bracket: 7537,
      id:79,
      quote:"In the gym, I don't just lift weights; I conquer them. Train like you're the Prince of all Lifters, and let your ego fuel your gains!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F80.webp?alt=media&token=8dfa678d-0837-4ec2-a866-4ffa91f612e6",
      bracket: 7602,
      id:80,
      quote:"In the gym, we're all 'upgraded' versions of ourselves. Train like you're the latest model, and leave the outdated habits behind."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F81.webp?alt=media&token=9eaa4022-af62-4729-b3bd-f778c16778ff",
      bracket: 7643,
      id:81,
      quote:"Train like me, and you'll feel as victorious as I did when I defeated Vegeta. Gym battles are the best battles!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F82.webp?alt=media&token=c269140d-afa2-48af-b74a-790fb7cdbcc9",
      bracket: 7684,
      id:82,
      quote:"AAAAAAARRRRRRGGGHHHHHHHHHHHHH!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F83.webp?alt=media&token=ebacd761-fefe-478a-8aa7-fa4731b7a048",
      bracket: 7725,
      id:83,
      quote:"Remember, if your muscles aren't screaming like Krillin on a bad day, you're not training hard enough! Train like a Super Saiyan!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F84.webp?alt=media&token=510824c7-decb-4064-955e-880307981535",
      bracket: 7766,
      id:84,
      quote:"Just as I began as an imperfect creation, your gym journey may have started with imperfections. Look back to what you achieved and embrace them, while still striving for your perfect form."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F85.webp?alt=media&token=df55badb-5d73-44a0-baee-b57e00e3fd56",
      bracket: 7807,
      id:85,
      quote:"Training in the gym is like Namekian fusion - the more you put in, the stronger you become. Just remember to stretch those limbs, or you might end up like a Namekian noodle!"

    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F86.webp?alt=media&token=29d5438a-4402-4a05-97ba-bf588490574f",
      bracket: 7848,
      id:86,
      quote:"In the gym, you're not just lifting weights; you're lifting your spirit. Train like a Super Saiyan, and let your inner warrior shine!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F87.webp?alt=media&token=ce9b5263-702b-4b09-a167-6c0d2228f59f",
      bracket: 7889,
      id:87,
      quote:"Like my Semi-Perfect Form, your journey has been incredbile but there's still room to improve. Keep training, as even though no humans are perfect, they are perfectible."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F88.webp?alt=media&token=422e9f83-361f-421e-8fe5-cf4dc0989fd8",
      bracket: 7930,
      id:88,
      quote:"Remember, even Chiaotzu can keep up with my training, so what would be your excuse?"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F89.webp?alt=media&token=27f87ab7-d736-4129-976b-d44dcaa6c411",
      bracket: 7971,
      id:89,
      quote:"In the gym, we're training for a future where we're stronger than yesterday. Train like a Super Saiyan and leave your past self in the dust!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F90.webp?alt=media&token=ffbda6fd-9741-4bae-b186-e400c6ee5fe7",
      bracket: 8012,
      id:90,
      quote:"Gym time is like the Cell Games - a chance to challenge yourself and prove your strength. Train with determination, and you'll become your own champion!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F91.webp?alt=media&token=ad1c32c1-3f9b-4f8a-997a-b6d9cea8268a",
      bracket: 8053,
      id:91,
      quote:"In the gym, go Super Saiyan and lift weights like they're Dragon Balls! Just remember, no Shenron to wish away those gains!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F92.webp?alt=media&token=c5830a96-cabb-4735-ab79-fb981d2a361d",
      bracket: 8094,
      id:92,
      quote:"Training is like absorbing androids; it's all about making gains."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F93.webp?alt=media&token=a90c743c-8a15-44cb-912f-242faed3617b",
      bracket: 8135,
      id:93,
      quote: "In the gym, go Super Saiyan or go home!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F94.webp?alt=media&token=02dde392-b46e-44e8-bdd8-0d82f11d9ed1",
      bracket: 8176,
      id:94,
      quote:"If I can absorb entire cities to gain strength, you can certainly absorb some protein after your workout. It's the least you can do."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F95.webp?alt=media&token=5d13647c-2a4c-43c2-99d9-ce1912b0a786",
      bracket: 8217,
      id:95,
      quote:"These muscles are from the future, a future me that trained. Make your future you proud."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F96.webp?alt=media&token=3f6fe4b2-26ba-4b31-aead-19d0d7172e40",
      bracket: 8258,
      id:96,
      quote:"In the gym, I'm not just lifting weights; I'm lifting my Saiyan pride. What about you try and do that yourself, hah?"
      
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F97.webp?alt=media&token=da6c03e8-52d8-4c68-bb37-bc901d2a8ef7",
      bracket: 8299,
      id:97,
      quote:"Training hard or hardly training? Push yourself! You don't want to be outdone by a creature made in a lab, do you?"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F98.webp?alt=media&token=52cac8c7-a765-499d-be1b-8580e371034c",
      bracket: 8340,
      id:98,
      quote:"Training should be as fun as a fight with a non-generic enemy. Challenge yourself, but don't forget to enjoy the journey to becoming the strongest!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F99.webp?alt=media&token=0d693903-8a66-4c6c-8bc7-b8f0fe6bed59",
      bracket: 8381,
      id:99,
      quote:"Remember, every time you lift a weight, a Cell Jr. gets scared. Let's make them tremble!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F100.webp?alt=media&token=8411d840-df95-40ec-99e6-865ab76554a0",
      bracket: 8422,
      id:100,
      quote:"Even though perfection might not be in your genes, strive for it in every workout. Remember, I didn't achieve this perfect form by skipping leg day!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F101.webp?alt=media&token=9b270089-5b3a-4e82-a3b1-b6d0a3640efb",
      bracket: 8450,
      id:101,
      quote:"If I can take on Cell, you can take on leg day. No excuses, we've got a world to save and muscles to build!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F102.webp?alt=media&token=147882f0-b3f7-45dc-8ddc-ce48e8a64c9f",
      bracket: 8478,
      id:102,
      quote:"Imagine each weight you lift is that prat Gohan. Now, show me how you'd defeat him. That's the spirit!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F103.webp?alt=media&token=ef3f98de-eb72-4006-8c77-00049e72d64c",
      bracket: 8506,
      id:103,
      quote:"I balance fighting evil and hitting the books. You can balance weights and a bit of cardio!!!"
      
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F104.webp?alt=media&token=58603769-f61c-4955-b01d-fe54f62ceed2",
      bracket: 8534,
      id:104,
      quote:"Piccolo always says, 'Dodge!' But in the gym, it's 'Lift!' Think of each dumbbell as part of your training to protect the Earth!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F105.webp?alt=media&token=0d9a8ebc-f801-462a-b746-0ad684f6c02d",
      bracket: 8562,
      id:105,
      quote:"As the King of the Demon Realm, I decree that skipping a workout is a punishable offense. Don't make me use my evil...you know what!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F106.webp?alt=media&token=3baf3aef-d738-49cf-b09e-ac3a3e2a3fb6",
      bracket: 8590,
      id:106,
      quote:
      "Being good doesn't mean going easy in the gym. Let's show them what a friendly Majin can really do!"
      
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F107.webp?alt=media&token=68c01bb2-8e9c-494b-bc40-7b470c432c56",
      bracket: 8618,
      id:107,
      quote:"Death didn't stop me from getting stronger, and it shouldn't stop you from hitting the gym. Let's train like we've got infinite time!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F108.webp?alt=media&token=3db412ad-c9b2-472f-9cb4-2b31a93e1733",
      bracket: 8646,
      id:108,
      quote:"Remember, every weight you lift is a step away from Kakarot's shadow. You've come far enough to almost train like a Saiyan Prince, not a third-class warrior!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F109.webp?alt=media&token=414d6789-11d4-4778-b1e2-522ce56322ce",
      bracket: 8674,
      id:109,
      quote:"I may be half Goten and half Trunks, but my dedication to the gym is 100%. It should be yours too!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F110.webp?alt=media&token=43aef29f-2302-4c4c-a52b-7e18e71f9660",
      bracket: 8702,
      id:110,
      quote:"Even I need to exercise between meals. You try and burn calories faster than you can eat them, and I'll follow suit!"

    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F111.webp?alt=media&token=29f5a98b-3462-410d-ad07-82462932feec",
      bracket: 8730,
      id:111,
      quote:"In the gym, be a bit like me : a little bit of show-off, a whole lot of hard work. Let's make every rep a performance worth watching!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F112.webp?alt=media&token=7b66a586-f905-4cf8-92a1-3e0a9adf7b5e",
      bracket: 8758,
      id:112,
      quote:"Channel your inner evil - not for destruction, but for construction... of muscles!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F113.webp?alt=media&token=ae4649e4-6276-438b-8487-15f8e3ec038d",
      bracket: 8786,
      id:113,
      quote:"Remember, the weight of the world isn't on your shoulders, but those dumbbells are. Lift them like you're saving the universe - we need to do that a lot around here."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F114.webp?alt=media&token=a4a56bc9-245d-45f3-88c5-b3fd1242c22a",
      bracket: 8814,
      id:114,
      quote:"I got lean by absorbing the strongest fighters. You? You'll have to continue doing it the old-fashioned way - with lots of sweat and grunts!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F115.webp?alt=media&token=b7b75ebc-cc39-4afa-a855-d97b0fe9491e",
      bracket: 8842,
      id:115,
      quote:"I didn't let Babidi control my mind just to see you slack off. Push harder, or I'll push you myself!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F116.webp?alt=media&token=0310ae25-db06-4b37-9e94-3dea51c867be",
      bracket: 8870,
      id:116,
      quote:"Being dead isn't an excuse to stop training. If I can lift weights in Other World, you can lift them on Earth. No slacking!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F117.webp?alt=media&token=7384bb1b-5308-45b9-9cb5-28aaa17a7279",
      bracket: 8898,
      id:117,
      quote:"If you're not flexing in the mirror, are you even working out?"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F118.webp?alt=media&token=f50973c5-5612-42d6-a5bf-c8b63b5ece50",
      bracket: 8926,
      id:118,
      quote:"Majin or not, the only magic you need in the gym is hard work and sweat. Make those dumbbells fear your name!"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F119.webp?alt=media&token=84a563f2-0987-4a09-b0c6-1e5f3bc69299",
      bracket: 8954,
      id:119,
      quote:"I could go even further beyoned, and you can too."
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F120.webp?alt=media&token=af172d67-2275-4f62-9acd-828e5391748f",
      bracket: 8982,
      id:120,
      quote:"Who needs world domination when you can dominate the gym?"
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2Fcharacter-faces%2F121.webp?alt=media&token=736687a2-83b1-49eb-8d93-e6c2b3426bca",
      bracket: 9010,
      id:121,
      quote:"I'm not just Goku or Vegeta, I'm Vegito! And when you train today, you're not just you – you're the best version of yourself. Let's smash this workout!"
    },

  ];

  export default pathPoints