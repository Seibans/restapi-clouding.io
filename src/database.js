import mongoose from 'mongoose';
import config from './config';

//Contraseña - k5oVBDqwNEEQW0R7
(async () => {
	try {
		const db = await mongoose.connect(config.mongodbURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//Si te sale un error de las actualizaciones de mongoose se resuleve
			// useFindAndModify: false,
		});
	
		console.log('Database is connected to: ', db.connection.name);
	} catch (error) {
		console.log(error);
	}
})();