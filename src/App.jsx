import { useReducer } from "react";
import "./App.css";
import { PokemonDetails, reducer, SetSideBar } from "./assets/pokemon";

const App = ({ pokemon }) => {
  const [state, dispatch] = useReducer(reducer, pokemon);

  return (
    <main className="page">
      <SetSideBar
        dispatch={dispatch}
        pokemon={pokemon}
      />
      <PokemonDetails pokemon={state} />
    </main>
  );
};

export default App;
