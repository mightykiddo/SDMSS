import { useEffect, useState } from "react";
const GetReviewRating = () => {
  const [reviews, setReviews] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8002/reviews')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setReviews(data);
        })
    }, []);  
    const handleClick =((e) => {
      fetch('http://localhost:8002/reviews/' + e.target.value, {
        method: 'DELETE'
      })
    })

  return ( 
        <div className="review-list">
          
      {reviews && reviews.map(review => (
        <div className="w3-panel w3-leftbar w3-dark-grey w3-round" key={review.id} >
            <p><i>"{ review.feedback }"</i></p>
            <p><i>Rating: { review.rating } / 5</i></p>
            
        </div>
      ))}
    </div>
     );
}
 
export default GetReviewRating;