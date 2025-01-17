const projectDetailService = require('../services/projectDetailService');

class ProjectDetailController {
    constructor(){

    }

    async getAllStatus(request, response){
        const token = request.headers.authorization;

        const status = await projectDetailService.getAllStatus(token);

        response.status(200).send(status);
    }

    async getProjectById(request, response){
        const projectId = request.params.projectId;
        const token = request.headers.authorization;

        const project = await projectDetailService.getProjectById(projectId, token);

        response.status(200).send(project);
    }

    async updateProject(request, response){
        const projectId = request.body.id;
        const projectTitle = request.body.title;
        const projectDescription = request.body.description;
        const projectStatus = request.body.status;
        const token = request.headers.authorization;

        const project = await projectDetailService.updateProject(projectId, projectTitle, projectDescription, projectStatus, token);

        response.status(200).send(project);
    }

    async deleteProject(request, response){
        const projectId = request.query.idProject;
        const token = request.headers.authorization;
        console.log(projectId)

        const project = await projectDetailService.deleteProject(projectId, token);

        response.status(204).send(project);
    }
     
}

module.exports = new ProjectDetailController();