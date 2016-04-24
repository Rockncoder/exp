import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {AboutComponent} from './about'
import {LoginComponent} from './login'
import {QuizComponent} from './quiz'
import {PlayerComponent} from './player'

@RouteConfig([
  {
    path: '/about',
    name: 'About',
    component: AboutComponent
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizComponent,
    useAsDefault: true
  },
  {
    path: '/player/:id',
    name: 'Player',
    component: PlayerComponent
  }
])

@Component({
  selector: 'home',
  templateUrl: './templates/home.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})

export class HomeComponent{
  constructor() {
  }
}

