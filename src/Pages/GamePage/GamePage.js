import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import styles from "./GamePage.module.css";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ likedPokemons, setLikedPokemons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [likeDislikeVisible, setLikeDislikeVisible] = useState(false);
  const navigate = useNavigate();

  const handleLikeButton = () => {
    navigate("/like");
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${details.data.id}.svg`,
              abilities: details.data.abilities
                .map((ability) => ability.ability.name)
                .join(", "),
              types: details.data.types
                .map((type) => type.type.name)
                .join(", "),
            };
          })
        );
        setCards(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  // Swipe handlers for Tinder-like functionality
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("nope"),
    onSwipedRight: () => handleSwipe("love"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (type) => {
    const card = cards[currentIndex];
    if (!card) return;

    if (type === "love") {
      setAlertMessage("Liked!");
      setAlertType("success");
      setLikedPokemons([...likedPokemons, card]);
    } else {
      setAlertMessage("Disliked!");
      setAlertType("error");
    }

    setOpenAlert(true);
    setLikeDislikeVisible(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setLikeDislikeVisible(false);
    }, 1000);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div className={styles.TinderContainer} {...handlers}>
      <Header like={handleLikeButton} />
      <div
        className={`${styles.TinderStatus} tinder--status ${
          alertType === "success" ? "love" : "nope"
        }`}
      >
        <i className="fa fa-remove"></i>
        <i className="fa fa-heart"></i>
      </div>
      <div className={styles.TinderCards}>
        {/* Conditionally render CircularProgress if loading, else render cards */}
        {loading ? (
          <CircularProgress sx={{ color: "yellow", size: "2rem" }} />
        ) : (
          cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
            <div
              key={card.id}
              className={`${styles.TinderCard} ${index === 0 ? "moving" : ""}`}
              style={{ transform: `translateY(${index * 20}px)` }}
            >
              <img src={card.image} alt={card.name} />
              <h3>{card.name}</h3>
              <p>Types: {card.types}</p>
              <p>Abilities: {card.abilities}</p>
              {/* Conditionally render like/dislike icons */}
              {likeDislikeVisible && (
                <div className={styles.LikeDislikeIcons}>
                  {alertType === "success" ? (
                    <i className={`fa fa-heart ${styles.LikeIcon}`}></i>
                  ) : (
                    <i className={`fa fa-remove ${styles.DislikeIcon}`}></i>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Snackbar for displaying like/dislike alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      {/* Like/Dislike buttons */}
      <div className={styles.TinderButtons}>
        <Button id="nope" onClick={() => handleSwipe("nope")}>
          <i
            className="fa fa-remove"
            style={{ color: "black", fontSize: "32px" }}
          ></i>
        </Button>
        <Button id="love" onClick={() => handleSwipe("love")}>
          <i
            className="fa fa-heart"
            style={{ color: "red", fontSize: "32px" }}
          ></i>
        </Button>
      </div>
    </div>
  );
};

export default PokemonCard;
