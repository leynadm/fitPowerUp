import { Dispatch, SetStateAction } from 'react';

interface IsetSelectedCategoryExercises {
  setSelectedCategoryExercises: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }[]>
  >;
}

export default IsetSelectedCategoryExercises