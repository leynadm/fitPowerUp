import { IUserExercisesLibrary } from "../interfaces/IUserExercisesLibrary";

type IUserExercisesLibraryObj = {
  exercises: IUserExercisesLibrary[]; // Replace 'Exercise[]' with the actual type
};

function getExercisesMuscleGroups(
  userExercisesLibrary: IUserExercisesLibraryObj[]
) {

  if(userExercisesLibrary.length===0){
    return []
  }
  let uniqueMuscleGroupsArr: string[] = [];

  let userExercisesLibraryArr: IUserExercisesLibrary[] =
    userExercisesLibrary[0].exercises;

  for (let index = 0; index < userExercisesLibraryArr.length; index++) {
    const element = userExercisesLibraryArr[index];

    if (!uniqueMuscleGroupsArr.includes(element.group)) {
      uniqueMuscleGroupsArr.push(element.group);
    }
  }

  uniqueMuscleGroupsArr.sort();

  return uniqueMuscleGroupsArr;
}

export default getExercisesMuscleGroups;
