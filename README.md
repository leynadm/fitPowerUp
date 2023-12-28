# Introduction
As part of the Odin Project curriculum, fitPowerUp represents my first successful attempt at building a full-stack web application. My goal was to create a Progressive Web App focused on fitness. After a few months of work, I managed to build an app that's both fully functional and engaging. Here's a summary of what I achieved.

![body-tracker](https://github.com/leynadm/files/blob/main/landing-page-overview.gif)

## The Stack
In terms of stack, I relied on tools I discovered while studying through the Odin Project curriculum, as well as technologies I researched based on my needs.
- HTML & CSS: I guess it's self-explanatory.
- TypeScript: Adopting TypeScript was a decision made after receiving mentorship from outside of my Odin Project studies. Although I had no prior experience with TypeScript, I'm very thankful for this advice. I very quickly understood the value TypeScript provides.
- Firebase: Using Firebase as a BaaS was a recommendation from the Odin Project curriculum.
- IndexedDb: The choice to use IndexedDb as a local database was part of my effort to optimize the cost-efficiency of my app's architecture. It allowed for efficient data storage and access without incurring additional server-side costs.
- Recharts: I needed a charting library, and after experiment with react-chartjs-2, I found Recharts to be more accessible and better suited to my project's requirements.
- MaterialUI: As much as I was getting comfortable with CSS, using a UI library was also a curriculum's recommandation. I'm happy to have experimented with Material UI, and it surely sped the development process. In the future I'll be looking at trying other options as well. 

  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-plain.svg" title="Typescript" alt="Typescript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/firebase/firebase-plain.svg" title="Firebase" alt="Firebase" width="40" height="40"/>&nbsp;
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" title="Material UI" alt="Material UI" width="40" height="40"/>&nbsp;
  <img src="https://firebasestorage.googleapis.com/v0/b/matei-daniel-website.appspot.com/o/icons%2FIndexedDB.png?alt=media&token=7a6c33fd-50d3-44a0-9ded-9ba335f2668e&_gl=1*1jx1hrs*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5Njk2MjQzNS4zNS4xLjE2OTY5NjI1NjguNTcuMC4w" title="IndexedDb" alt="IndexedDb" width="60" height="40"/>&nbsp;
  <img src="https://firebasestorage.googleapis.com/v0/b/matei-daniel-website.appspot.com/o/icons%2Frecharts-wide.png?alt=media&token=1705c17d-1f94-4a38-ae46-829aa4a7739b&_gl=1*1cvotfk*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5Njk2MjQzNS4zNS4xLjE2OTY5NjM3MDUuNDcuMC4w" title="Recharts" alt="Recharts" width="60" height="40"/>&nbsp;
</div>

## App Overview
- fitPowerUp is primarily designed to function as an advanced workout log tracker, providing users the ability to record, monitor, and analyze their fitness journey. The entire workflow of the app is streamlined for ease of use and efficiency, requiring the user the lowest possible level of effort in order to interact with a feature. 

### Login:
- Account Creation & Authentication: Users begin by creating an account and securely logging in. For that I'm using Firebase Authentication.
![adding-exercises](https://raw.githubusercontent.com/leynadm/files/main/login-test.gif)

### Adding Workouts
Accessing the Exercise Library: 
- Upon login, users have access to an extensive library of over 1000 exercises. It's a vast collection  that allows users to find and learn about various exercises that suit their fitness goals - and they can add their own exercises too.
Workout Customization:
- Users can then create their own workouts by selecting exercises from the library. They have the option to customize these workouts by adding personal notes, specifying sets and reps, flag more advanced techniques, like dropsets or AMRAP.
![adding-exercises](https://raw.githubusercontent.com/leynadm/files/main/add-exercises.gif)
![adding-exercises](https://raw.githubusercontent.com/leynadm/files/main/complete-workout.gif)

### Preset Workouts
Users are given the ability to create their own custom workouts. They are saved in their own personal workouts libraries, and they seamlessly copy them in their workouts menu during workout days. They can also choose to follow a built-in workout the app provides them with.

![preset-workouts](https://raw.githubusercontent.com/leynadm/files/main/preset-workouts.gif)

### Body Tracker
In adition to workout logging, users can track additional information - like specific body measurements or calories.

![body-tracker](https://raw.githubusercontent.com/leynadm/files/main/body-tracker.gif)

### Data Analysis and Tracking Progress
The app offers in-depth analysis of workout data, covering over 15 key performance indicators. Users can track their progress across various metrics, such as muscle groups worked, overall workout intensity, and consistency.

![analysis](https://raw.githubusercontent.com/leynadm/files/main/analysis-screen.gif)

### Social Component
Additionally, the app integrates a social component, where users can share their progress, follow others, and engage in challenges, further enhancing the workout tracking experience.

![analysis](https://raw.githubusercontent.com/leynadm/files/main/social-component.gif)

### Gamification Features:
The truth is there are a million and one workout loggers out there. The spice of my project was the inspiration from Dragon Ball Z and the elements borrowed from the show. For example:
- The power level feature calculates user's fitness 'power level' using the DOTS coefficient, mirroring DBZ's power scaling.
- Users can also unlock DBZ characters as they progress, each representing a new level of fitness achievement.
- Users can also unlock achievements based on specific workout goals, inspired by milestones in the Dragon Ball Z series.

![analysis](https://raw.githubusercontent.com/leynadm/files/main/gamification-elements.gif)

### Quality of life & Settings
The Calendar is a QoL feature meant to help users easily navigate through their workouts. The settings menu also provides the user with additional customization menu.

![analysis](https://github.com/leynadm/files/blob/main/miscelaneous.gif)

# Things I learned
This is going to be a long list, but I'll try to summarize it and also break it down per topics.

## Front-End Development:
- Development Process: Building fitPowerUp really gave me a glimpse of what web-develoment can look like. There were numerous instances where I envisioned specific functionalities or designs, only to realize afterwards the complexity behind implementing them. This process really help me deepend my understanding of HTML, CSS, and JavaScript and specifically React. A specific example is virtualization. Only after rendering the entire library of exercises at once and have my app crash I realized the need for it...
- React: Using React taught me a lot of how I shouldn't use React. For example, I needed a third refactor of the app to cut the usage of useEffect to 10% of what it originally was - and can probably be improved even further I guess. Transitioning from a prop drilling anti-pattern to using a context variable felt like a brilliant realization. Writing my first custom hook had me leave out a sigh of relief.
- Responsive Design: I created fitPowerUp following a mobile-first design mentality, but I still needed to have it not break on desktop.
- Material UI: Working with Material UI felt a bit like a cheat. Copying components from their documentation and quickly polish them up really helped me with the speed of development. Still, once I started to want to customize my components I realized the trade-offs of a UI library.
- Switching libraries: I initially started working with react-chartjs-2, but it felt very complicated for what I was trying to achieve. By the time I realized I wasn't happy with it, I had already built my visualization functionality. Rewriting all my code for a new library was an experience I hadn't planned for, and I really understood the importance of choosing the right tool for the job.
  
## Backend
- NoSQL data structure: I enjoyed the process of designing the backend of my app. Working with a NoSQL database for the first time was very interesting from an app architecture standpoint. I also realized that I cannot predict how my initial data structure will evolve, and the best I could do is to avoid obvious errors.

## Firebase
- Optimizing costs: Firebase's firestore database is made of documents and Firebase charges for the following: document reads, document writes, document delets. They offer a generous free tier with 50000 free document reads per day. Now, based on my implementation of firebase, current features and a hypothetical average user behaviour, the app could support around ~3000-4000 DAU users within the free tier alone.

## Problem-Solving and Time Management
- Scope Creep: I built this app purely in my free time, mainly weekends, thus the initial design of the app was much simpler and the features list much more limited. I experienced the joy of suddenly coming up with a new feature, and the realization that I would need to modify an integral part of the app to accomodate for it. I learned how "just one more feature" is not a good mantra for trying to release a project. 
 
# Things that could still be done better
Needless to say, I'm very proud of the app and I also realized how it could be much, much better. A few things that come to my mind:
- React: looking at my code, plenty of my components could be rewritten with better reusability in mind.
- Firebase Firestore: The ease of development with Firebase is great, but the temptation to try and keep your reads as low as possible is very high. In my case the issue was that it came at the cost of obviously better development practices. In the end I let my common sense prevail, even though that meant 2-3 reads more.

