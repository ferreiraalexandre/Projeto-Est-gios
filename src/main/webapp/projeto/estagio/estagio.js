
app.config(['$mdThemingProvider', '$mdIconProvider' , function ($mdThemingProvider) {
    'use strict';
    
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
}])

app.controller('estagioController', ['$mdEditDialog', '$q', '$scope', '$timeout', '$mdDialog', '$mdSidenav', '$mdUtil', '$location', 'EstagioService', 'toastr', 'Scopes', '$rootScope', '$location', '$localStorage',
                             function ($mdEditDialog,  $q,   $scope,   $timeout,   $mdDialog,  $mdSidenav, $mdUtil,   $location,   EstagioService,   toastr ,  Scopes, $rootScope, $location, $localStorage) {
  
  Scopes.store('estagioController', $scope);//Armazena o scope no service para se utilizado por outra controller
  
  app.run($rootScope, $location, $localStorage);
  
  
  'use strict';
  $scope.title = "Adicionar Estudade"
  $scope.selecionados = [];
  $scope.limitOptions = [5, 10, 15];
  $scope.items = ['Nome', 'Curso', 'Empresa'];
  $scope.selectedItem;
  $scope.buttonAddDisabled = false;
  $scope.buttonEditDisabled = true;
  $scope.buttonRemoveDisabled = true;
  $scope.isLoading = true;
  $scope.$parent.rodape = true;
  $scope.$parent.links = true;
    
  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };
  

	$scope.logout = function(){
		$localStorage.$reset();
		window.location.href="/projeto-estagios/login.html";
	}
  
  $scope.query = {
    order: 'name',
    limit: 10,
    page: 1
  };
    
  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
   
  $scope.buttonEnable = function () {
	$scope.buttonAddDisabled = $scope.selecionados.length > 0;
	$scope.buttonEditDisabled = !($scope.selecionados.length == 1);
	$scope.buttonRemoveDisabled = $scope.selecionados.length == 0;
  };

  
//Função para mudar telas conforme menu 
  $scope.menuClick = function (link) {
	$location.path(link);
  };
	
//Função para mudar telas conforme menu 
  $scope.iconEstagio = function (icon) {
	  if(icon == "editar"){
		 $scope.icon = icon;
		 $location.path("/cadastroEstagio");
		  
	  }
  };
  
//////////função de deletar
	$scope.deleteEstagio = function(){	
		var arrayId = []; 
		for (var i = 0; i < $scope.selecionados.length; i++) {
			arrayId.push($scope.selecionados[i].id);
		}
		var listId ={
			data: JSON.stringify(arrayId),
		};
		EstagioService.deleteEstagio(listId, function(response){
			$scope.estagios = response.data;
			$scope.selecionados = []; 
			$scope.buttonEnable();
			toastr.success(response.message);
		});
	};

	//Busca estagios do banco e lista na tabela
	$scope.getEstagio = function () {
		EstagioService.getList(function (response) {
			$scope.estagios = response.data;
			$scope.isLoading = false;
			
		});		
	};

  
    $scope.openLeftMenu = function() {
       $mdSidenav('left').toggle();
    };
     
    $scope.openRightMenu = function() {
       $mdSidenav('right').toggle();
     //  $scope.filtro.curso = $scope.curso; 
    };
    
   
	//Função de Aplicar Filtro 
	$scope.aplicarFiltro = function (data) {
		EstagioService.filtroEstagio(data, function (response) {
		}),
			function (error) {
		};
	};

	//Chama função para buscar estagios
	$scope.getEstagio();
	
}]);
