'use strict';
angular.module('grande-colorado-pub')
  .controller('ContatoController', ['$scope', 'Categoria',
    function($scope, Categoria) {      
      $scope.enviarEmail = function() {
        //$scope.contato = contato;
        var mensagem = {
          name : $scope.pessoa,
          address : $scope.emailaddress,
          phone : $scope.telephone,
          subject : $scope.assunto,
          msg : $scope.mensagem
        };
        Categoria.enviaEmail(mensagem);
      };
    }
  ])
;
