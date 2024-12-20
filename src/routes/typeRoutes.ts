import express from "express"
import { createType, deleteType, getType, getTypeOne, updateType } from "../controllers/typeControllers";
import path from "path";

const app = express()
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); 


app.get("/types", (req, res) => {
  getType(req, res)
});

app.get("/type/:id", (req, res) => {
  getTypeOne(req, res)
});

app.post("/createtype/", (req, res) => {
  createType(req, res)
});

app.put("/updatetype/:id", (req, res) => {
  updateType(req, res)
});

app.delete("/deletetype/:id", (req, res) => {
  deleteType(req, res)
});


export default app;
