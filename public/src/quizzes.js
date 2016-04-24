System.register(['angular2/core', 'angular2/router', './quiz-service', './Seek'], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, quiz_service_1, Seek_1;
    var Position, PlayerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (quiz_service_1_1) {
                quiz_service_1 = quiz_service_1_1;
            },
            function (Seek_1_1) {
                Seek_1 = Seek_1_1;
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
                function PlayerComponent(_quizService, _location) {
                    var _this = this;
                    this._quizService = _quizService;
                    this._location = _location;
                    this.answers = [];
                    this.showAnswers = false;
                    this.index = 0;
                    this.total = 10;
                    this.right = 0;
                    this.percent = 0;
                    this.responses = [];
                    this.title = "";
                    this.tagLine = "";
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
                    this.exit = function () { return _this._location.go('/'); };
                    this.position = new Position();
                }
                PlayerComponent.prototype.ngOnInit = function () {
                    this.getQuiz();
                };
                PlayerComponent.prototype.getQuiz = function () {
                    var data = this._quizService.getQuiz(1);
                    this.questions = data;
                    this.title = data.title;
                    this.tagLine = data.tagLine;
                    this.current = data.quiz.questions[0];
                    this.total = data.quiz.questions.length;
                    this.position.setMax(data.quiz.questions.length);
                    this.position.seek(Seek_1.Seek.Beginning);
                    this.seekToQuestion(Seek_1.Seek.Beginning);
                    console.info("Received data from service: " + data.quiz.questions.length);
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
                    // get the current questions from the quiz
                    this.current = this.questions.quiz.questions[this.position.getPosition()];
                    // restore previous answer if one exists
                    this.responses = (this.answers[this.position.getPosition()]) ? this.answers[this.position.getPosition()] : [];
                    this.index = this.position.getPosition();
                };
                // does the actual scoring
                PlayerComponent.prototype.tabulate = function () {
                    var outer;
                    var right = 0;
                    // loop thru all of the responses & compare them to the answers
                    for (outer = 0; outer < this.total; outer += 1) {
                        var inner = void 0;
                        var correct = false;
                        var question = this.questions.quiz.questions[outer].choices.map(function (choice) { return !!choice.isAnswer; });
                        var answer = this.answers[outer];
                        // were there an answer for the current question?
                        if (answer) {
                            // default to the player answering correctly
                            correct = true;
                            for (inner = 0; inner < answer.length; inner += 1) {
                                if (question[inner] != answer[inner]) {
                                    correct = false;
                                    break;
                                }
                            }
                        }
                        right += (correct ? 1 : 0);
                        console.info("question " + outer + " = " + (correct ? 'right' : 'wrong'));
                    }
                    return right;
                };
                PlayerComponent = __decorate([
                    core_1.Component({
                        selector: 'player',
                        templateUrl: './templates/player.html',
                        directives: [router_2.ROUTER_DIRECTIVES],
                        providers: [quiz_service_1.QuizService, router_2.ROUTER_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [quiz_service_1.QuizService, router_1.Location])
                ], PlayerComponent);
                return PlayerComponent;
            }());
            exports_1("PlayerComponent", PlayerComponent);
        }
    }
});
//# sourceMappingURL=quizzes.js.map