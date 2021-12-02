import React, { useEffect, useState } from 'react';

import MealsSummary from './MealsSummary';
import MealsSearch from './MealsSearch';
import MealsList from './MealsList';
import useHttp from '../../hooks/use-http';
import { FIREBASE_URL } from '../../HIDDEN';

const Meals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [mealSearchTerm, setMealSearchTerm] = useState('');

  const { isLoading, requestError, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    fetchMeals({ url: `${FIREBASE_URL}meals.json` }, receivedMeals =>
      setMealsData(receivedMeals)
    );
  }, [fetchMeals]);

  let filteredMeals = mealsData;

  if (mealSearchTerm !== '') {
    filteredMeals = mealsData.filter(meal =>
      meal.name.toLowerCase().includes(mealSearchTerm.toLowerCase())
    );
  }

  return (
    <>
      <MealsSummary />
      <MealsSearch
        mealSearchTerm={mealSearchTerm}
        setMealSearchTerm={setMealSearchTerm}
      />
      <MealsList
        isLoading={isLoading}
        requestError={requestError}
        meals={filteredMeals}
      />
    </>
  );
};

export default Meals;
