import express from "express"
import { Request, Response } from 'express';
import connection from "../../connectToBase";
import Pokemon from "../models/pokemonModels";


const getPokemon = (req: Request, res: Response) => {
  connection.query('SELECT * FROM pokemon;', function (error: Error, results: Pokemon[]) {
    if (error) {
      console.error('Erreur dans la fonction getAllPokemon', error.message);
      const message = "Erreur lors de la récupération des pokemon";
      return res.status(500).json({ message, error: error.message });
    }
    const message = "Liste des Pokémons récupérée avec succès"
    return res.render('pages/pokemons/allpokemons', { message, pokemons: results });

  });
};

const getPokemonOne = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  connection.query('SELECT * FROM pokemon WHERE id = ?', id, function (error: Error, results: Pokemon[]) {
    if (error) {
      console.error('Erreur dans la fonction getOnePokemon', error.message);
      const message = "Erreur lors de la récupération des pokemon";
      return res.status(500).json({ message, error: error.message });
    }    
    const message = `Détail du pokemon ${id}`
    return res.render('pages/pokemons/showpokemon', { message, pokemon: results[0] });
  });
};

// const getPokemonOne = (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);

//   // Récupérer le Pokémon
//   connection.query(`
//     SELECT * FROM pokemon WHERE id = ?`, [id], function (error: Error, pokemonResults: any[]) {
//     if (error) {
//       console.error('Erreur dans la fonction getPokemonOne', error.message);
//       const message = "Erreur lors de la récupération du Pokémon";
//       return res.status(500).json({ message, error: error.message });
//     }

//     // Récupérer les types du Pokémon
//     connection.query(`
//       SELECT types.identifier, types.generation_id, types.damage_class_id
//       FROM pokemon
//       INNER JOIN pokemon_types ON pokemon_types.pokemon_id = pokemon.id
//       INNER JOIN types ON types.id = pokemon_types.type_id
//       WHERE pokemon.id = ?`, [id], function (error: Error, typesResults: any[]) {
//       if (error) {
//         console.error('Erreur dans la fonction getPokemonTypes', error.message);
//         const message = "Erreur lors de la récupération des types";
//         return res.status(500).json({ message, error: error.message });
//       }

//       // Récupérer les moves du Pokémon
//       connection.query(`
//         SELECT moves.identifier FROM pokemon
//         INNER JOIN pokemon_moves ON pokemon_moves.pokemon_id = pokemon.id
//         INNER JOIN moves ON moves.id = pokemon_moves.move_id
//         WHERE pokemon.id = ?`, [id], function (error: Error, movesResults: any[]) {
//         if (error) {
//           console.error('Erreur dans la fonction getPokemonMoves', error.message);
//           const message = "Erreur lors de la récupération des moves";
//           return res.status(500).json({ message, error: error.message });
//         }

//         // Récupérer les egg groups du Pokémon
//         connection.query(`
//           SELECT egg_groups.identifier 
//           FROM pokemon
//           INNER JOIN pokemon_egg_groups ON pokemon.species_id = pokemon_egg_groups.species_id
//           INNER JOIN egg_groups ON pokemon_egg_groups.egg_group_id = egg_groups.id
//           WHERE pokemon.id = ?;`, [id], function (error: Error, eggGroupsResults: any[]) {
//           if (error) {
//             console.error('Erreur dans la fonction getPokemonEggGroups', error.message);
//             const message = "Erreur lors de la récupération des egg groups";
//             return res.status(500).json({ message, error: error.message });
//           }

//           // Rassembler toutes les données pour la vue
//           const message = `Détail du Pokémon ${id}`;
//           return res.render('pages/pokemons/showpokemon', {
//             message,
//             pokemon: pokemonResults[0],
//             types: typesResults,
//             moves: movesResults,
//             eggGroups: eggGroupsResults
//           });
//         });
//       });
//     });
//   });
// };



const getPokemonType = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  connection.query(`
    SELECT pokemon.id as id, pokemon.identifier as nom, types.identifier, types.generation_id, types.damage_class_id
    FROM pokemon
    INNER JOIN pokemon_types ON pokemon_types.pokemon_id = pokemon.id
    INNER JOIN types ON types.id = pokemon_types.type_id
    WHERE pokemon.id = ?`, id,
    function (error: Error, results: Pokemon[]) {
      if (error) {
        console.error('Erreur dans la fonction getPokemonType', error.message);
        const message = "Erreur lors de la récupération des pokemon";
        return res.status(500).json({ message, error: error.message });
      }
      console.log('Résultats de la requête:', results); // Vérifiez ce qui est retourné
      const message = `Détail du pokemon type ${id}`
      return res.render('pages/pokemons/typepokemon', { message, types: results });
    });
};


const getPokemonMoves = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  connection.query(`
    SELECT pokemon.id as id, pokemon.identifier as nom, moves.*
    FROM pokemon 
    INNER JOIN pokemon_moves ON pokemon_moves.pokemon_id = pokemon.id
    INNER JOIN moves ON moves.id = pokemon_moves.move_id
    WHERE pokemon.id = ?
    LIMIT 12;`, id,
    function (error: Error, results: Pokemon[]) {
      if (error) {
        console.error('Erreur dans la fonction getPokemonMoves', error.message);
        const message = "Erreur lors de la récupération des pokemon";
        return res.status(500).json({ message, error: error.message });
      }
      const message = `Détail du pokemon move ${id}`
      return res.render('pages/pokemons/movespokemon', { message, moves: results });
      //return res.json({ message, moves: results });
    });
};


const getPokemonEggGroup = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  connection.query(`
    SELECT pokemon.id as id, pokemon.identifier as nom, egg_groups.identifier
    FROM pokemon
    INNER JOIN pokemon_egg_groups ON pokemon.species_id = pokemon_egg_groups.species_id
    INNER JOIN egg_groups ON pokemon_egg_groups.egg_group_id = egg_groups.id
    WHERE pokemon.id = ?;`, id,
    function (error: Error, results: Pokemon[]) {
      if (error) {
        console.error('Erreur dans la fonction getPokemonEggGroup', error.message);
        const message = "Erreur lors de la récupération des pokemon";
        return res.status(500).json({ message, error: error.message });
      }
      const message = `Détail du pokemon egg groups ${id}`
      return res.render('pages/pokemons/eggpokemon', { message, eggs: results });
    });
};


const createPokemon = async (req: Request, res: Response) => {
  const newPokemon = {
    id: Number(req.body.id),
    identifier: req.body.identifier,
    species_id: Number(req.body.species_id),
    height: Number(req.body.height),
    weight: Number(req.body.weight),
    base_experience: Number(req.body.base_experience),
    order: Number(req.body.order),
    is_default: Boolean(req.body.is_default)
  };
  console.log("Requête body:", req.body);

  try {
    const addType = await connection.execute('INSERT INTO pokemon (id, identifier, species_id, height, weight, base_experience, `order`, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [newPokemon.id,
      newPokemon.identifier,
      newPokemon.species_id,
      newPokemon.height,
      newPokemon.weight,
      newPokemon.base_experience,
      newPokemon.order,
      newPokemon.is_default
      ])

    console.log(addType)
    const message = `Vous avez ajouter ${JSON.stringify(newPokemon.id)}`
    return res.json({ message, data: newPokemon });

  } catch (error: any) {
    console.error('Erreur dans la creation des pokemons', error.message);
    const message = "Erreur lors de la récupération des pokemon";
    return res.status(500).json({ message, error: error.message });
  }

};


const updatePokemon = async (req: Request, res: Response) => {
  const modifyPokemon = {
    id: Number(req.body.id),
    identifier: req.body.identifier,
    species_id: Number(req.body.species_id),
    height: Number(req.body.height),
    weight: Number(req.body.weight),
    base_experience: Number(req.body.base_experience),
    order: Number(req.body.order),
    is_default: Boolean(req.body.is_default)
  };
  const where = Number(req.params.id)

  console.log("Requête body:", req.body);

  try {
    const majPokemon = await connection.execute('UPDATE pokemon SET id= ?, identifier = ?, species_id = ?, height = ?, weight = ?, base_experience = ?, `order` = ?, is_default = ? WHERE id = ?',
      [modifyPokemon.id,
      modifyPokemon.identifier,
      modifyPokemon.species_id,
      modifyPokemon.height,
      modifyPokemon.weight,
      modifyPokemon.base_experience,
      modifyPokemon.order,
      modifyPokemon.is_default,
        where
      ])

    console.log(majPokemon)
    const message = `Vous avez modifier ${JSON.stringify(modifyPokemon.id)}`
    return res.json({ message, data: modifyPokemon });

  } catch (error: any) {
    console.error('Erreur dans la modification du pokémon', error.message);
    const message = "Erreur lors de la récupération des pokémons";
    return res.status(500).json({ message, error: error.message });
  }

};

const deletePokemon = async (req: Request, res: Response) => {
  const id = req.params.id;

  console.log("Requête body:", req.params);

  try {
    const removePokemon = await connection.execute(`DELETE FROM pokemon WHERE id = ?`,
      [id])

    console.log(removePokemon)
    const message = `Vous avez supprimer ${JSON.stringify(id)}`
    return res.json({ message });

  } catch (error: any) {
    console.error('Erreur dans la suppréssion du pokémon', error.message);
    const message = "Erreur ! L'id que vous avez entrer n'existe pas";
    return res.status(500).json({ message, error: error.message });
  }

};


export { getPokemon, getPokemonOne, getPokemonType, getPokemonMoves, getPokemonEggGroup, createPokemon, updatePokemon, deletePokemon }
