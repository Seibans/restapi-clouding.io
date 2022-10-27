import express from 'express';
//Morgan es para ver las peticiones por consola y es un middleware
import morgan from 'morgan';

//TODO PARA PERMITIR QUE CUALQUIER OTRO SERVIDOR PUEDA HACER PETICIONES SE PONE
import cors from 'cors';

import TaskRoutes from './routes/task.routes';

const app = express();

//  settings
app.set('port', process.env.port || 3000);

// middlewares

//*Otra forma de configurar el cors es meter esas opciones debajo
//*de aca y poner la constante en todo el json de abajo 
// const corsOptions = {};
app.use(cors(
	// {
		// Como esta comentado esto basicamente todo puede pedir peticiones
	// 	//TODO Averiguar lo del cors para poder tener las peticiones disponibles desde otro srvidor
	//   
	//  origin: (origin, callback) => callback(null, true),
  //   credentials: true
  // } Esto se genero de Tabnine


	// 	origin: 'http://localhost:3000',
  //   origin: '*',
	// 	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	// 	preflightContinue: false,
  //   optionsSuccessStatus: 204,
	// 	optionsSuccess: null,
	// 	optionsHeaders: null,
	// 	exposeHeaders: null,
	// }
))
app.use(morgan('dev'));
//Esto sirve para que nos reconosca el json del request
app.use(express.json());

//TODO! PARA QUE NUESTRO BACKEND ENTIENDA FORMULARIOS HTML SE PONE
app.use(express.urlencoded({ extended: false }));


app.get('/',(req, res) => {
	res.json({message: 'Hello World!'})
})

app.use('/api/tasks',TaskRoutes);

export default app;