import React, { useState } from "react";
import "./DietPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";


const mealCovers = {
  breakfast:"/images/breakfast-cover.png",
  lunch: "/images/lunch-cover.png",
  snacks: "/images/snacks-cover.png",
  dinner: "/images/dinner-cover.png"
};
const dietData = {
  breakfast: [
    {
      name: "sleep",
      image: "/images/sleep.png",
      benefits: [
        "Keeps you full longer",
        "Good for digestion",
        "Light & energizing"
      ]
    },
    {
      name: "ragidli",
      image: "/images/ragidli.png",
    }
  ],

  lunch: [
    {
      name: "Rice + Dal",
      image: "/images/dalrice.jpg",
      benefits: [
        "Complete protein combo",
        "Sustained energy",
        "Comfort food"
      ]
    }
  ],

  snacks: [
    {
      name: "Fruit Bowl",
      image: "/images/fruits.jpg",
      benefits: [
        "Natural sugars",
        "Rich in fiber",
        "Hydrating"
      ]
    }
  ],

  dinner: [
    {
      name: "Vegetable Roti",
      image: "/images/roti.jpg",
      benefits: [
        "Light on stomach",
        "Better sleep",
        "Balanced nutrients"
      ]
    }
  ]
};

const DietPage = () => {
  const [openMeal, setOpenMeal] = useState(null);

  const toggleMeal = (meal) => {
    setOpenMeal(openMeal === meal ? null : meal);
  };
const navigate = useNavigate();
  return (
    <div className="page-container">    
    <div className="diet-wrapper">
      <h2 className="diet-title">🍽️ Diet Suggestions</h2>
      <p className="diet-subtitle">
        Choose Consciously...Food is medicine
      </p>
      <div className="meal-grid">           
      {["breakfast", "lunch", "snacks", "dinner"].map((meal) => (
        <div key={meal} className="meal-section">

          {/* MEAL CARD */}
       <div
  className="meal-card"
  style={{
    backgroundImage: `url(${mealCovers[meal]})`
  }}
  onClick={() => navigate(`/diet/${meal}`)}
>
  <div className="meal-overlay">
    <h3 className="meal-title">
      {meal.charAt(0).toUpperCase() + meal.slice(1)}
    </h3>
  </div>
</div>


          {/* EXPANDED CONTENT */}
          {openMeal === meal && (
            <div className="meal-suggestions">
              {dietData[meal].map((item, index) => (
                <div key={index} className="food-card">
                  <img src={item.image} alt={item.name} />
                  <div className="food-info">
                    <h4>{item.name}</h4>
                    <ul>
                      {item.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
              ))}
            </div>
            
          )}

        </div>
        
      ))}
    </div>
    </div>
    
    </div>
    
  );
};

export default DietPage;
