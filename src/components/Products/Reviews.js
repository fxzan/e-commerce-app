import "./Reviews.css";
import reviews from "./reviewData";

function Reviews() {
  const reviewsList = reviews.map((item) => (
    <div key={item.name} className="review-item">
      <div className="review-title">
        <h2>"{item.name}"</h2>
        <div className="review-rating">Rating: ⭐⭐⭐⭐⭐</div>
      </div>
      <div className="review-description">"{item.review}"</div>
    </div>
  ));

  return (
    <div className="product-item-reviews">
      <h2>Reviews</h2>
      {reviewsList}
    </div>
  );
}

export default Reviews;
