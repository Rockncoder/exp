System.register(['angular2/core', 'angular2/router', './about', './login', './quiz', './player'], function(exports_1, context_1) {
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
    var core_1, router_1, about_1, login_1, quiz_1, player_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (quiz_1_1) {
                quiz_1 = quiz_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent() {
                }
                HomeComponent = __decorate([
                    router_1.RouteConfig([
                        {
                            path: '/about',
                            name: 'About',
                            component: about_1.AboutComponent
                        },
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_1.LoginComponent
                        },
                        {
                            path: '/quiz',
                            name: 'Quiz',
                            component: quiz_1.QuizComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/player/:id',
                            name: 'Player',
                            component: player_1.PlayerComponent
                        }
                    ]),
                    core_1.Component({
                        selector: 'home',
                        templateUrl: './templates/home.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.js.map