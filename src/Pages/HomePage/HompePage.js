import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import {
  WelcomeCard,
  ExplanationCard,
  StartGameCard,
} from "../../components/Card/Card";

const HomePage = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentCard((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentCard === 3) {
      navigate("/game");
    }
  }, [currentCard, navigate]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.heroImage}>
        {/* Remove <img> tag and place the background image directly in CSS */}
        <div className={styles.cardsContainer}>
          {currentCard === 0 && <WelcomeCard onNext={handleNext} />}
          {currentCard === 1 && <ExplanationCard onNext={handleNext} />}
          {currentCard === 2 && <StartGameCard onNext={handleNext} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
