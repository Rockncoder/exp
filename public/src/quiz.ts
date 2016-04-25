import {Component, OnInit} from 'angular2/core'
import {QuizService} from './quiz-service'
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http';


@Component({
  selector: 'quiz',
  templateUrl: './templates/quiz.html',
  directives: [ROUTER_DIRECTIVES],
  providers:[QuizService, HTTP_PROVIDERS]
})

export class QuizComponent implements OnInit {
  quizList: IQuizList[] = [];
  
  constructor(private _quizService:QuizService) {
  }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz() {
    this._quizService.getQuizzes().then((quiz) => { this.quizList = quiz}, (error)=>console.log(error));
  }
}

