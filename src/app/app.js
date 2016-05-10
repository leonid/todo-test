'use strict'

import 'assets/styles/common.css'

import angular from 'angular'
import 'angular-ui-router'
import 'angular-local-storage'

import routing from './app.routes'
import todo from './features/todo'

angular
  .module('app', [
    'ui.router',
    'LocalStorageModule',

    todo
])
  .config(routing)
