'use strict';
angular.module('grande-colorado-pub', ['ui.router','ngResource', 'ngDialog', 'lbServices'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            // rota para a página inicial de login
            .state('app', {
                url:'/',
                views: {
                    'cabecalho': {
                        templateUrl : 'views/cabecalho.html',
                        controller  : 'BuscaController'
                    },                                       
                    'sidebar': {
                        templateUrl : 'views/sidebar.html',
                        controller  : 'SidebarController'
                    },
                    'conteudo': {
                        templateUrl : 'views/main.html'
                    },
                    'rodape': {
                        templateUrl : 'views/rodape.html'
                    }
                }
            })
            // rota para a página contato
            .state('app.contato', {
                url:'contato',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/contato.html',
                        controller  : 'ContatoController'
                    }
                }
            })
            // rota para a página sobre nós
            .state('app.sobrenos', {
                url:'sobrenos',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/sobrenos.html'
                    }
                }
            })
            // rota para a página anuncie aqui
            .state('app.anuncieaqui', {
                url:'anuncieaqui',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/anuncie.html'
                    }
                }
            })
            // rota para a página de categoria
            .state('app.categorias', {
                url:'Categorias/:id/Subcategorias',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/categoria.html',
                        controller  : 'CategoriaController'
                    }
                }
            })
            // rota para a página de subcategoria
            .state('app.subcategorias', {
                url:'Subcategorias/:id',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/subcategoria.html',
                        controller  : 'SubcategoriaController'
                    }
                }
            })
            // rota para a página de empresas
            .state('app.empresa', {
                url: 'Empresa/:id',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/empresa.html',
                        controller  : 'EmpresaController'
                    }
                }
            })
            // rota para a página de resultados da busca
            .state('app.resultadobusca', {
                url: 'resultado/:palavra',
                views: {
                    'conteudo@': {
                        templateUrl : 'views/resultado-busca.html',
                        controller  : 'BuscaController'
                    }
                }
            })
            ;
        $urlRouterProvider.otherwise('/');
    })
;
