/*
 @author: Luis Gallegos
 @version: 1.0
 This is the JavaScript File help us to send the values to the php files.
 */
 define([], function( ){
   return ['functions','$scope','$q','$rootScope','$compile','$timeout'],
   function(functions,$scope, $compile,$q,$rootScope,$timeout,Upload,DTOptionsBuilder, DTColumnBuilder){
       var url = '../presenters/modifyUserPresenter.php';

/////////////// USER FORM Image

   $scope.setAlbum = function () {
      $scope.newImageUser = $scope.imageUser.name
      $scope.newImageUser = $scope.newImageUser.replace(".jpg","");
      $scope.upload($scope.imageUser,true);
   };

    $scope.uploadOK = true;


   $scope.upload = function (file, resumable,flag) {
      var path = "C:/wamp/www/Steve/P14/img/";
      uploadUsingUpload(file,resumable,path);
  };

  var urlTrack = '../models/uploadChangeImage.php';

  function uploadUsingUpload(file, resumable, path) {
   file.upload = Upload.upload({
     url: urlTrack,
     headers: {
       'optional-header': 'header-value'
     },
     data: {path: path, file: file, name: $rootScope.userData.img, newImage: $scope.newImageUser, id:$rootScope.userData.id_Users}
   });

   file.upload.then(function (response) {
     $timeout(function () {
       file.result = response.data;
     });
   }, function (response) {
     if (response.status > 0)
       $scope.errorMsg = response.status + ': ' + response.data;
   }, function (evt) {
     functions.getSession();
     swal("Good job!", "You change your profile Image!", "success");
     // Math.min is to fix IE which reports 200% sometimes
     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
   });

}

//// Checks
  $scope.newUserName =  "";
  $scope.newUserLastName = "";

  $scope.checkUserName = true;
  $scope.checkUserLastName = true;
  $scope.checkPass1 = true;
  $scope.checkPass2 = true;
  $scope.checkCurrentPass = false;

  $scope.checkUserNameFun = function () {
    if ($scope.newUserName == "" || $scope.newUserName == undefined || $scope.newUserName == null) {
        $scope.checkUserName = true;
    }else{
      $scope.checkUserName = false;
    }
  };

  $scope.checkUserLastNameFun = function () {
    if ($scope.newUserLastName == "" || $scope.newUserLastName == undefined || $scope.newUserLastName == null) {
        $scope.checkUserLastName = true;
    }else{
      $scope.checkUserLastName = false;
    }
  };

  $scope.checkUserPassFun = function () {
    if ($scope.newUserPass !== $rootScope.userData.password) {
        $scope.checkCurrentPass = false;

    }else{
      $scope.checkCurrentPass = true;
    }
  };

  $scope.checkUserPass1Fun = function () {
    if ($scope.newUserPass1 == "" || $scope.newUserPass1 == undefined || $scope.newUserPass1 == null) {
      $scope.checkPass1 = true;
    }else{
      $scope.checkPass1 = false;
    }
  };

  $scope.checkUserPass2Fun = function () {
    if ($scope.newUserPass2 == $scope.newUserPass1) {
      $scope.checkPass2 = false;
    }else{
      $scope.checkPass2 = true;
    }
  };

  $scope.saveNewName = function () {
     var params = {};
     params.user = $scope.newUserName;
     params.idUser = $rootScope.userData.id_Users;
     params = JSON.stringify(params);
     functions.async("POST",url,'setNewName',params).then(function (promise) {
        if (promise.data == "true") {
           swal("Good job!", "You change the name for your User!", "success");
           $scope.newUserName = "";
        }else{
           swal("Opps!","Something went wrong!","error");
        }
        $scope.newUserName = "";
        $scope.checkUserName = true;
        functions.getSession();
     });
  }

  $scope.saveNewLastName = function () {
     var params = {};
     params.user = $scope.newUserLastName;
     params.idUser = $rootScope.userData.id_Users;
     params = JSON.stringify(params);
     functions.async("POST",url,'setNewLastName',params).then(function (promise) {
        if (promise.data == "true") {
           swal("Good job!", "You change the lastname for your User!", "success");
           $scope.newUserLastName = "";
        }else{
           swal("Opps!","Something went wrong!","error");
        }
        $scope.newUserLastName = "";
        $scope.checkUserLastName = true;
        functions.getSession();
     });
  }

  $scope.saveNewPass = function () {
     var params = {};
     params.user = $scope.newUserPass2;
     params.idUser = $rootScope.userData.id_Users;
     params = JSON.stringify(params);
     functions.async("POST",url,'setNewPass',params).then(function (promise) {
        if (promise.data == "true") {
           swal("Good job!", "You change the password for your User!", "success");
           $scope.newUserPass2 = "";
           $scope.newUserPass1 = "";
           $scope.newUserPass = "";
        }else{
           swal("Opps!","Something went wrong!","error");
        }
        $scope.newUserPass2 = "";
        $scope.newUserPass1 = "";
        $scope.newUserPass = "";
        $scope.checkPass2 = true;
        $scope.checkCurrentPass = false;
        functions.getSession();
     });
  }


       var init = function () {
          functions.getSession();
          //$scope.getRoles();
       };

       init();
   }
 });
