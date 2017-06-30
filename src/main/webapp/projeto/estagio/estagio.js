
app.config(['$mdThemingProvider', '$mdIconProvider' , function ($mdThemingProvider) {
    'use strict';
    
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
}])

app.controller('estagioController', ['$mdEditDialog', '$q', '$scope', '$timeout', '$mdDialog', '$location', 'EstagioService', 'toastr',
                             function ($mdEditDialog,  $q,   $scope,   $timeout,   $mdDialog,   $location,   EstagioService,   toastr) {
  'use strict';
  $scope.title = "Adicionar Estudade"
  $scope.adicionarEstudante = true;
  $scope.rodape = true;
  $scope.links = true;	  
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  $scope.items = ['Nome', 'Curso', 'Empresa'];
  $scope.selectedItem;
  $scope.isLoading = true;
  $scope.paginaAtualizado = false;
  
    
  $scope.getSelectedText = function() {
      if ($scope.selectedItem !== undefined) {
        return "Buscar por " + $scope.selectedItem;
      } else {
        return "Buscar por Nome";
      }
    };
  
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
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
    
  $scope.editObs = function (event, estagio) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: estagio.obs,
      placeholder: 'Adicionar observações',
      save: function (input) {
        if(input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if(input.$modelValue === 'Bernie Sanders') {
          return estagio.obs = 'FEEL THE BERN!'
        }
        estagio.obs = input.$modelValue;
      },
      targetEvent: event,
      title: 'Adicionar observações',
      validators: {
        'md-maxlength': 30
      }
    };
    
    var promise;
    
    if($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };
  
  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };
  
  $scope.getInstituicaoes = function () {
    return ['AC Serviços de Recrutamento e seleção LTDA ME', 'Senai', 'IEL'];
  };
  
  $scope.getOpcao = function () {
	    return ['Sim', 'Não'];
	  };
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
  
  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };
  
  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }
  
//Função para mudar telas conforme menu 
  $scope.menuClick = function (link) {
	$location.path(link);
  };


  $scope.cadastrarEstagio = function (event) {
	  var  link = "/cadastroEstagio";
      
	  $scope.rodape = false;
	  $scope.links = false;
	  $scope.cardCadastroEstagio = {"margin-top" : "60px"}
	  
	  EstagioService.getListSelect(function (response) {
		  $scope.empresas = response.data.empresa;
		  $scope.instituicoes = response.data.instituicao;
		  $scope.turmas = response.data.turma;
		  $scope.estudantes = response.data.estudante;
		  $scope.paginaAtualizado = true;
				
		}),
		function (error) {
			
		};
		$location.path(link);

  };
 
  $scope.menuEstudante = function (link) {
	  if(link == "adicionar"){
		  $scope.adicionarEstudante = true;
		  $scope.listarEstudante = false;
		  $scope.editarEstudante = false;
		  $scope.title = "Adicionar Estudade"
	  }
	  if(link == "listar"){
		  $scope.listarEstudante = true;
		  $scope.adicionarEstudante = false;
		  $scope.editarEstudante = false;
		  $scope.title = "Lista de Estudade"
	  }
	  if(link == "editar"){
		  $scope.editarEstudante = true;
		  $scope.adicionarEstudante = false;
		  $scope.listarEstudante = false;
		  $scope.title = "Editar de Estudade"
	  }

	  
  };
  
	//Função de adicionar novo estagio no Banco de Dados
	$scope.adicionarEstagio = function (data) {
		data.dataInicio = moment(data.dataInicio).format('YYYY-MM-DD');
		data.dataFim = moment(data.dataFim).format('YYYY-MM-DD');
		data.dataVisitaEmpresa = moment(data.dataVisitaEmpresa).format('YYYY-MM-DD');
		EstagioService.postEstagio(data, function (response) {
		toastr.success(response.message);
		$scope.$parent.estagios = response.data;
	  
		$scope.$parent.rodape = true;
		$scope.$parent.links = true;	  

		
		var  link = "/";
		$location.path(link);

			
		}),
			function (error) {
	
			};
	};
	
	//Busca estagios do banco e lista na tabela
	$scope.getEstagio = function () {
		EstagioService.getList(function (response) {
			$scope.estagios = response.data;
			$scope.isLoading = false;
			
			  var path = $location.path();
			  
			  if(path == "/cadastroEstagio"){
				  $scope.rodape = false;
				  $scope.links = false;	  
				  $scope.cardCadastroEstagio = {"margin-top" : "60px"}

			  }

		});		
	};


	//Chama função para buscar estagios
	$scope.getEstagio();

	//Chama função no reload da pagina para buscar os select no cadastro do estagio
	var path = $location.path();
	if(path == "/cadastroEstagio" && $scope.paginaAtualizado == false){
		$scope.cadastrarEstagio(path);
	}

	
}]);
