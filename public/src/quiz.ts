import {Component, OnInit} from 'angular2/core'
import {QuizService} from './quiz-service'
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'


@Component({
  selector: 'quiz',
  templateUrl: './templates/quiz.html',
  providers: [QuizService],
  directives: [ROUTER_DIRECTIVES]
})

export class QuizComponent implements OnInit {
  quizList: IQuizList[];
  
  constructor(private _quizService:QuizService) {
  }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this.quizList = this._quizService.getQuizzes();
  }
}

