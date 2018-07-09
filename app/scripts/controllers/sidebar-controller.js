'use strict';
angular.module('grande-colorado-pub')
  .controller('SidebarController', ['$scope', 'Categoria', '$stateParams', '$state', 'ngDialog',
    function($scope, Categoria, $stateParams, $state, ngDialog) {
      $scope.showCategorias = false;
      $scope.message = "Loading ...";
      Categoria.find({
        filter: {
          order: ['nome ASC']
        }
      })
      .$promise.then(
        function(response) {
          $scope.categorias = response;
          $scope.showCategorias = true;
        },
        function(response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
        });
    }
  ])

;
