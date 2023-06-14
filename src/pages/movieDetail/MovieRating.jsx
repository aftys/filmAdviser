import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc,onSnapshot } from 'firebase/firestore';
import { db, auth ,app} from '../../firebase';

const fetchRating = async (film) => {
  const filmRef = doc(getFirestore(app), 'films', film);

  try {
    const filmDoc = await getDoc(filmRef);
    if (filmDoc.exists()) {
      const filmData = filmDoc.data();
      if (filmData.ratings) {
        // Listen for real-time updates using onSnapshot
        onSnapshot(filmRef, (snapshot) => {
          const updatedFilmData = snapshot.data();
          if (updatedFilmData.ratings) {
            // Handle updated ratings
            console.log('Updated ratings:', updatedFilmData.ratings);
          }
        });
        
        return filmData.ratings;
      } else {
        return [];
      }
    }
  } catch (error) {
    console.log('Error while fetching the rating:', error);
  }
};


const FilmRating = ({ idfilm }) => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    setRating(fetchRating(idfilm));
  }, []);

  const calculateAverageRating = (ratings) => {
    if (!ratings.length) {
      return 0;
    }

    const sum = ratings.reduce((accumulator, rating) => accumulator + rating, 0);
    const average = sum / ratings.length;
    return average;
  };

  return (
    <div>
      {rating.forEach((rate) => (
        <p>Average Rating: {calculateAverageRating(rate)}</p>
      ))}
    </div>
  );
};

export default FilmRating;
