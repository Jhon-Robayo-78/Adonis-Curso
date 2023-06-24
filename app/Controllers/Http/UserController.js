'use strict'

const User = require('../../Models/User')

class UserController {
    async login({ request, auth}){
        const {email, password} = request.all()
        const token = await auth.attempt(email, password);
        return token;
    }
    async store({request}){
         const {username, email, password } = request.all();
         //console.log(username, email, password)
         const user = await User.create({
            username,
            email,
            password
         })
         return this.login(...arguments);
    }
    async update({request, auth}){
        const {username, email, password} = request.all();
        /*const user = new User(); // usuario autenticado
        user.email = email*/
        const user = auth.getUser();
        user.merge({
            username,
            password
        });

        await user.save();

        return user;
    }
}

module.exports = UserController
