var app = angular.module('app', ['ngRoute']);

app.controller('SidebarCategoryController', function($scope, $http) {
    $scope.categories = [];

    $http.get('/categories')
        .success(function(categories) {
            $scope.categories = categories;
        });
});

app.controller('ProductListController', function($scope, $routeParams, $http) {
    $scope.category = $routeParams.id;
    $scope.products = [];
    
    $http.get('/categories/' + $scope.category + '/products')
        .success(function(products) {
            $scope.products = products;
        });
});

app.controller('ProductDetailController', function($scope, $http) {

});

app.controller('MainController', function($scope, $http) {
    $scope.products = [];

    $http.get('/categories/1/products')
        .success(function(products) {
            $scope.products = products;
        });
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/category/:id', {
            templateUrl: 'javascripts/templates/product-list.html',
            controller: 'ProductListController'
        }).
        when('/product/:id', {
            templateUrl: 'javascripts/templates/product-detail.html',
            controller: 'ProductDetailController'
        }).
        otherwise({
            templateUrl: 'javascripts/templates/main.html',
            controller: 'MainController'
        });
}]);
