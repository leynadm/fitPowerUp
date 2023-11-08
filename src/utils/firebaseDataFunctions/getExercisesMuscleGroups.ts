import { IUserSelectedExercises } from "../../context/TrainingData";

type IUserSelectedExercisesObj = {
  exercises: IUserSelectedExercises[]; // Replace 'Exercise[]' with the actual type
};

function getExercisesMuscleGroups(
  userSelectedExercises: IUserSelectedExercisesObj[]
) {
  let uniqueMuscleGroupsArr: string[] = [];

  let userSelectedExercisesArr: IUserSelectedExercises[] =
    userSelectedExercises[0].exercises;

  for (let index = 0; index < userSelectedExercisesArr.length; index++) {
    const element = userSelectedExercisesArr[index];

    if (!uniqueMuscleGroupsArr.includes(element.category)) {
      uniqueMuscleGroupsArr.push(element.category);
    }
  }

  uniqueMuscleGroupsArr.sort();

  return uniqueMuscleGroupsArr;
}

export default getExercisesMuscleGroups;
