import React, { useState, useEffect } from "react";
import {
  Snackbar,
  Alert,
  Button,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./LikePage.module.css";

const LikePage = ({ likedPokemons, setLikedPokemons }) => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [isLoading, setIsLoading] = useState(true); // State to control loading spinner
  const navigate = useNavigate();

  // Simulating loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Clear timeout when component unmounts
  }, []);

  // Handler to toggle selection of a Pokemon
  const handleCheckboxChange = (pokemon) => {
    if (selectedPokemons.includes(pokemon)) {
      setSelectedPokemons(selectedPokemons.filter((p) => p.id !== pokemon.id));
    } else {
      setSelectedPokemons([...selectedPokemons, pokemon]);
    }
  };

  // Handler to create a team with selected Pokemon
  const handleCreateTeam = () => {
    if (selectedPokemons.length < 2 || selectedPokemons.length > 5) {
      setAlertMessage("Team size must be between 2 and 5 Pokémon.");
      setAlertType("error");
      setOpenAlert(true);
      return;
    }

    setAlertMessage("Team created successfully!");
    setAlertType("success");
    setOpenAlert(true);
  };

  // Handler to close the alert
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // Handler to navigate back to the game page
  const handleBackButton = () => {
    navigate("/game");
  };

  return (
    <div className={styles.LikePageContainer}>
      {/* Page Header */}
      <header className={styles.PageHeader}>
        <h1>Liked Pokémon</h1>
        <div className={styles.HeaderButtons}>
          {/* Button to navigate back to the game page */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBackButton}
          >
            Back to Game
          </Button>
          {/* Button to create a team */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTeam}
          >
            + Create Team
          </Button>
        </div>
      </header>
      {/* Displaying Pokemon Grid */}
      {isLoading ? ( // Show loading spinner while loading
        <div className={styles.CenteredProgress}>
          <CircularProgress sx={{ color: "yellow", size: "2rem" }} />
        </div>
      ) : likedPokemons.length === 0 ? ( // Display message if favorite list is empty
        <div className={styles.EmptyFavorites}>
          <p className={styles.alert}>Please select your favorite Pokémon.</p>
        </div>
      ) : (
        <div className={styles.LikedPokemonGrid}>
          {likedPokemons.map((pokemon) => (
            <div key={pokemon.id} className={styles.LikedPokemonCard}>
              {/* Checkbox to select the Pokemon */}
              <Checkbox
                checked={selectedPokemons.includes(pokemon)}
                onChange={() => handleCheckboxChange(pokemon)}
                className={styles.Checkbox}
              />
              {/* Display Pokemon image, name, types, and abilities */}
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <p>Types: {pokemon.types}</p>
              <p>Abilities: {pokemon.abilities}</p>
            </div>
          ))}
        </div>
      )}
      {/* Snackbar for displaying alerts */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            width: "40vw",
            margin: "0 auto",
          },
        }}
      >
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LikePage;
