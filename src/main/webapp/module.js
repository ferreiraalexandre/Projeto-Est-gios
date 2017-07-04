var app = angular.module("projeto-estagios", ['ngMaterial', 'ngMessages','md.data.table', 'ngMdIcons', 'ngRoute', 'ui.mask', 'ngResource', 'ngAnimate', 'toastr', 'idf.br-filters']);

app.pathRest = 'rest';

app.config(function($routeProvider) {

	$routeProvider
	.when('/', {
		templateUrl : 'projeto/estagio/estagio.html',
		controller : 'estagioController'
	})

	$routeProvider
	.when('/unidadeEnsino', {
		templateUrl : 'projeto/unidadeEnsino/unidadeEnsino.html',
		controller : 'unidadeEnsinoController'
	})

	
	$routeProvider
	.when('/usuario', {
		templateUrl : 'projeto/usuario/usuario.html',
		controller : 'usuarioController'
	})
	

	$routeProvider
	.when('/curso', {
		templateUrl : 'projeto/curso/curso.html',
		controller : 'cursoController'
	})
	

	$routeProvider
	.when('/turma', {
		templateUrl : 'projeto/turma/turma.html',
		controller : 'turmaController'
	})
	
	$routeProvider
	.when('/empresa', {
		templateUrl : 'projeto/empresa/empresa.html',
		controller : 'empresaController'
	})
		
	$routeProvider
	.when('/instituicao', {
		templateUrl : 'projeto/instituicao/instituicao.html',
		controller : 'instituicaoController'
	})
	
	$routeProvider
	.when('/cadastroEstagio', {
		templateUrl : 'projeto/estagio/cadastroEstagio.html',
		controller : 'cadastroEstagioController'

	})
	$routeProvider
	.when('/login', {
		templateUrl : 'login.html',
		controller : 'LoginController'

	})


});

// deixa o calendario em 'pt'
app.config(function($mdDateLocaleProvider) {
	
    $mdDateLocaleProvider.months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    $mdDateLocaleProvider.shortMonths = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    $mdDateLocaleProvider.days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    $mdDateLocaleProvider.shortDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    
    $mdDateLocaleProvider.formatDate = function(date) {
    	return moment(date).format('DD/MM/YYYY');
    };
    
});

//app.run(function($rootScope, $http, $location, $localStorage) {
//	// redirect to login page if not logged in and trying to access a restricted page
//	$rootScope.$on('$locationChangeStart', function (event, next, current) {
//		var publicPages = ['/login'];
//		var restrictedPage = publicPages.indexOf($location.path()) === -1;
//		if (restrictedPage && !$localStorage.currentUser) {
//			$location.path('/login');
//		}else if(publicPages.indexOf($location.path()) != -1 && $localStorage.currentUser){
//			$location.path('/');
//		}
//	});
//});

