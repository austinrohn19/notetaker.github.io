const express = require('express');
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.port || 80;

const app = express();

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use("/", htmlRoutes)



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
