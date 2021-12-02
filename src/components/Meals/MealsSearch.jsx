import React from 'react';

import Card from '../UI/Card';

import styles from '../../assets/css/MealsListSearch.module.css';
import SearchIcon from '../UI/SearchIcon';

const MealsSearch = ({ mealSearchTerm, setMealSearchTerm }) => {
  const mealSearchChangeHandler = event => {
    setMealSearchTerm(event.target.value);
  };

  return (
    <Card className={styles['meals-search']}>
      <form onSubmit={event => event.preventDefault()}>
        <label htmlFor='meals-search'>Search for meals:</label>
        <input
          onChange={mealSearchChangeHandler}
          value={mealSearchTerm}
          placeholder='Ramen'
          type='text'
          maxLength='20'
          id='meals-search'
        />
        <div className={styles.icon}>
          <SearchIcon />
        </div>
      </form>
    </Card>
  );
};

export default MealsSearch;
