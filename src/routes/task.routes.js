import {Router} from 'express';
import * as taskCtrl from '../controllers/task.controller'

const router = Router();

router.post('/', taskCtrl.createTask);
router.get('/', taskCtrl.getTasks);
//api/tasks/100
//Como hay 2 rutas que hacen match de debe poner
//primero el done para que se haga primero
router.get('/done', taskCtrl.tareasCompletadas);
router.get('/:id', taskCtrl.findOneTask);
router.delete('/:id', taskCtrl.deleteTask);
router.put('/:id', taskCtrl.actualizarTarea)

export default router;