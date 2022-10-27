import app from './app';
import './database';

app.listen(app.get('port'));

console.log('server listening on port', app.get('port'));

//TODO! En el momento si te da un error al ejecutar
//npm run start como ser regeneratorRuntime is not defined
//Debes instalar un plugin de babel para que en produccion
//funcione y es 
//   npm i -D @babel/plugin-transform-runtime
//y revisar el comentario de .babelrc