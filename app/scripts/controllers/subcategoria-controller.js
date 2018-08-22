'use strict';
angular.module('grande-colorado-pub')
  .controller('SubcategoriaController', ['$rootScope', '$scope', 'Subcategoria', 'CategoriasEmpresa', '$stateParams', '$state', 'ngDialog', '$location', '$anchorScroll',
    function ($rootScope, $scope, Subcategoria, CategoriasEmpresa, $stateParams, $state, ngDialog, $location, $anchorScroll) {
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

      regiao = $rootScope.regiaoSelecionada;

      //Filtra destaques por regiao

      if ((regiao == 0) || (regiao == 1)) {
        CategoriasEmpresa.find({
          filter: {
            include: [{ relation: 'empresa', scope: { where: { ativo: 'S' } } }, 'categoria', 'subcategoria'],
            where: {
              destaque: 'S',
              subcategoriaId: $stateParams.id
            }
          }
        })
          .$promise.then(
            function (response) {
              var resultado = [];
              angular.forEach(response, function (item) {
                if (item.empresa) {
                  resultado.push(item);
                }
              });
              $scope.destaques = resultado;
              $scope.showSubcategorias = true;
            },
            function (response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
            });
      }
      else {
        CategoriasEmpresa.find({
          filter: {
            include: [{ relation: 'empresa', scope: { where: { ativo: 'S', regiao: regiao } } }, 'categoria', 'subcategoria'],
            where: {
              destaque: 'S',
              subcategoriaId: $stateParams.id
            }
          }
        })
          .$promise.then(
            function (response) {
              var resultado = [];
              angular.forEach(response, function (item) {
                if (item.empresa) {
                  resultado.push(item);
                }
              });
              $scope.destaques = resultado;
              $scope.showSubcategorias = true;
            },
            function (response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
            });
      }

      //Filtra todas as empresas dentro da subcategoria
      if ((regiao == 0) || (regiao == 1)) {
        CategoriasEmpresa.find({
          filter: {
            include: [{ relation: 'empresa', scope: { where: { ativo: 'S' } } }, 'categoria', 'subcategoria'],
            where: {
              subcategoriaId: $stateParams.id
            }
          }
        })
          .$promise.then(
            function (response) {
              var resultado = [];              
              angular.forEach(response, function (item) {
                if (item.empresa) {
                  resultado.push(item);
                }
              });
              $scope.empresasCategoria = resultado;
              $scope.showSubcategorias = true;
            },
            function (response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
            });
      }
      else {
        CategoriasEmpresa.find({
          filter: {
            include: [{ relation: 'empresa', scope: { where: { ativo: 'S', regiao: regiao } } }, 'categoria', 'subcategoria'],
            where: {
              subcategoriaId: $stateParams.id
            }
          }
        })
          .$promise.then(
            function (response) {
              var resultado = [];
              angular.forEach(response, function (item) {
                if (item.empresa) {
                  resultado.push(item);
                }
              });
              $scope.empresasCategoria = resultado;
              $scope.showSubcategorias = true;
            },
            function (response) {
              $scope.message = "Error: " + response.status + " " + response.statusText;
            });
      }

    }
  ])
  ;

angular.module('grande-colorado-pub')
  .filter('unicos', function () {
    // we will return a function which will take in a collection
    // and a keyname
    return function (collection, keyname) {
      // we define our output and keys array;
      var output = [],
        keys = [];

      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function (item) {
        // we check to see whether our object exists
        var key = item[keyname];
        // if it's not already part of our keys array
        if (keys.indexOf(key) === -1) {
          // add it to our keys array
          keys.push(key);
          // push this item to our final output array
          output.push(item);
        }
      });
      // return our array which should be devoid of
      // any duplicates
      //console.log(output);

      return output;
    };
  });