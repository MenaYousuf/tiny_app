const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const generateRandomString = () => {
  let len = 6;
  let generatedNumber = Math.random()
    .toString(20)
    .substr(2, `${len > 6 ? (len = 6) : (len = 6)}`);
  return generatedNumber;
};

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls/: shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;

  if (req.session.userID  && req.session.userID === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
    res.redirect('/urls');
  } else {
    const errorMessage = 'Unauthorized Access.';
   return errorMessage;
  
}

app.get("/urls/:shortURL", (req, res) => {
  // const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]};
  const shortUrl = req.params.shortURL;
  const longUrl = req.query.longurl; 
  const e = urlDatabase[req.params.shortURL] || longUrl;
  const templateVars = {
    shortURL: shortUrl,
    longURL: e,
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  const newURL = {
    shortURL: longURL,
  };
  const updatedURLDB = {
    ...urlDatabase,    //spread operator (...) this makes a copy of the original urlDatabase object
    [shortURL]: longURL, //dynamically adding the value of the shortURL and making key in the urlDatabase object with the value of the longURL 
  };
  const templateVars = {
    urls: updatedURLDB,
  };
  res.render("urls_index", templateVars);

  //   urlDatabase[shortURL] = longURL
  //   console.log(req.body);
  //   res.redirect(`/urls/${shortURL}`);
});


// app.get('/u/:shortURL', (req, res) => {
//   if (urlDatabase[req.params.shortURL]) {
//     res.redirect(urlDatabase[req.params.shortURL].longURL);
//   } else {
//     const errorMessage = 'This short URL does not exist.';
//     res.status(404).render('urls_error', {user: users[req.session.userID], errorMessage});
//   }
// });
  
  console.log(req.body);  // Log the POST request body to the console
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

app.get("/u/:shortURL", (req, res) => {
  // const longUrlparam = req.params.shortURL;
  // const longUrlQuery = req.query.q;
  // if (longUrlparam === undefined){
  //   longUrlparam = longUrlQuery
  // }

  let longURL = urlDatabase[req.params.shortURL];
  // const query = req.query.q;
  const longUrlQuery = req.query.q;
  if (longURL == undefined) {
    longURL = longUrlQuery;
  }
  // console.log(longURL)
  // res.end("hello")
  // return

  // const query = req.query.q;
  // // const longUrlQuery = req.query.q;
  // if (longURL == undefined) {
  //   longURL = longUrlQuery;
  // }
  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
