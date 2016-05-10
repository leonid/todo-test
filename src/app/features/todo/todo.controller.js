export default class TodoController {
  constructor() {
    // this.model = todoModel

    this.saved = localStorage.getItem('todos')

    this.todos = (localStorage.getItem('todos') !== null)
      ? JSON.parse(this.saved)
      : [{ text: 'Learn AngularJS', done: false }, { text: 'Build an Angular app', done: false }]
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  addTodo() {
    let todoText = this.todoText || 'Заголовок'

    this.todos.push({
      text: todoText,
      done: false,
    })
    this.todoText = ''
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  remaining() {
    var count = 0
    angular.forEach(this.todos, function (todo) {
      count += todo.done ? 0 : 1
    })

    return count
  }

  archive() {
    let oldTodos = this.todos

    this.todos = []
    angular.forEach(oldTodos, function (todo) {
      if (!todo.done)
        this.todos.push(todo)
    })

    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  editTask(taskId) {
    this.todos[taskId].isEdit = true
    this.editable = this.todos[taskId].text
  }

  saveTask(taskId){
    this.todos[taskId].isEdit = false
    this.todos[taskId].text = this.editable
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.editable = ''
  }
}

// TodoController.$inject = ['todoModel']
