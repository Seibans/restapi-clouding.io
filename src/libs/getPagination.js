export const getPagination = (page, size) => {
	//si existe ese limite lo convierte en numero
	//y si no existe por defecto sera 3
	const limit = size ? +size : 3;
	const offset = page ? page * limit : 0;
	return { limit , offset}
}