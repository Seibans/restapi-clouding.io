import Task from '../models/Task';
import { getPagination } from '../libs/getPagination';

//TODO Hay un paquete de npm que me permite
//controlar mejor lo del try y catch y no tener que escribirlo a cada rato
//express-promise-router - npm

export const getTasks = async (req, res) => {


	//offset es la cantidad de paginas que quiero
	try {

		const {size, page, title} = req.query;

		const condition = title ? {
			title: {$regex: new RegExp(title), $options:"i"}
		}:{};
		console.log(condition);
		const {limit, offset} = getPagination(page, size);
		const data = await Task.paginate(condition, { offset, limit});
		// res.json(data);     devuelve todo
		res.json({
			totalItems: data.totalDocs,
			tasks: data.docs,
			totalPages: data.totalPages,
      currentPage: data.page - 1
		});

	} catch (error) {
		res.status(500).json({
			msg: error.message || 'Algo ocurrio mal mientras se devuelven las tareas'
		})
	}
}

export const createTask = async (req, res) => {


	//TODO!Esto controla que se reciban todas las propiedades para no tener errores adelante

	//! podrias instalar express-validator para mejor control
	//Otro seria joi validator buscalo en google
	if (!req.body.title) {
		return res.status(400).send({
			message:'El contenido no puede estar vacio'
		})
	}
	try {
		const newTask = new Task({
			title: req.body.title,
			description: req.body.description,
			done: req.body.done ? req.body.done : false,
		});
		const taskSaved = await newTask.save();
		res.json(taskSaved)
	} catch (error) {
		res.status(500).json({
			msg: error.message || 'Algo ocurrio mal mientras se creaba la tarea'
		})
	}
}

//Esto no controla si el id existe porque si no lo encuentra
//la peticion se rompe la app
export const findOneTask = async (req, res) => {
	const {id} = req.params;
	try {
		const task = await Task.findById(id);

		if (!task) {
			return res.status(404).json({
				msg: `La tarea con el id ${id} no existe`
			});
		}
		res.json(task);
	} catch (error) {
		res.status(500).json({
			msg: error.message || 'Algo ocurrio mal mientras se buscaba el id'
		})
	}
};

export const deleteTask = async (req, res) => {
	const { id } = req.params
	try {
		const data = await Task.findByIdAndDelete(id);
		res.json({
			msg: `${data.title} Se ha eliminado`,
			data
		});
	} catch (error) {
		res.status(500).json({
			msg: `Algo ocurrio mal mientras se buscaba el id ${id}`
		});
	}
}

export const tareasCompletadas = async (req, res) => {
	try {
		const tasks = await Task.find({done: true})
		res.json(tasks);	
	} catch (error) {
		res.status(500).json({
			msg: `Algo ocurrio mal mientras se pedian las tareas realizadas`
		});
	}
}

export const actualizarTarea = async (req, res) => {
	const {id} = req.params;
	try {
		const updatedTask = await Task.findByIdAndUpdate(id, req.body
			// Por si sale un error de que findOne and update falle
			// ,{useFindAndModify: false,}
		);
	
		//TODO ESTA MIERDA NO DEVUELVE LA TAREA ACTUALIZADA
		//SI ACTUALIZA PERO NO MUESTRA LA NUEVA
		res.json({
			msg: `${updatedTask.title} actualizado`,
			updatedTask
		});
	} catch (error) {
		res.status(500).json({
			msg: `Algo ocurrio mal con el id ${id} al actualizar`
		});
	};
}