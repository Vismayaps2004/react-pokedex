import { useReducer, useState } from "react";
import { produce } from "immer";
import "./App.css";
const TYPES = [
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

const PokemonHeading = ({ name }) => {
  return (
    <div className="name">
      <span>{name}</span>
    </div>
  );
};

const PokemonType = ({ types }) => {
  return (
    <div>
      {types.map((type) => (
        <span className={`type ${type}`} key={type}>{type}</span>
      ))}
    </div>
  );
};

const PokemonStats = ({ stats }) => {
  return (
    <table>
      <tbody>
        {Object.entries(stats).map(([stat, value]) => (
          <tr key={stat} className="details">
            <th>{stat}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const PokemonImage = ({ image }) => {
  return (
    <div className="image-container">
      <img src={image} alt="" />
    </div>
  );
};

const SeacrhBar = ({ dispatch }) => {
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
          dispatch({ type: "search", value: newValue });
        }}
      />
      🔍
    </label>
  );
};

const SetSideBar = ({ dispatch, pokemon }) => {
  return (
    <div className="side-bar">
      <SeacrhBar dispatch={dispatch}></SeacrhBar>
      <button onClick={() => dispatch({ type: "all", pokemon })}>all</button>
      {TYPES.map((category) => (
        <span
          key={category}
          className="side-bar-link"
          onClick={() => dispatch({ type: "type", pokemon, category })}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

const PokemonDetails = ({ pokemon }) => (
  <div className="main-container">
    {pokemon.map((pokemon) => (
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

const reducer = (state, action) => {
  switch (action.type) {
    case "search":
      return produce(
        state,
        (draft) => draft.filter((poke) => poke.name.includes(action.value)),
      );

    case "all":
      return action.pokemon;

    case "type":
      return produce(
        state,
        (draft) =>
          draft.filter((pokemon) =>
            pokemon.types.some((type) => type === action.category)
          ),
      );

    default:
      throw new Error("invalid option");
  }
};

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
