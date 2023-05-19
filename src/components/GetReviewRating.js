import { useEffect, useState } from "react";
const GetReviewRating = () => {

  const [reviews, setReviews] = useState(null);

  // Get Review Rating Entity Component
  const GetReviewRatingEntity = async () => {
    return fetch('http://localhost:8002/reviews')
  }

  // Get Review Rating Controller Component
  useEffect(() => {
      GetReviewRatingEntity()
      .then(res =>{
          return res.json();
      })
      .then(data => {
          setReviews(data);
      })
  }, []);  
    

  return ( 
    <div className="review-list">
      {reviews && reviews.slice(0).reverse().map((review) => (
        <div className="w3-panel w3-leftbar w3-dark-grey w3-round" key={review.id} >
          <p><i>"{ review.feedback }"</i></p>
          <p><i>Rating: { review.rating } / 5</i></p>
        </div>
      ))}
    </div>
  );
}
 
export default GetReviewRating;