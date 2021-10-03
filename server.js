const express = require("express");
const path = require("path");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("views", path.join(__dirname)); // for ejs
app.set("view engine", "ejs"); // for ejs

const quotes = [
  { id: 1, author: "Jean Paul Sartre", quote: "No perdamos nada de nuestro tiempo; quizá los hubo más bellos, pero este es el nuestro." },
  { id: 1, author: "Mahatma Gandhi", quote: "Un minuto que pasa es irrecuperable. Conociendo esto, ¿cómo podemos malgastar tantas horas? " },
  { id: 3, author: "Miguel de Cervantes", quote: "No hay recuerdo que el tiempo no borre ni pena que la muerte no acabe." },
  { id: 4, author: "Hector Berlioz", quote: "Se dice que el tiempo es un gran maestro; lo malo es que va matando a sus discípulos." },
];

app.get("/", (req, res) => {
  res.render("index", { quotes });
});

app.get("/getDay", function (req, res) {
  res.sendFile(__dirname + "/day.html");
});

app.get("/getMonth", function (req, res) {
  res.sendFile(__dirname + "/month.html");
});

app.get("/create", (req, res) => {
  res.render("create", { quotes });
});

app.post("/create", (req, res) => {
  const {author, quote} = req.body;
  quotes.push({author, quote});
  res.render("listo");
});

app.get("/delete", (req, res) => {
    res.render("delete", { quotes });
});

app.get("/delete/:id", (req, res) => {
  const {id} = req.params;
  quotes.splice(id,1);
  res.render("listo");
});

app.post("/delete", (req, res) => {
  const {id} = req.body;
  quotes.splice(id,1);
  res.render("listo");
});

app.listen(3000, () => {
  console.log("Server running...");
});
