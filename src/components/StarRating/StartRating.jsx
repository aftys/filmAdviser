import React, { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { auth,db } from '../../firebase';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StarRating({ idfilm }) {
    const [rating, setRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const navigate = useNavigate();
    const notify = (msg) => toast(msg);

    useEffect(() => {
        // Check if the user is already logged in
        auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/LogIn');
            }
        });
    }, [navigate]);

    useEffect(() => {
        fetchRating();
    }, [userRating]);

    const fetchRating = async () => {
        const userId = auth.currentUser?.uid;
        const filmRef = doc(db, 'films', idfilm);

        try {
            const filmDoc = await getDoc(filmRef);
            if (filmDoc.exists()) {
                const filmData = filmDoc.data();
                if (filmData.ratings && filmData.ratings[userId]) {
                    setUserRating(filmData.ratings[userId]);
                    setRating(filmData.ratings[userId]);
                } else {
                    setUserRating(null);
                    setRating(0);
                }
            }
        } catch (error) {
            console.log('Error while fetching the rating:', error);
        }
    };

    const handleMouseOver = (value) => {
        setRating(value);
    };

    const handleMouseOut = () => {
        setRating(userRating || 0);
    };

    const handleClick = (value) => {
        const user = auth.currentUser;
        if (!user) {
            navigate('/SignIn'); // Redirect to the sign-in page
            return;
        }

        let msg = '';
        if (value > 1) {
            msg = 'Thanks! You rated this ' + value + ' stars.';
        } else {
            msg = 'We will improve ourselves. You rated this ' + value + ' stars.';
        }
        notify(msg);
        addRating(idfilm, value);
       
    };


    async function addRating(filmId, stars) {
        const userId = auth.currentUser.uid;
        const db = getFirestore();

        const filmRef = doc(db, 'films', filmId);
        
        try {
            const filmDoc = await getDoc(filmRef);

            if (filmDoc.exists()) {
                await updateDoc(filmRef, {
                    [`ratings.${userId}`]: stars,
                });
                setUserRating(stars);
            } else {
                await setDoc(filmRef, {
                    ratings: {
                        [userId]: stars,
                    },
                });
                setUserRating(stars);
            }

            console.log('Rating added successfully!');
        } catch (error) {
            console.log('Error while adding the rating:', error);
        }
    }

    const handleRating = (value) => {
        if (auth.currentUser) {
            handleClick(value);
        } else {
            navigate('/LogIn');
        }
    };

    return (
        <>
            <div className='headerStar text-center'>
                <h2>Rate This Film</h2>
            </div>

            <section className='rating-widget'>
                <div className='rating-stars text-center'>
                    <ul id='stars'>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <li
                                key={value}
                                className={`star ${value <= (userRating || rating) ? 'selected' : ''}`}
                                title={value}
                                onMouseOver={() => handleMouseOver(value)}
                                onMouseOut={handleMouseOut}
                                onClick={() => handleRating(value)}
                            >
                                <i className='fa fa-star fa-fw'></i>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div className='success-box'>
                    <div className='text-message'></div>
                </div> */}
                <ToastContainer
                    theme="dark"
                    hideProgressBar={true}

                />
            </section>
        </>
    );
}
