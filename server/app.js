// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require("mongoose");

// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

// INIT
const PORT = process.env.PORT || 5000;
const DB = `mongodb+srv://salil:salil3105@cluster0.vkc9afz.mongodb.net/?retryWrites=true&w=majority`
const app = express();


// middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

// Connections
mongoose.connect(DB).then(() => {
    console.log('Database Connections successfully');
}).catch((e) => {
    console.log(e);
});

app.listen(PORT, () => {
    console.log(`connected at port ${PORT}`);
});
