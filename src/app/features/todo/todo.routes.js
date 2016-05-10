routes.$inject = ['$stateProvider'];
import template from './todo.html'

export default function routes($stateProvider) {
  $stateProvider
    .state('todo', {
      url: '/',
      template: template,
      controller: 'TodoController',
      controllerAs: 'vm'
    });
}
