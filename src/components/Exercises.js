import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises = [], setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      try {
        if (bodyPart === 'all') {
          exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        } else {
          exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
        }

        // Ensure exercisesData is an array
        if (Array.isArray(exercisesData)) {
          setExercises(exercisesData);
        } else {
          console.error('Fetched data is not an array:', exercisesData);
          setExercises([]);
        }
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
        setExercises([]);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Pagination logic
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = Array.isArray(exercises) ? exercises.slice(indexOfFirstExercise, indexOfLastExercise) : [];

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!exercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px', xs: '50px' }, p: '20px' }}>
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.length ? (
          currentExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <Loader />
        )}
      </Stack>
      {exercises.length > exercisesPerPage && (
        <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        </Stack>
      )}
    </Box>
  );
};

export default Exercises;
