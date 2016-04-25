System.register(['angular2/core', 'angular2/router', './quiz-service', './Seek', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, quiz_service_1, Seek_1, http_1;
    var Position, PlayerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (quiz_service_1_1) {
                quiz_service_1 = quiz_service_1_1;
            },
            function (Seek_1_1) {
                Seek_1 = Seek_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            // an internal class
            Position = (function () {
                function Position(maxPosition) {
                    this.total = maxPosition || 0;
                    this.index = 0;
                }
                Position.prototype.setMax = function (maxPosition) {
                    this.total = maxPosition;
                };
                Position.prototype.seek = function (direction) {
                    switch (direction) {
                        case Seek_1.Seek.Forward:
                            if (this.index < this.total) {
                                this.index += 1;
                            }
                            break;
                        case Seek_1.Seek.Backward:
                            if (this.index) {
                                this.index -= 1;
                            }
                            break;
                        case Seek_1.Seek.Beginning:
                            this.index = 0;
                    }
                };
                Position.prototype.getPosition = function () {
                    return this.index;
                };
                Position.prototype.getTotal = function () {
                    return this.total;
                };
                return Position;
            }());
            PlayerComponent = (function () {
                function PlayerComponent(_quizService, _location, _routeParams) {
                    var _this = this;
                    this._quizService = _quizService;
                    this._location = _location;
                    this._routeParams = _routeParams;
                    this.answers = [];
                    this.showAnswers = false;
                    this.index = 0;
                    this.total = 0;
                    this.right = 0;
                    this.percent = 0;
                    this.responses = [];
                    this.title = "";
                    this.tagLine = "";
                    // start with an empty question
                    this.current = {
                        question: "",
                        choices: []
                    };
                    // the 'prev' button was clicked, move to previous question
                    this.previous = function () { return _this.seekToQuestion(Seek_1.Seek.Backward); };
                    // The 'next' button was clicked, move to the next question
                    this.next = function () { return _this.seekToQuestion(Seek_1.Seek.Forward); };
                    // The 'score' button was clicked, let's tabulate the answers
                    this.score = function () {
                        _this.seekToQuestion(Seek_1.Seek.Score);
                        _this.right = _this.tabulate();
                        _this.showAnswers = true;
                        _this.seekToQuestion(Seek_1.Seek.Beginning);
                    };
                    // reset the path back to the beginning
                    this.exit = function () { return window.history.back(); };
                    this.position = new Position();
                }
                PlayerComponent.prototype.ngOnInit = function () {
                    this.getQuiz();
                };
                PlayerComponent.prototype.getQuiz = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    // Remember: a promise is being returned from the service now
                    this._quizService.getQuiz(id)
                        .then(
                    // if the promise was resolved (aka successful)
                    function (data) {
                        console.info("Received data from service: " + JSON.stringify(data));
                        _this.questions = data;
                        _this.title = data.title;
                        _this.tagLine = data.tagLine;
                        _this.current = data.quiz.questions[0];
                        _this.total = data.quiz.questions.length;
                        _this.position.setMax(data.quiz.questions.length);
                        _this.position.seek(Seek_1.Seek.Beginning);
                        _this.seekToQuestion(Seek_1.Seek.Beginning);
                    }, 
                    // if the promise was rejected (aka failed)
                    function (error) { return console.log(error); });
                };
                PlayerComponent.prototype.getPlayerResponses = function (response, question) {
                    var ndx;
                    var newResponses = question.map(function () { return false; });
                    for (ndx = 0; ndx < response.length; ndx += 1) {
                        if (response[ndx]) {
                            newResponses[ndx] = true;
                        }
                    }
                    return newResponses;
                };
                PlayerComponent.prototype.seekToQuestion = function (direction) {
                    // get the current responses only if
                    if (direction !== Seek_1.Seek.Beginning) {
                        this.answers[this.position.getPosition()] = this.getPlayerResponses(this.responses, this.current.choices);
                    }
                    this.position.seek(direction);
                    var pos = this.position.getPosition();
                    // get the current questions from the quiz
                    this.current = this.questions.quiz.questions[pos];
                    // restore previous answer if one exists
                    this.responses = (this.answers[pos]) ? this.answers[pos] : [];
                    this.index = pos;
                };
                // does the actual scoring
                PlayerComponent.prototype.tabulate = function () {
                    var outer;
                    var right = 0;
                    // loop thru all of the responses & compare them to the answers
                    var _loop_1 = function() {
                        var inner = void 0;
                        var correct = void 0;
                        var question = this_1.questions.quiz.questions[outer].choices.map(function (choice) { return !!choice.isAnswer; });
                        var answer = this_1.answers[outer];
                        correct = answer && question.every(function (val, index) { return val === answer[index]; });
                        right += (correct ? 1 : 0);
                        console.info("question " + outer + " = " + (correct ? 'right' : 'wrong'));
                    };
                    var this_1 = this;
                    for (outer = 0; outer < this.total; outer += 1) {
                        _loop_1();
                    }
                    return right;
                };
                PlayerComponent = __decorate([
                    core_1.Component({
                        selector: 'player',
                        templateUrl: './templates/player.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [http_1.HTTP_PROVIDERS, quiz_service_1.QuizService, router_1.ROUTER_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [quiz_service_1.QuizService, router_1.Location, router_1.RouteParams])
                ], PlayerComponent);
                return PlayerComponent;
            }());
            exports_1("PlayerComponent", PlayerComponent);
        }
    }
});
// was there an answer for the current question?
// if (answer) {
// default to the player answering correctly
// correct = true;
// for (inner = 0; inner < answer.length; inner += 1) {
//   if (question[inner] != answer[inner]) {
//     correct = false;
//     break;
//   }
// }
// we've replaced the code above with this more functional version
// correct = answer && question.every((val, index) => val === answer[index]);
// }
//# sourceMappingURL=player.js.map