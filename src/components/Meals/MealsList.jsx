import React from 'react';

import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';

import styles from '../../assets/css/MealsList.module.css';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy... and green...',
//     price: 18.99,
//   },
//   {
//     id: 'm5',
//     name: 'Ramen',
//     description: 'Delicious japanese soup',
//     price: 14.99,
//   },
//   {
//     id: 'm6',
//     name: 'Borsh',
//     description: 'Ukrainian delicacy',
//     price: 21.99,
//   },
//   {
//     id: 'm7',
//     name: 'Vegatable salad',
//     description: 'A tasty vegan salad',
//     price: 7.99,
//   },
//   {
//     id: 'm8',
//     name: 'Bread Sticks',
//     description: 'Amazing appetizer',
//     price: 2.99,
//   },
//   {
//     id: 'm9',
//     name: 'Lobster',
//     description: 'Luxurious meal for true gourmets',
//     price: 99.99,
//   },
// ];

const MealsList = props => {
  const { isLoading, requestError, meals } = props;

  const mealItems = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <Card className={styles.meals}>
      {isLoading && !requestError && <p>Loading meals...</p>}
      {requestError && !isLoading && <p>{requestError}</p>}
      {mealItems.length > 0 && !isLoading && !requestError ? (
        <ul>{mealItems}</ul>
      ) : (
        <p>Found no meals 😥</p>
      )}
    </Card>
  );
};

export default MealsList;
