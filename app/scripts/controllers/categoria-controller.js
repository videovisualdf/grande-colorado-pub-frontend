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

  angular.module('grande-colorado-pub')
    .filter('unicos', function() {
    // we will return a function which will take in a collection
    // and a keyname
    return function(collection, keyname) {
       // we define our output and keys array;
       var output = [], 
           keys = [];
       
       // we utilize angular's foreach function
       // this takes in our original collection and an iterator function
       angular.forEach(collection, function(item) {
           // we check to see whether our object exists
           var key = item[keyname];
           // if it's not already part of our keys array
           if(keys.indexOf(key) === -1) {
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