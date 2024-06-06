import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export const WelcomeCard = ({ onNext }) => {
  return (
    <Card sx={{ minWidth: "300px", minHeight: "300px" }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: "center", marginTop: "20%" }}
        >
          Welcome to PokeSwipe!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(245, 96, 41, 0.914)",
            margin: "auto",
            "&:hover": {
              backgroundColor: "rgba(245, 96, 41, 0.7)",
            },
          }}
          onClick={onNext}
        >
          Let's Start!
        </Button>
      </CardActions>
    </Card>
  );
};

export const ExplanationCard = ({ onNext }) => {
  return (
    <Card sx={{ minWidth: "300px", textAlign: "center", maxHeight: "300px" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          How to Play
        </Typography>
        <Typography variant="body2" color="textSecondary">
          In PokeSwipe, you can swipe left or right on Pokémon cards to collect
          your favorites. Swipe right to catch the Pokémon and add it to your
          collection, and swipe left to skip it. Try to catch them all!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(245, 96, 41, 0.914)",
            margin: "auto",
            "&:hover": {
              backgroundColor: "rgba(245, 96, 41, 0.7)",
            },
          }}
          onClick={onNext}
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

export const StartGameCard = ({ onNext }) => {
  return (
    <Card sx={{ minWidth: "300px", textAlign: "center", maxHeight: "300px" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Ready to Start?
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(245, 96, 41, 0.914)",
            margin: "auto",
            "&:hover": {
              backgroundColor: "rgba(245, 96, 41, 0.7)",
            },
          }}
          onClick={onNext}
        >
          Let's Go!
        </Button>
      </CardActions>
    </Card>
  );
};
