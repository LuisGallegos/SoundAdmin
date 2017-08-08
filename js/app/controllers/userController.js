/*
 @author: Luis Gallegos
 @version: 1.0
 This is the JavaScript File help us to send the values to the php files.
 */
 define([], function( ){
   return ['functions','$scope','$q','$rootScope','$compile','$timeout'],
   function(functions,$scope, $compile,$q,$rootScope,$timeout,Upload,DTOptionsBuilder, DTColumnBuilder){
       var url = '../presenters/usersPresenter.php';
////////////////////// USER TABLE
        $scope.vm = this;
        $scope.vm.users = {};
        $scope.vm.dtInstance = {};
        $scope.vm.dtOptions = DTOptionsBuilder
            .fromFnPromise(function () {
               var msg = $("#sessionOrigin").text();
               var defer = $q.defer();
               functions.async("POST",url,'getUsers',msg).then(function (promise) {
                  $scope.users = promise.data;
                  angular.forEach(promise.data,function (i) {
                     i.rol = $scope.getRolName(i.rol);
                     i.activeN = i.active;
                     i.active = $scope.getStatus(i.active);
                  });
                  defer.resolve(promise.data);
                  //return promise.data;
               })
               return defer.promise;
            })
            // Add Bootstrap compatibility
            .withOption('createdRow', createdRow)
            .withBootstrap();
        $scope.vm.dtColumns = [
            DTColumnBuilder.newColumn('id_Users').withTitle('ID').withClass('text-danger'),
            DTColumnBuilder.newColumn(null).withTitle('UserImage').notSortable().renderWith(images),
            DTColumnBuilder.newColumn('username').withTitle('Username'),
            DTColumnBuilder.newColumn('name').withTitle('First name'),
            DTColumnBuilder.newColumn('lastname').withTitle('Last name'),
            DTColumnBuilder.newColumn('rol').withTitle('Rol'),
            DTColumnBuilder.newColumn('active').withTitle('Status'),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
        ];


        function actionsHtml(data, type, full, meta) {
           $scope.vm.users[data.id_Users] = data;
           return '<button class="btn btn-warning" ng-click="edit('+ data.id_Users + ')" data-toggle="modal" data-target="#myModal">' +
               '   <i class="fa fa-edit"></i>' +
               '</button>&nbsp;' +
               '<button class="btn btn-danger" ng-click="deleteRow(' + data.id_Users + ')" ng-show="getFlagStatusActive('+data.activeN+')">' +
               '   <i class="fa fa-user-times"></i>' +
               '</button>&nbsp;'+
               '<button class="btn btn-success" ng-click="activeRow(' + data.id_Users + ')" ng-show="getFlagStatusDeactive('+data.activeN+')">' +
               '   <i class="fa fa-user-plus"></i>' +
               '</button>';
         }

         function images(data,type,full,meta) {
            return '<img class="img-circle" style="height: 90px; 2width: 90px;" src="../img/'+data.img+'.jpg" alt="User Image">';
         }

         function createdRow(row, data, dataIndex) {
              // Recompiling so we can bind Angular directive to the DT
              $compile(angular.element(row).contents())($scope);
          }

          $scope.edit = function(id) {
              $scope.idUpdateUser = id;
          }

          $scope.deleteRow = function(id) {
              $scope.banUser(id);
          }

          $scope.activeRow = function(id) {
              $scope.activeUser(id);
          }
/////////////// USER FORM Image

   $scope.setAlbum = function () {
      $scope.newImageUser = $scope.imageUser.name
      $scope.newImageUser = $scope.newImageUser.replace(".jpg","");
      $scope.upload($scope.imageUser,true);
   };

    $scope.chunkSize = 100000;
    $scope.uploadOK = true;

    $scope.getReqParams = function () {
     return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
     '&errorMessage=' + $scope.serverErrorMsg : '';
   };


   $scope.upload = function (file, resumable,flag) {
   if (flag == "track") {
      var path = "C:/wamp/www/Steve/P14/img/";
      uploadUsingUpload(file, resumable,path);
   }else{
      var path = "C:/wamp/www/Steve/P14/img/";
      uploadUsingUpload(file,resumable,path);
   }
   checkValidUploads();
  };

  var urlTrack = '../models/upload.php';

  function uploadUsingUpload(file, resumable, path) {
   file.upload = Upload.upload({
     url: urlTrack,
     headers: {
       'optional-header': 'header-value'
     },
     data: {path: path, file: file}
   });

   file.upload.then(function (response) {
     $timeout(function () {
       file.result = response.data;
     });
   }, function (response) {
     if (response.status > 0)
       $scope.errorMsg = response.status + ': ' + response.data;
   }, function (evt) {
     // Math.min is to fix IE which reports 200% sometimes
     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
   });

}
   function checkValidUploads() {
      if ($scope.imageUser.progress !== undefined) {
         $scope.uploadOK = false;
      }else{
         $scope.uploadOK = true;
      }
   }
////// Set Rol Name on View
      $scope.getRolName = function (rol) {
         switch (rol) {
            case "1":
               return "Admin";
            case "2":
               return "User";
         }
      }
/// Set Status on  view
      $scope.getStatus = function (rol) {
         switch (rol) {
            case "1":
               return "Active";
            case "0":
               return "Inactive";
         }
      }

      $scope.getFlagStatusActive = function (rol) {
         switch (rol) {
            case 1:
               return true;
            case 0:
               return false;
         }
      }
      $scope.getFlagStatusDeactive = function (rol) {
         switch (rol) {
            case 1:
               return false;
            case 0:
               return true;
         }
      }
///// Get All Users
      $scope.getUsers = function () {
          functions.async("POST",url,'getUsers').then(function (promise) {
             $scope.users = promise.data;
          });
      };
///// Get current Roles
      $scope.getRoles = function () {
          functions.async("POST",url,'getRoles').then(function (promise) {
             $scope.roles = promise.data;
          });
      };
/// INSERT new user
      $scope.newUser  = "";
      $scope.newUserPass  = "";
      $scope.newUserRole  = "";
      $scope.newUserName = "";
      $scope.newUserLastName = "";
      $scope.newImageUser = "";
      $scope.imageUser = {};
      $scope.addUser = function () {
         if ($scope.newUserName !== "" && $scope.newUserLastName !== "" && $scope.newImageUser !== "" && $scope.newUser !== "" && $scope.newUserPass !== "" && $scope.newUserRole !== "") {
            var params = {};
            params.user = $scope.newUser;
            params.pass = $scope.newUserPass;
            params.name = $scope.newUserName;
            params.lastname = $scope.newUserLastName;
            params.rol = $scope.newUserRole;
            params.img = $scope.newImageUser;
            params = JSON.stringify(params);
            functions.async("POST",url,'addUser',params).then(function (promise) {
               if(promise.data == "true"){
                  swal("Good job!", "You add a new User!", "success");
                  $scope.newUser  = "";
                  $scope.newUserPass  = "";
                  $scope.newUserRole  = "";
                  $scope.newUserName = "";
                  $scope.newUserLastName = "";
                  $scope.newImageUser = "";
                  $scope.imageUser = {};
                  $scope.uploadOK = true;
                  $scope.getUsers();
               }else{
                  swal("Opps!!", "Something went wrong!","error");
                  console.log(promise.data);
               }
            });
         }else{
            swal("Opps!!", "Missing Fields","error");
         }
      };
//// DEACTIVATE User
      $scope.banUser = function (id) {
         functions.async("POST",url,'banUser',id).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You banned this User!", "success");
               $scope.getUsers();
            }else{
               swal("Opps!","Something went wrong!","error");
            }
            $scope.vm.dtInstance.reloadData();
         });
      };
/////////// Activate User

   $scope.activeUser = function (id) {
      functions.async("POST",url,'activeUser',id).then(function (promise) {
         if (promise.data == "true") {
            swal("Good job!", "You re-active this User!", "success");
            $scope.getUsers();
         }else{
            swal("Opps!","Something went wrong!","error");
         }
         $scope.vm.dtInstance.reloadData();
      });
   };

//// UPDATE USER Activities
      $scope.validUserName = true;
      $scope.validPassword = true;
      $scope.validRol = true;

//// Check if username field is empty in order to activate the button (modal)
      $scope.checkUsername = function () {
         if ($scope.updateUserName !== "" && $scope.updateUserName !== null && $scope.updateUserName !== undefined) {
            $scope.validUserName = false;
         }else{
            $scope.validUserName = true;
         }
      }
//// Check if password field is empty in order to activate the button (modal)
      $scope.checkPass = function () {
         if ($scope.updateUserPassword !== "" && $scope.updateUserPassword !== null && $scope.updateUserPassword !== undefined) {
            $scope.validPassword = false;
         }else{
            $scope.validPassword = true;
         }
      }
//// Check if password field is empty in order to activate the button (modal)
      $scope.checkRol = function () {
         if ($scope.updateUserRole !== "" && $scope.updateUserRole !== null && $scope.updateUserRole !== undefined) {
            $scope.validRol = false;
         }else{
            $scope.validRol = true;
         }
      }
////// Update User name
      $scope.updateUser = function () {
         var params = {};
         params.user = $scope.updateUserName;
         params.idUser = $scope.idUpdateUser;
         params = JSON.stringify(params);
         functions.async("POST",url,'setNewUserName',params).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You change the username for this User!", "success");
               $scope.updateUserName = "";
            }else{
               swal("Opps!","Something went wrong!","error");
            }
            $scope.updateUserName = "";
            $scope.validUserName = true;
            $scope.vm.dtInstance.reloadData();
         });
      }
////// Update Password
      $scope.updatePassword = function () {
         var params = {};
         params.password = $scope.updateUserPassword;
         params.idUser = $scope.idUpdateUser;
         params = JSON.stringify(params);
         functions.async("POST",url,'setNewPassword',params).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You change the passoword for this User!", "success");
               $scope.updateUserPassword = "";
            }else{
               swal("Opps!","Something went wrong!","error");
            }
            $scope.updateUserPassword = "";
            $scope.validPassword = true;
            $scope.vm.dtInstance.reloadData();
         });
      }
////// Update Role
      $scope.updateRole = function () {
         var params = {};
         params.role = $scope.updateUserRole;
         params.idUser = $scope.idUpdateUser;
         params = JSON.stringify(params);
         functions.async("POST",url,'setNewRole',params).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You change the role for this User!", "success");
               $scope.updateUserRole = "";
            }else{
               swal("Opps!","Something went wrong!","error");
            }
            $scope.updateUserRole = "";
            $scope.validRol = true;
            $scope.vm.dtInstance.reloadData();
         });
      }


       var init = function () {
          functions.getSession();
          $scope.getRoles();
          $(document).ready(function(){
                 $('[data-toggle="tooltip"]').tooltip();
             });
       };

       init();
   }
 });
