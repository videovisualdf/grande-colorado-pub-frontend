'use strict';
angular.module('grande-colorado-pub')
  .controller('ContatoController', ['$scope', 'Categoria', 'ngDialog',
    function ($scope, Categoria, ngDialog) {
      $scope.enviarEmail = function () {
        var mensagem = {
          name: $scope.pessoa,
          address: $scope.emailaddress,
          phone: $scope.telephone,
          subject: $scope.assunto,
          msg: $scope.mensagem
        };
        Categoria.enviaEmail(mensagem);
        var textoFormatado = '\
              <div class="ngdialog-message">\
                <div><h3>E-mail enviado com sucesso</h3></div>' +
              '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button" ng-click=confirm("OK")>OK</button>\
                </div>';
        ngDialog.openConfirm({
          template: textoFormatado,
          plain: 'true'
        });

      };
    }
  ])
  ;
