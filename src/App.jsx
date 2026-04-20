import { useState } from "react";
import "./App.css";
const TYPES = [
  "all",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

const PokemonHeading = (props) => {
  return (
    <div className="name">
      <span>{props.name}</span>
    </div>
  );
};

const PokemonType = (props) => {
  return (
    <div>
      {props.types.map((type) => (
        <span className={`type ${type}`} key={type}>{type}</span>
      ))}
    </div>
  );
};

const PokemonStats = (props) => {
  return (
    <table>
      <tbody>
        {Object.entries(props.stats).map(([stat, value]) => (
          <tr key={stat} className="details">
            <th>{stat}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PokemonImage = (props) => {
  return (
    <div className="image-container">
      <img src={props.image} alt="" />
    </div>
  );
};

const SetSideBar = (props) => {
  return (
    <div className="side-bar">
      <SeacrhBar setType={props.setType}></SeacrhBar>
      {TYPES.map((category) => (
        <span
          key={category}
          className="side-bar-link"
          onClick={() => props.setType({ action: "type", category })}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

const PokemonDetails = (props) => {
  return (
    <div className="main-container">
      {props.pokemon.map((pokemon) => (
        <div className="card" key={pokemon.name}>
          <PokemonImage image={pokemon.img} />
          <div className="heading">
            <PokemonHeading name={pokemon.name} />
            <PokemonType types={pokemon.types} />
          </div>
          <PokemonStats stats={pokemon.stats} />
        </div>
      ))}
    </div>
  );
};

const SeacrhBar = (props) => {
  const [value, setValue] = useState("");
  return (
    <label htmlFor="search pokemon">
      <input
        id="search pokemon"
        type="text"
        placeholder="search"
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          props.setType({ action: "search", category: newValue });
        }}
      />
      🔍
    </label>
  );
};

const getCategorizedPokemon = (chosenType, allPokemon) =>
  chosenType === "all"
    ? allPokemon
    : allPokemon.filter((pokemon) =>
      pokemon.types.some((type) => type === chosenType)
    );

const searchPokemon = (value, pokemon) =>
  pokemon.filter((poke) => poke.name.includes(value));

const App = (props) => {
  const [selectedAction, setType] = useState({
    action: "type",
    category: "all",
  });

  const pokemon = selectedAction.action === "search"
    ? searchPokemon(selectedAction.category, props.pokemon)
    : getCategorizedPokemon(selectedAction.category, props.pokemon);

  return (
    <main className="page">
      <SetSideBar setType={setType} />
      <PokemonDetails pokemon={pokemon} />
    </main>
  );
};

export default App;
