function addMissingExercises() {
/* 
    const request = indexedDB.open('fitScouterDb');
    request.onsuccess = function(event) {
      const db = (event.target as IDBOpenDBRequest).result;
  
      const preselectedExercisesTransaction = db.transaction('preselected-exercises', 'readwrite');
      const preselectedExercisesStore = preselectedExercisesTransaction.objectStore('preselected-exercises');
  
      const userExercisesEntriesTransaction = db.transaction('user-exercises-entries', 'readonly');
      const userExercisesEntriesStore = userExercisesEntriesTransaction.objectStore('user-exercises-entries');
      const userExercisesCursorRequest = userExercisesEntriesStore.openCursor();
  
      const exercisesToAdd:any = [];
  
      userExercisesCursorRequest.onsuccess = function(event) {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          const exercise:any = cursor.value.exercise;
  
          const preselectedExerciseRequest = preselectedExercisesStore.index('exercise_name').get(exercise);
          preselectedExerciseRequest.onsuccess = function(event) {
            const preselectedExercise = (event.target as IDBRequest).result;
          
            let typeOfMeasurement;

            if()
            if (!preselectedExercise) {
                exercisesToAdd.push({
                name: exercise,
                category: cursor.value.category,
                measurement: ['weight', 'reps'],
                id: Date.now() // Assign a unique ID to the exercise
              });
    
            }
          };
  
          cursor.continue();
        } else {

          if (exercisesToAdd.length > 0) {
            const addExercisesTransaction = db.transaction('preselected-exercises', 'readwrite');
            const addExercisesStore = addExercisesTransaction.objectStore('preselected-exercises');
  
            exercisesToAdd.forEach(exercise => {
              addExercisesStore.add(exercise);
            });
  
            addExercisesTransaction.oncomplete = function() {
              console.log('Exercises added successfully!');
            };
  
            addExercisesTransaction.onerror = function(event) {
              console.error('Error adding exercises:', event.target.error);
            };
          } else {
            console.log('No exercises to add.');
          }
        }
      };
    };
 */
  }
 
  export default addMissingExercises;
  