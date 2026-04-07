import { useParams } from "react-router-dom";
import DietPage from "./DietPage";
import dietData from "./data/dietData";
import "../Pages/MealDetails.css";



const MealDetailsPage = () => {
  const { meal } = useParams();
  const foods = dietData[meal] || [];

  return (
    <div className="meal-details-wrapper">
      <h2 className="meal-heading">
        {meal.charAt(0).toUpperCase() + meal.slice(1)} Suggestions
      </h2>

      <div className="meal-grid">
        {foods.map((item, index) => (
          <div key={index} className="food-image-card">
            <img src={item.image} alt={item.name} />

            <div className="food-overlay">
              <h3>{item.name}</h3>
              <ul>
                {item.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealDetailsPage;

