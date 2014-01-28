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
        $location.path('/products/search/' + Math.floor((Math.random() * 10000)));
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

app.controller('AdminDashboardController', function($scope, $http) {
    // Nothing yet here.
});

app.controller('AdminCategoriesController', function($scope, $http) {
    var loadCategories = function() {
        $http.get('/categories')
            .success(function(categories) {
                $scope.categories = categories;
            });
    };

    $scope.categories = [];
    $scope.category = {};
    $scope.isFormShown = false;

    loadCategories();

    $scope.removeCategory = function(categoryId) {
        $http.delete('/categories/' + categoryId + '/remove')
            .success(function(response) {
                loadCategories();
            });
    };

    $scope.createNew = function() {
        $scope.isFormShown = !$scope.isFormShown; 
    };

    $scope.postNewCategory = function() {
        $http.post('/categories', $scope.category)
            .success(function(category) {
                loadCategories();
                $scope.isFormShown = false;
                $scope.category = {};
            }); 
    };
})

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
        when('/products/search/:rand', {
            templateUrl: 'javascripts/templates/product-search.html',
            controller: 'ProductSearchController'
        }).
        when('/admin', {
            templateUrl: 'javascripts/templates/admin-dashboard.html',
            controller: 'AdminDashboardController'
        }).
        when('/admin/categories', {
            templateUrl: 'javascripts/templates/admin-categories.html',
            controller: 'AdminCategoriesController'
        })
        .otherwise({
            templateUrl: 'javascripts/templates/main.html',
            controller: 'MainController'
        });
}]);

