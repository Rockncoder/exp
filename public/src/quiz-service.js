System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var baseUrl, quizzesEndPoint, quizEndPoint, QuizService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            // we use constants to define the definition of our APIs url
            baseUrl = 'api/';
            quizzesEndPoint = "quizzes";
            quizEndPoint = "quiz/";
            // injectable allows us to provide the Http object to the service
            QuizService = (function () {
                // the Http object is injected to the constructor
                // and assigned to the local variable http
                function QuizService(http) {
                    this.http = http;
                }
                // Angular 2 is built for Observable, that's why it requires RxJS
                // but we aren't quite ready for them yet, so we convert
                // the observable to a promise, which we already know
                QuizService.prototype.getQuizzes = function () {
                    return this.http.get("" + baseUrl + quizzesEndPoint)
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
                };
                QuizService.prototype.getQuiz = function (id) {
                    return this.http.get("" + baseUrl + quizEndPoint + id)
                        .toPromise()
                        .then(this.extractData)
                        .catch(this.handleError);
                };
                QuizService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body || {};
                };
                QuizService.prototype.handleError = function (error) {
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg);
                    throw new Error(errMsg);
                };
                QuizService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], QuizService);
                return QuizService;
            }());
            exports_1("QuizService", QuizService);
        }
    }
});
//# sourceMappingURL=quiz-service.js.map