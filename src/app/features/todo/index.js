import './todo.css';

// import angular from 'angular';
// import uirouter from 'angular-ui-router';

import routing from './todo.routes';
import TodoController from './todo.controller';
// import todoModel from './../services/todo.model';
// import greeting    from '../../directives/greeting.directive';

export default angular
  .module('app.todo',
  [
    //uirouter,
    //todoModel
  ])
  .config(routing)
  .controller('TodoController', TodoController)
  .name;
