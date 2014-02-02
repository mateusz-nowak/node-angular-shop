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
        }
    };
});

var redirectUnlessAdmin = function($http, $location) {
    $http.get('/auth/admin')
        .success(function(result) {
            if (!result.isAdmin) {
                $location.path('/not-logged');
            }
        });
};

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

app.controller('ProductDetailController', function($scope, $routeParams, $http, $location) {
    $scope.addToCart = function(product) {
       $http.post('/cart', product)
            .success(function(product) {
                $location.path('/cart');
            });
    };

    $http.get('/products/' + $routeParams.id)
        .success(function(product) {
            $scope.product = product;
        });
});

app.controller('ProductSearchController', function($scope, $routeParams, $http) {
    var searchTerms = JSON.parse(localStorage.getItem('searchProductProperties'));

    searchTerms.price.min *= 100;
    searchTerms.price.max *= 100;

    $http.post('/products/search', searchTerms)
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

app.controller('AdminDashboardController', function($scope, $http, CommonDataProvider, $location) {
    redirectUnlessAdmin($http, $location);
});

app.controller('AdminCategoriesController', function($scope, $http, CommonDataProvider, $location) {
    redirectUnlessAdmin($http, $location);

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

app.controller('AdminProductsEditController', function($scope, $http, $routeParams, CommonDataProvider, $location) {
    redirectUnlessAdmin($http, $location);

    $scope.editProduct = function(product) {
        $http.put('/products', product)
            .success(function(response) {
                $location.path('/admin/products');
            });
    };
    CommonDataProvider
        .fetchCategories()
        .then(function(categories) {
            $scope.categories = CommonDataProvider.categories;
        }).then(function() {
            $http.get('/products/' + $routeParams.id)
                .success(function(product) {
                    $scope.categories.forEach(function(category) {
                        if (category.id == product.category_id) {
                            delete product.category_id;
                            product.category = category;
                        }
                    });
                    $scope.product = product;
                });
        });
});

app.controller('AdminProductsController', function($scope, $http, CommonDataProvider, $location) {
    redirectUnlessAdmin($http, $location);
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

app.controller('CartController', function($scope, $http, $location) {
    var loadProducts = function() {
        $http.get('/cart')
            .success(function(products) {
                $scope.products = products;
                var total = 0;
                products.forEach(function(product) {
                    total += product.price;
                });

                $scope.totalPrice = total;
            });
    };

    loadProducts();

    $scope.removeProduct = function(product) {
        $http.delete('/cart/' + product.id)
            .success(function() {
                loadProducts();
            });
    };

    $scope.order = function() {
        $http.post('/order')
            .success(function() {
                $location.path('/ordered');
            })
            .error(function() {
                $scope.message = 'Zaloguj się, aby móc składać zamówienia.';
            });
    };
});

app.controller('AdminOrdersController', function($scope, $http, CommonDataProvider, $location) {
    redirectUnlessAdmin($http, $location);
    $http.get('/orders')
        .success(function(orders) {
            $scope.orders = orders;
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
        when('/admin/products/:id/edit', {
            templateUrl: 'javascripts/templates/admin-products-edit.html',
            controller: 'AdminProductsEditController'
        }).
        when('/admin/orders', {
            templateUrl: 'javascripts/templates/admin-orders.html',
            controller: 'AdminOrdersController'
        }).
        when('/cart', {
            templateUrl: 'javascripts/templates/cart.html',
            controller: 'CartController'
        }).
        when('/ordered', {
            templateUrl: 'javascripts/templates/ordered.html'
        }).
        when('/not-logged', {
            templateUrl: 'javascripts/templates/not-logged.html'
        }).
        otherwise({
            templateUrl: 'javascripts/templates/main.html',
            controller: 'MainController'
        });
}]);

