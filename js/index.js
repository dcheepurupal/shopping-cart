/**
 * Created by dcheepurupalli on 9/14/2016.
 */

var SA = angular.module('ShoppingCart', []);

SA.controller('HelloController', function($scope){
    $scope.greeting = { text: 'Hello' , text2 : "You have started Off"};
});