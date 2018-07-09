'use strict';
angular.module('grande-colorado-pub')
  .controller('CategoriaController', ['$scope', 'Categoria', 'Subcategoria', 'CategoriasEmpresa', '$stateParams', '$state', 'ngDialog', '$location', '$anchorScroll',
    function ($scope, Categoria, Subcategoria, CategoriasEmpresa, $stateParams, $state, ngDialog, $location, $anchorScroll) {
      $scope.showCategorias = false;
      $scope.message = "Loading ...";
      Categoria.findById({
        id: $stateParams.id,
      })
        .$promise.then(
          function (response) {
            $scope.categoria = response;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
      Subcategoria.find({
        filter: {
          include: { relation: 'categoria' },
          where: { categoriaId: $stateParams.id },
          order: ['nome ASC']
        }
      })
        .$promise.then(
          function (response) {
            $scope.subcategorias = response;
            $location.hash('topoCabecalho');
            $anchorScroll();
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
      CategoriasEmpresa.find({
        filter: {
          include: [{relation: 'empresa', scope: {where:{ativo: 'S'}}}, 'categoria', 'subcategoria'],
          where: {
            destaque: 'S',
            categoriaId: $stateParams.id
          }
        }
      })
        .$promise.then(
          function (response) {
            $scope.destaques = response;
            $scope.showCategorias = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
      CategoriasEmpresa.find({
        filter: {
          include: [{relation: 'empresa', scope: {where:{ativo: 'S'}}}, 'categoria', 'subcategoria'],
          where: { 
            categoriaId: $stateParams.id 
          }
        }
      })
        .$promise.then(
          function (response) {
            $scope.empresasCategoria = response;
            $scope.showCategorias = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
    }
  ])
  ;
