import { Request, Response } from 'express';
import connection from "../../connectToBase";
import Types from "../models/typeModels"

const getType = (req: Request, res: Response) => {
  connection.query('SELECT * FROM types;', function (error: Error, results: Types[]) {
    if (error) {
      console.error('Erreur dans la fonction getAllType', error.message);
      const message = "Erreur lors de la récupération des pokemon";
      return res.status(500).json({ message, error: error.message });
    }
    const message = "Liste des types récupérée avec succès"
    //return res.json({ message, types: results });
    return res.render("pages/types/alltypes", { message, typesAll: results });
  });
};

const getTypeOne = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  connection.query('SELECT * FROM types WHERE id = ?', id, function (error: Error, results: Types[]) {
    if (error) {
      console.error('Erreur dans la fonction getOneType', error.message);
      const message = "Erreur lors de la récupération des pokemon";
      return res.status(500).json({ message, error: error.message });
    }
    const message = `Détail du type ${id}`
    return res.render("pages/types/showtype", { message, typeOne: results[0] });
  });
};


const createType = async (req: Request, res: Response) => {
  const newType = {
    id: Number(req.body.id),
    identifier: req.body.identifier,
    generation_id: Number(req.body.generation_id),
    damage_class_id: Number(req.body.damage_class_id),
  };
  console.log("Requête body:", req.body);

  try {
    const addType = await connection.execute(`INSERT INTO types (id, identifier, generation_id, damage_class_id) VALUES (?,?,?,?)`,
      [newType.id, newType.identifier, newType.generation_id, newType.damage_class_id])

    console.log(addType)
    const message = `Vous avez ajouter ${JSON.stringify(newType.id)}`
    return res.json({ message, data: newType });

  } catch (error: any) {
    console.error('Erreur dans la creation des types', error.message);
    const message = "Erreur lors de la récupération des types";
    return res.status(500).json({ message, error: error.message });
  }

};

const updateType = async (req: Request, res: Response) => {
  const modifyType = {
    id: req.body.id,
    identifier: req.body.identifier,
    generation_id: req.body.generation_id,
    damage_class_id: req.body.damage_class_id,
  };
  const where = parseInt(req.params.id);

  console.log("Requête body:", req.params);

  try {
    const majType = await connection.execute(`UPDATE types SET id = ?, identifier = ?,generation_id = ?, damage_class_id = ? WHERE id = ?;
`,
      [modifyType.id, modifyType.identifier, modifyType.generation_id, modifyType.damage_class_id, where])

    console.log(majType)
    const message = `Vous avez modifier ${JSON.stringify(modifyType.id)}`
    return res.json({ message, data: updateType });

  } catch (error: any) {
    console.error('Erreur dans la mise à jour des types', error.message);
    const message = "Erreur lors de la récupération des types";
    return res.status(500).json({ message, error: error.message });
  }

};


const deleteType = async (req: Request, res: Response) => {
  const id = req.params.id;

  console.log("Requête body:", req.params);

  try {
    const removeType = await connection.execute(`DELETE FROM types WHERE id = ?`,
      [id])

    console.log(removeType)
    const message = `Vous avez supprimer ${JSON.stringify(id)}`
    return res.json({ message });

  } catch (error: any) {
    console.error('Erreur dans la suppréssion du type', error.message);
    const message = "Erreur lors de la récupération des types";
    return res.status(500).json({ message, error: error.message });
  }

};

export { getType, getTypeOne, createType, updateType, deleteType }
