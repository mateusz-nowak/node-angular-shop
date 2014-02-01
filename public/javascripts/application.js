var app = angular.module('app', ['ngRoute']);

app.factory('CommonDataProvider', function($http) {
    return {
        categories: [],

        fetchCategories: function() {
            var self = this;
            return $http.get('/categories')
                .success(function(categories) {
                    self.categories = categories;
                });
        },

    };
});

app.controller('SidebarCategoryController', function($scope, $http, $location, CommonDataProvider) {
    CommonDataProvider
        .fetchCategories()
        .then(function(categories) {
            $scope.categories = CommonDataProvider.categories;
        });

    $scope.searchProducts = function() {
        localStorage.setItem('searchProductProperties', JSON.stringify($scope.searchProduct));
        $location.path('/products/search/' + Math.floor((Math.random() * 10000)));
    };
});

app.controller('ProductListController', function($scope, $routeParams, $http) {
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
    $http.get('/products/' + $routeParams.id)
        .success(function(product) {
            $scope.product = product;
        });
});

app.controller('ProductSearchController', function($scope, $routeParams, $http) {
    $http.post('/products/search', JSON.parse(localStorage.getItem('searchProductProperties')))
        .success(function(products) {
            $scope.products = products;
        });
});

app.controller('MainController', function($scope, $http) {
    $http.get('/products')
        .success(function(products) {
            $scope.products = products;
        });
});

app.controller('AdminDashboardController', function($scope, $http) {
    // Nothing yet here.
});

app.controller('AdminCategoriesController', function($scope, $http, CommonDataProvider) {
    var loadCategories = function() {
        CommonDataProvider
            .fetchCategories()
            .then(function(categories) {
                $scope.categories = CommonDataProvider.categories;
            });
    };

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
});

app.controller('AdminProductsController', function($scope, $http) {
    $scope.isFormShown = false;
    $scope.products = [];
    $scope.categories = [];

    var loadProducts = function() {
        $http.get('/products')
            .success(function(products) {
                $scope.products = products;
            });
    };

    loadProducts();

    $scope.postProduct = function() {
        $http.post('/products', $scope.product)
            .success(function(response) {
                $scope.isFormShown = !$scope.isFormShown;
                $scope.product = {};
                loadProducts();
            });
    };

    $scope.removeProduct = function(product) {
        $http.delete('/products/' + product.id)
            .success(function(response) {
                loadProducts();
            });
    };

    $scope.createNew = function() {
        $scope.isFormShown = !$scope.isFormShown;
    };

    $http.get('/categories')
        .success(function(categories) {
            $scope.categories = categories;
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
        }).
        when('/admin/products', {
            templateUrl: 'javascripts/templates/admin-products.html',
            controller: 'AdminProductsController'
        }).
        otherwise({
            templateUrl: 'javascripts/templates/main.html',
            controller: 'MainController'
        });
}]);

