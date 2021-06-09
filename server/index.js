const express = require("express");
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

// ROUTES
const authRouter = require("./routes/auth.js");
const appRouter = require("./routes/app.js");

app.use('/auth', authRouter);
app.use('/app', appRouter);

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

// PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => `Listening to PORT: ${PORT}`);