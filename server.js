require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let messages = [];
const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "Don’t let yesterday take up too much of today.",
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.",
  "People who are crazy enough to think they can change the world, are the ones who do.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That’s the classic entrepreneur.",
  "One more dance along the razor's edge finished. Almost dead yesterday, maybe dead tomorrow, but alive, gloriously alive, today.",
  "They say that every snowflake is different. If that were true, how could the world go on? How could we ever get up off our knees? How could we ever recover from the wonder of it?",
  "I believe in God, only I spell it Nature.",
  "Patience Is Not the Ability to Wait: Patience is not the ability to wait. Patience is to be calm no matter what happens, constantly take action to turn it to positive growth opportunities, and have faith to believe that it will all work out in the end while you are waiting.",
  "The time is always right to do the right thing.",
  "Know what you want, work to get it, then value it once you have it.",
  "Dance like you're stamping on a human face forever, love like you've been in a serious car crash that minced the front of your brain, stab like no one can arrest you, and live like there's no such thing as God.",
  "All I ask is one thing, and I’m asking this particularly of young people: please don’t be cynical. I hate cynicism, for the record, it’s my least favorite quality and it doesn’t lead anywhere. Nobody in life gets exactly what they thought they were going to get. But if you work really hard and you’re kind, amazing things will happen.",
  "Stop giving other people the power to control your happiness, your mind, and your life. If you don't take control of yourself and your own life, someone else is bound to try.",
  "I've had a lot of worries in my life, most of which never happened.",
  "In the end you should always do the right thing even if it's hard.",
  "We stood there, looking at each other, saying nothing. But it was the kind of nothing that meant everything. In his eyes, there was no trace of what had happened between us earlier and I could feel something inside me break.So that was that. We were finally, finally over.I looked at him, and I felt so sad, because this thought occurred to me: 'I will never look at you the same way ever again. You ruined me for anyone else.",
  "When something is important enough, you do it even if the odds are not in your favor.",
  "To reach out to the stars, you have to stretch beyond the sky. To be the best, you have to do what’s hardest.",
  "Do not seek the because - in love there is no because, no reason, no explanation, no solutions.",
];

async function prompt(prompt) {
  if (typeof prompt === "string") {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.render("sidebar", { quote: randomQuote });
});

app.get("/chatbot", (req, res) => {
  res.render("chatbot", { messages });
});

app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  messages.push({ type: "user", text: userMessage });

  try {
    const botResponse = await prompt(userMessage);
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
