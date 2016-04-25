import {Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http';
import 'rxjs/Rx';

// we use constants to define the definition of our APIs url
const baseUrl = 'api/';
const quizzesEndPoint : string = `quizzes`;
const quizEndPoint : string = `quiz/`;

// injectable allows us to provide the Http object to the service
@Injectable()
export class QuizService implements IQuizService {

  // the Http object is injected to the constructor
  // and assigned to the local variable http
  constructor(private http:Http) {
  }

  // Angular 2 is built for Observable, that's why it requires RxJS
  // but we aren't quite ready for them yet, so we convert
  // the observable to a promise, which we already know
  getQuizzes():Promise<IQuizList[]> {
    return this.http.get(`${baseUrl}${quizzesEndPoint}`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getQuiz(id:number):Promise<IQuizList> {
    return this.http.get(`${baseUrl}${quizEndPoint}${id}`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg);
    throw new Error(errMsg);
  }
}
