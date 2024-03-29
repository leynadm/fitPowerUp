import { IUserExercisesLibrary } from "../interfaces/IUserExercisesLibrary";

type IUserExercisesLibraryObj = {
  exercises: IUserExercisesLibrary[]; // Replace 'Exercise[]' with the actual type
};
function getMuscleGroupExercises(exercisesArray:IUserExercisesLibrary[]) {


    const filteredArray: IUserExercisesLibrary[] = exercisesArray.filter(
      (item: IUserExercisesLibrary) => item.group
    );
    filteredArray.sort((a, b) => a.name.localeCompare(b.name));

    return filteredArray;
  }

  export default getMuscleGroupExercises