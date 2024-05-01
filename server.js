const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Listen to port 4001");
});

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  const quoteRespond = { quote: randomQuote };
  res.send(quoteRespond);
});

app.get("/api/quotes", (req, res, next) => {
  console.log(req.query.person);
  if (req.query.person) {
    const personName = req.query.person;
    const personArray = quotes.filter(
      (quote) => quote.person.toLowerCase() == personName.toLowerCase()
    );
    if (personArray) {
      res.send({ quotes: personArray });
    } else {
      res.send({});
    }
  } else {
    res.send({ quotes: quotes});
  }
});

app.post('/api/quotes', (req, res, next) => {
    let person = req.query.person;
    let quote = req.query.quote;
    if ( person && quote) {
        quotes.push({ person: person, quote: quote });
        res.send({ quote: quotes[-1]} );
    } else {
        res.status(400);
    }
});
