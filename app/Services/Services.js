const AccesoInvalidoException = use('App/Exceptions/AccesoInvalidoException')
class AutirizacionService {
    verificarPermiso(recurso, user){
        if(recurso.user_id !== user.id){
            throw new AccesoInvalidoException();
        }
    }
}

module.exports = new AutirizacionService();