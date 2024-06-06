import "./App.css";
import HomePage from "./Pages/HomePage/HompePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonCard from "./Pages/GamePage/GamePage";
import LikePage from "./Pages/LikePage/LikePage";
import { useState } from "react";
function App() {
  const [likedPokemons, setLikedPokemons] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/game"
            element={
              <PokemonCard
                likedPokemons={likedPokemons}
                setLikedPokemons={setLikedPokemons}
              />
            }
          />
          <Route
            path="/like"
            element={
              <LikePage
                likedPokemons={likedPokemons}
                setLikedPokemons={setLikedPokemons}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
