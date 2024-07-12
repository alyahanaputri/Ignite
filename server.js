const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDfButBp5tf3F9dFnbQuIcCzZ8KQ6HP1ds");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let messages = [];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("sidebar");
});

app.get("/chatbot", (req, res) => {
  res.render("chatbot", { messages });
});

app.post("/chatbot", async (req, res) => {
  const prompt = req.body.message;
  messages.push({ type: "user", text: userMessage });

  try {
    const result = await model.generateContent(prompt);
    const botResponse = await result.response;
    messages.push({ type: "bot", text: botResponse });
  } catch (error) {
    console.error(error);
    messages.push({ type: "bot", text: "Error generating content." });
  }

  res.redirect("/chatbot");
});

app.get("/goal", (req, res) => {
  res.render("goalTracker");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "usn123" && password === "admin1234#") {
    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
