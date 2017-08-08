/*
 @author: Luis Gallegos
 @version: 1.0
 This is the JavaScript File help us to send the values to the php files.
 */
 define([], function( ){
   return ['functions','$scope','$rootScope'],
   function(functions,$scope,$rootScope){

      //  $rootScope.isAdmin = false;
      //  $rootScope.isUser = false;

       var init = function () {
          functions.getSession();
       };

       init();
   }
 });
