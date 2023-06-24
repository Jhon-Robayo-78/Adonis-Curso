'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

/* metodo de rutas convencional:

Route.post('/user','UserController.store');*/

Route.group(()=>{
  Route.post('user','UserController.store');
  Route.post('log','UserController.login');
  Route.put('update','UserController.update');
  //Rutas de los proyectos
  Route.get('projets','ProyectoController.index').middleware('auth');
  Route.post('projets','ProyectoController.create').middleware('auth');
  Route.delete('projets/:id','ProyectoController.destroy').middleware('auth');
  Route.patch('projets/:id','ProyectoController.update').middleware('auth');
  //Rutas de las tareas
  Route.get('projets/:id/tareas', 'TareasController.index').middleware('auth');
  Route.post('projets/:id/tareas', 'TareasController.create').middleware('auth');
  Route.patch('tareas/:id', 'TareasController.update').middleware('auth');
  Route.delete('tareas/:id', 'TareasController.destroy').middleware('auth');
}).prefix('api/')

