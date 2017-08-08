define(['functions','loginController','headerController','userController','newAudioController','audioController','modifyUserController'],
function(functions,loginController,headerController,userController,newAudioController,audioController,modifyUserController){
  var managerModule = angular.module('managerModule',['ui.router','ngFileUpload','datatables','datatables.bootstrap']);

  managerModule.controller('loginController',loginController);
  managerModule.controller('headerController',headerController);
  managerModule.controller('userController',userController);
  managerModule.controller('newAudioController',newAudioController);
  managerModule.controller('audioController',audioController);
  managerModule.controller('modifyUserController',modifyUserController);
  managerModule.service('functions',functions);

  managerModule.config(function ($stateProvider,$urlRouterProvider){
      $stateProvider
              .state('home', {
                url: '/home',
                templateUrl: 'homes.php',
                controller: 'headerController',
                })
              .state('users', {
                url: '/users',
                templateUrl: 'users.php',
                controller: 'userController',
                })
              .state('newAudio', {
                url: '/newAudio',
                templateUrl: 'newAudio.php',
                controller: 'newAudioController',
                })
              .state('audioSelect', {
                url: '/audioSelect',
                templateUrl: 'audioSelect.php',
                controller: 'audioController',
                })
              .state('myProfile', {
                url: '/myProfile',
                templateUrl: 'modifyUser.php',
                controller: 'modifyUserController',
                })


      $urlRouterProvider.otherwise('/home');

  });

  return managerModule;
});
