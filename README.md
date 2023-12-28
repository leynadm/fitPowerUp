# Introduction
As part of the Odin Project curriculum, fitPowerUp represents my first successful attempt at building a full-stack web application. My goal was to create a Progressive Web App focused on fitness. After a few months of work, I managed to build an app that's both fully functional and engaging. Here's a summary of what I achieved.

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
  <img src="https://firebasestorage.googleapis.com/v0/b/matei-daniel-website.appspot.com/o/icons%2FIndexedDB.png?alt=media&token=7a6c33fd-50d3-44a0-9ded-9ba335f2668e&_gl=1*1jx1hrs*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5Njk2MjQzNS4zNS4xLjE2OTY5NjI1NjguNTcuMC4w" title="IndexedDb" alt="IndexedDb" width="40" height="40"/>&nbsp;
  <img src="https://firebasestorage.googleapis.com/v0/b/matei-daniel-website.appspot.com/o/icons%2Frecharts-wide.png?alt=media&token=1705c17d-1f94-4a38-ae46-829aa4a7739b&_gl=1*1cvotfk*_ga*NjYzMzI3MTUwLjE2OTM5MzIzMjM.*_ga_CW55HF8NVT*MTY5Njk2MjQzNS4zNS4xLjE2OTY5NjM3MDUuNDcuMC4w" title="Recharts" alt="Recharts" width="40" height="40"/>&nbsp;
</div>

## App Overview
- fitPowerUp is primarily designed to function as an advanced workout log tracker, providing users the ability to record, monitor, and analyze their fitness journey. The entire workflow of the app is streamlined for ease of use and efficiency, requiring the user the lowest possible level of effort in order to interact with a feature. 

### Login:
- Account Creation & Authentication: Users begin by creating an account and securely logging in. For that I'm using Firebase Authentication.

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



