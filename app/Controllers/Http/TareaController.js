'use strict'

const Proyecto = use('App/Models/Proyecto');
const Tarea = use('App/Models/Tarea');
const Services = use('App/Services/Services');

class TareaController {
    async create({auth, request, params }){
        const user = await auth.getUser();
        const { descripcion } = request.all();
        const {id} = params;  
        const proyecto = await Proyecto.find(id)
        Services.verificarPermiso(proyecto, user)      
        const tarea = new Tarea();
        tarea.fill({
            descripcion
        });
        await proyecto.tareas().save(tarea)
        return tarea  
    }
    async index({ auth, params, request }){
        const user = await auth.getUser();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        Services.verificarPermiso(proyecto, user)
        return await proyecto.tareas().fetch();
    }
    async destroy({ auth, params }){
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const project = await tarea.proyecto().fetch();
        AutirizacionService.verificarPermiso(project, user)
        /*if(project.user_id !== user.id){
            return response.status(403).json({message:"Acceso prohibido"})
            
        }*/
        await tarea.delete();
        return tarea;
    }
    async update({auth, params, request}){
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        AutirizacionService.verificarPermiso(tarea, user);
        tarea.merge(request.only(['description', 'completada']));
        await tarea.save();
        return tarea;
    }
}

module.exports = TareaController
