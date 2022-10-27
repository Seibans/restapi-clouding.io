import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//El trim sirve para que si cuando el usuario me pasa un texto con espacios
//Elimina esos espacios
//'   pablo  '

const taskSchema = new Schema({
	title: {
		type: String,
    required: true,
		//El trim lo que hace es usar la funcion de javascript
		trim: true,
	},
	description: {
		type: String,
		trim: true
	},
	done: {
		type: Boolean,
    default: false
	}
	//El objeto de debajo es para evitar que le añada __v y 
}, {
	versionKey: false,
	timestamps: true,
});
//timestaps es para que cuando creas un nuevo dato aparecen
//Propiedades que son createdAt
//y updateAt
//Sirve para que cuando crees un dato te dira la fecha en la que se creo
//y la fecha Ultima en la que se actualizo
taskSchema.plugin(mongoosePaginate)
export default model('Task', taskSchema);
