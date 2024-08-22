import express from 'express';
import dotenv from 'dotenv';
import armaRoutes from './routes/armas.routes';
import crimeRoutes from './routes/crimes.routes';
import criminosoRoutes from './routes/criminoso.routes';
import usuarioRoutes from './routes/usuario.routes';


dotenv.config();

const app = express();
app.use(express.json());

app.use("/armas", armaRoutes());
app.use("/crimes", crimeRoutes());
app.use("/criminosos", criminosoRoutes());
app.use("/usuarios", usuarioRoutes());

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}...`);
});



