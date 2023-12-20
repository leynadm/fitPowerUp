import { IUserExercisesLibrary } from "../interfaces/IUserExercisesLibrary";
type IUserExercisesLibraryObj = {
    exercises: IUserExercisesLibrary[]; // Replace 'Exercise[]' with the actual type
  };

function getFilteredExercises(userExercisesLibrary:IUserExercisesLibraryObj[],muscleGroup?:string) {
    
    if(userExercisesLibrary.length===0){
        return []
      }

    const exercisesArray: IUserExercisesLibrary[] =
    userExercisesLibrary[0].exercises;

    if(muscleGroup){
        const filteredArray: IUserExercisesLibrary[] = exercisesArray.filter(
            (item: IUserExercisesLibrary) => item.group.toLocaleLowerCase() === muscleGroup.toLocaleLowerCase()
          );
          filteredArray.sort((a, b) => a.name.localeCompare(b.name));
      
          return filteredArray;
    }

    return []
  }

  export default getFilteredExercises