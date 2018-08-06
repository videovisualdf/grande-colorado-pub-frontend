'use strict';
angular.module('grande-colorado-pub')
  .controller('SidebarController', ['$rootScope', '$scope', 'Categoria', '$stateParams', '$state', 'ngDialog',
    function ($rootScope, $scope, Categoria, $stateParams, $state, ngDialog) {
      $scope.regiao = $rootScope.regiaoSelecionada;
      $scope.showCategorias = false;
      $scope.message = "Loading ...";
      Categoria.find({
        filter: {
          order: ['nome ASC']
        }
      })
        .$promise.then(
          function (response) {
            $scope.categorias = response;
            $scope.showCategorias = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          });
      $scope.alteraRegiao = function () {
        $rootScope.regiaoSelecionada = $scope.regiao;
        $state.go($state.current, $stateParams.id, { reload: true });
        $scope.regiao = $rootScope.regiaoSelecionada;
      }
    }
  ])

  ;
