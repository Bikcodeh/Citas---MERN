import { Router } from "express";
import { container } from "../../../../config/di/inversify.config";
import { TasksController } from "../controller/tasks.controller";
import { checkAuth } from "../../../../routes/middleware";

const router = Router();

const tasksController = container.resolve(TasksController);

router.post('/', checkAuth, tasksController.addTask)

router.route('/:id')
    .get(checkAuth, tasksController.getTask)
    .put(checkAuth, tasksController.editTask)
    .delete(checkAuth, tasksController.deleteTask);

    router.post('/status/:id', checkAuth, tasksController.changeStatus)

export default router;
