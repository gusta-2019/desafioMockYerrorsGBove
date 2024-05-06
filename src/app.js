//app.js
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");

const prodRouter = require("./routes/prod.router.js");
const produRouter = require("./routes/produ.router.js");


const manejadorError = require("./middleware/error.js");
//compression
const compression = require("express-compression");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//Middleware compression
//app.use(compression());

app.use(compression({
    brotli: {
        enabled: true,
        zlib:{}
    }
}));





app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);
//Middleware para Mock y manejo de errores
app.use("/", prodRouter);
app.use("/", produRouter);
app.use(manejadorError);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

///Websockets: 
const SocketManager = require("./sockets/socketmanager.js");

new SocketManager(httpServer);

