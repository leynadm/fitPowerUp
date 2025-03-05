const admin = require('firebase-admin');

const serviceAccount = require("./../../../fitpowerup-2bbc8-firebase-adminsdk-4sqkn-f443b7517e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Optionally include the projectId, though it's usually in the JSON:
  projectId: serviceAccount.project_id,
});

const db = admin.firestore();

async function migrateWorkoutSessions() {
  try {
    const usersSnapshot = await db.collection('users').get();

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const trainingCollectionRef = db.collection('users').doc(userId).collection('userTrainingCollection');
      const trainingDocsSnapshot = await trainingCollectionRef.get();

      for (const trainingDoc of trainingDocsSnapshot.docs) {
        const data = trainingDoc.data();
        const workoutSessions = data.workoutSessions;
        if (Array.isArray(workoutSessions)) {
          // Reference to the new userWorkouts subcollection
          const userWorkoutsRef = db.collection('users').doc(userId).collection('userWorkouts');
          for (const session of workoutSessions) {
            // Add each session as a new document with an auto-generated ID
            await userWorkoutsRef.add(session);
          }
        }
      }
    }
    console.log("Migration complete!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

migrateWorkoutSessions();
