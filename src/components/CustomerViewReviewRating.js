import { useEffect, useState } from "react";
const CustomerViewReviewRating = () => {
  const [reviews, setReviews] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/reviews')
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setReviews(data);
        })
    }, []);  
    const handleClick =((e) => {
      fetch('http://localhost:8000/reviews/' + e.target.value, {
        method: 'DELETE'
      })
    })

  return ( 
        <div className="review-list">
          <h1>Review and Rating Section</h1>
      {reviews && reviews.map(review => (
        <div className="review-preview" key={review.id} >
            <p>{ review.feedback }</p>
            <p>{ review.rating }</p>
            <button value={review.id} onClick={handleClick}>Delete</button>
        </div>
      ))}
    </div>
     );
}
 
export default CustomerViewReviewRating;