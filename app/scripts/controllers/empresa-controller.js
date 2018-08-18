'use strict';
angular.module('grande-colorado-pub')
  .controller('EmpresaController', ['$scope', 'Empresa', 'CategoriasEmpresa', '$stateParams', '$state', 'ngDialog', '$window',
    function ($scope, Empresa, CategoriasEmpresa, $stateParams, $state, ngDialog, $window) {
      $scope.showEmpresa = false;
      $scope.message = "Loading ...";
      Empresa.findById({
        id: $stateParams.id
      })
        .$promise.then(
          function (response) {
            $scope.empresa = response;
            $window.adicionaMarcador(JSON.parse($scope.empresa.coordenada), mapa);
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
