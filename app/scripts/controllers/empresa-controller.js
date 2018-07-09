'use strict';
angular.module('grande-colorado-pub')
  .controller('EmpresaController', ['$scope', 'Empresa', 'CategoriasEmpresa', '$stateParams', '$state', 'ngDialog',
    function ($scope, Empresa, CategoriasEmpresa, $stateParams, $state, ngDialog) {
      $scope.showEmpresa = false;
      $scope.message = "Loading ...";
      Empresa.findById({
        id: $stateParams.id
      })
        .$promise.then(
          function (response) {
            $scope.empresa = response;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
      CategoriasEmpresa.find({
        filter: {
          include: ['empresa', 'categoria', 'subcategoria'],
          where: {            
            empresaId: $stateParams.id
          }
        }
      })
        .$promise.then(
          function (response) {
            $scope.CategoriasEmpresa = response;
            $scope.showSubcategorias = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
    }
  ])

  ;
