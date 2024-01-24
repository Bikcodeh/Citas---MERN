import { Router } from "express";
import { checkAuth } from "../../../../routes/middleware";
import { ProjectController } from "../controller/project.controller";
import { container } from "../../../../config/di/inversify.config";

const router = Router();


const projectController = container.resolve(ProjectController);

router.route('/')
    .get(checkAuth, projectController.getAllProjects)
    .post(checkAuth, projectController.addNewProject)

router.route('/:id')
    .get(checkAuth, projectController.getProject)
    .put(checkAuth, projectController.editProject)
    .delete(checkAuth, projectController.deleteProject);

    router.get('tasks/:id', checkAuth, projectController.getTasks);
    router.post('add-collaborator/:id', checkAuth, projectController.addCollaborator);
    router.get('delete-collaborator/:id', checkAuth, projectController.deleteCollaborator);

export default router;