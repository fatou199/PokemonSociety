import express, { response } from "express"
import { createPokemon, deletePokemon, getPokemon, getPokemonEggGroup, getPokemonMoves, getPokemonOne, getPokemonType, updatePokemon } from "../controllers/pokemonControllers";
import path from "path";
const router = express.Router()
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); 


app.get("/pokemons", (req, res) => {
  getPokemon(req, res)
});


app.get("/pokemon/:id", (req, res) => {
  getPokemonOne(req, res)
});

app.get("/pokemon/type/:id", (req, res) => {
  getPokemonType(req, res)
});
app.get("/pokemon/moves/:id", (req, res) => {
  getPokemonMoves(req, res)
});
app.get("/pokemon/egggroup/:id", (req, res) => {
  getPokemonEggGroup(req, res)
});

app.post('/createpokemon/', (req, res) => {
  createPokemon(req, res)
})

app.put('/updatepokemon/:id', (req, res) => {
  updatePokemon(req, res)
})

app.delete('/deletepokemon/:id', (req, res) => {
  deletePokemon(req, res)
})




export default app;


