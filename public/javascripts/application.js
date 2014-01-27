var app = angular.module('app', ['ngRoute']);

app.controller('SidebarCategoryController', function($scope, $http, $location) {
    $scope.categories = [];
    $scope.searchProduct = {};

    $http.get('/categories')
        .success(function(categories) {
            $scope.categories = categories;
        });

    $scope.searchProducts = function() {
        localStorage.setItem('searchProductProperties', JSON.stringify($scope.searchProduct));
        $location.path('/products/search');
    };
});

app.controller('ProductListController', function($scope, $routeParams, $http) {
    $scope.products = [];
    $scope.category = {};
    
    $http.get('/categories/' + $routeParams.id + '/products')
        .success(function(products) {
            $scope.products = products;
        });

    $http.get('/categories/' + $routeParams.id)
        .success(function(category) {
            $scope.category = category;
        });
});

app.controller('ProductDetailController', function($scope, $routeParams, $http) {
    $scope.product = {};

    $http.get('/products/' + $routeParams.id)
        .success(function(product) {
            $scope.product = product;
        });
});

app.controller('ProductSearchController', function($scope, $routeParams, $http) {
    $scope.products = [];

    $http.post('/products/search', JSON.parse(localStorage.getItem('searchProductProperties')))
        .success(function(products) {
            $scope.products = products;
        });
});

app.controller('MainController', function($scope, $http) {
    $scope.products = [];

    $http.get('/products')
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
        when('/products/search', {
            templateUrl: 'javascripts/templates/product-search.html',
            controller: 'ProductSearchController'
        }).
        otherwise({
            templateUrl: 'javascripts/templates/main.html',
            controller: 'MainController'
        });
}]);

