'use strict';
angular.module('grande-colorado-pub')
  .controller('SubcategoriaController', ['$scope', 'Subcategoria', 'CategoriasEmpresa', '$stateParams', '$state', 'ngDialog', '$location', '$anchorScroll',
    function ($scope, Subcategoria, CategoriasEmpresa, $stateParams, $state, ngDialog, $location, $anchorScroll) {
      $scope.showSubcategorias = false;
      $scope.message = "Loading ...";
      Subcategoria.findById({
        id: $stateParams.id,
        filter: {
          include: ['categoria'],
        }
      })
        .$promise.then(
          function (response) {
            $scope.subcategoria = response;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
      CategoriasEmpresa.find({
        filter: {
          include: [{relation: 'empresa', scope: {where:{ativo: 'S'}}}, 'categoria', 'subcategoria'],
          where: { 
            //'empresa.ativo': 'S',
            destaque: 'S',
            subcategoriaId: $stateParams.id
          }
        }
      })
        .$promise.then(
          function (response) {
            $scope.destaques = response;
            $scope.showSubcategorias = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
      CategoriasEmpresa.find({
        filter: {
          include: [{relation: 'empresa', scope: {where:{ativo: 'S'}}}, 'categoria', 'subcategoria'],
          where: { 
            //'empresa.ativo': 'S',
            subcategoriaId: $stateParams.id 
          }          
        }
      })
        .$promise.then(
          function (response) {
            $scope.empresasCategoria = response;
            $scope.showSubcategorias = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
    }
  ])
  ;
