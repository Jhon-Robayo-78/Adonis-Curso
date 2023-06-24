'use strict'
const Proyecto = use('App/Models/Proyecto')
const AutirizacionService = use('App/Services/Services')
class ProyectoController {
    async index({ auth }){
        const user = await auth.getUser();
        return await user.proyectos().fetch()
    }
    async create({auth, request}){
        const user = await auth.getUser();
        const { username } = request.all();
        const project = new Proyecto();
        project.fill({
            username
        });
        await user.proyectos().save(project);
        return project;
    }
    async destroy({ auth, response, params }){
        const user = await auth.getUser();
        const { id } = params;
        const project = await Proyecto.find(id);
        AutirizacionService.verificarPermiso(project, user)
        /*if(project.user_id !== user.id){
            return response.status(403).json({message:"Acceso prohibido"})
            
        }*/
        await project.delete();
        return project;
    }
    async update({auth, params, request}){
        const user = await auth.getUser();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        AutirizacionService.verificarPermiso(proyecto, user);
        proyecto.merge(request.only('userid'));
        await proyecto.save();
        return proyecto;
    }
}

module.exports = ProyectoController
