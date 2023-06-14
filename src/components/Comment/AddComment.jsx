import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from '../../firebase'
import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, doc, updateDoc, getDoc, arrayUnion, onSnapshot, setDoc } from 'firebase/firestore';

function AddComment({ idfilm }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const navigate = useNavigate();
    // const {idfilm}=useParams();

    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         if (!user) {
    //             navigate('/LogIn');
    //         }
    //     });
    // }, [navigate]);

    useEffect(() => {
        fetchComments();
    }, []);

    const scroll = useRef(); // Declare the useRef hook for scrolling

    const fetchComments = () => {
        const commentRef = doc(db, 'comments', idfilm);
      
        try {
          const unsubscribe = onSnapshot(commentRef, (commentDoc) => {
            if (commentDoc.exists()) {
              const commentData = commentDoc.data();
              if (commentData.comments) {
                setComments([...commentData.comments]);
              }
            }
          });
      
          // Return the unsubscribe function to clean up the snapshot listener
          return () => unsubscribe();
        } catch (error) {
          console.log('Error while fetching the comments:', error);
        }
    };

    const handleComment = (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) {
            navigate('/SignIn'); // Redirect to the sign-in page
            return;
        }

        AddComment(idfilm, comment);
    };

    const responseMessage = (msg) => {
        const successBox = document.querySelector('.success-box');
        const textMessage = successBox.querySelector('.text-message');
        textMessage.innerHTML = '<span>' + msg + '</span>';
        successBox.style.display = 'block';
    };

    async function AddComment(filmId, comment) {
        const userId = auth.currentUser.uid;
        const db = getFirestore();
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}`;
      
        const commentRef = doc(db, 'comments', filmId);
      
        try {
          const commentDoc = await getDoc(commentRef);
      
          if (!commentDoc.exists()) {
            await setDoc(commentRef, {
              comments: [
                {
                  comment: comment,
                  name: auth.currentUser.displayName,
                  image: auth.currentUser.photoURL,
                  date: formattedDate
                }
              ]
            });
          } else {
            await updateDoc(commentRef, {
              comments: arrayUnion({
                comment: comment,
                name: auth.currentUser.displayName,
                image: auth.currentUser.photoURL,
                date: formattedDate
              })
            });
          }
          setComment('');
          scroll.current.scrollIntoView({ behavior: 'smooth' });
      
          console.log('Comment added successfully!');
        } catch (error) {
          console.log('Error while adding the comment:', error);
        }

    }

    return (
        <>
            <div className="max-w-screen-md w-full mx-auto mt-20">
                <div className="flex justify-center items-center mb-6">
                    <h2 className="text-4xl font-light mb-1">Discussion ({comments.length})</h2>
                </div>
                <form className="mb-6" onSubmit={handleComment}>
                    <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-gray-800 border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6" value={comment}
                            className="h-16 px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
                            placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)} required></textarea>
                    </div>
                    <button type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-700">
                        Post comment
                    </button>
                </form>
            </div>
            
            {comments.map((comment, idx) => (
                <article key={idx} className="p-6 mb-6 text-base rounded-lg max-w-screen-md w-full mx-auto bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-white">
                                <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src={comment.image}
                                    alt="Jese Leos" />
                                {comment.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{comment.date}</p>
                        </div>

                        <div id="dropdownComment2"
                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <a href="#"
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                </li>
                                <li>
                                    <a href="#"
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
                </article>
            ))}
                    <span ref={scroll} className=""></span>

        </>
    );
}

export default AddComment;
