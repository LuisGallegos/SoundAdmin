/*
 @author: Luis Gallegos
 @version: 1.0
 This is the JavaScript File help us to send the values to the php files.
 */
 define([], function( ){
   return ['functions','$scope','$rootScope','$timeout'],
   function(functions,$scope,$rootScope,$timeout,Upload){
      var url = '../presenters/newAudioPresenter.php';
      $scope.newAudio={
         name: "",
         album: "",
         year : "",
         artirst : "",
         genre : "",
         duration : "",
         album_image : "",
         track_name : "",
      };

      $scope.setAudio = function () {
         $scope.newAudio.name = $scope.audio.name;
         $scope.newAudio.name = $scope.newAudio.name.replace(".mp3","");
         $scope.upload($scope.audio,true,"track");
      };

      $scope.setAlbum = function () {
         $scope.newAudio.album = $scope.image.name;
         $scope.newAudio.album = $scope.newAudio.album.replace(".jpg","");
         $scope.upload($scope.image,true);
      };

      $scope.uploadOK = true;

      $scope.addAudio = function () {
         $scope.newAudio.album_image = $scope.image.name.replace(".jpg","");
         $scope.newAudio.track_name = $scope.audio.name.replace(".mp3","")
         $scope.newAudio.owner = $rootScope.userData.username;
         var params = JSON.stringify($scope.newAudio);
         functions.async("POST",url,'addAudioRecord',params).then(function (promise) {
            if(promise.data == "true"){
             swal("Good job!", "You add a new User!", "success");
             $scope.newAudio = {};
             $scope.audio = {};
             $scope.image = {};
             $scope.newAudio={
               name: "",
               album: "",
               year : "",
               artirst : "",
               genre : "",
               duration : "",
               album_image : "",
               track_name : "",
            };
          }else{
             swal("Opps!!", "Something went wrong!","error");
             console.log(promise.data);
          }
         });
      };

      ///// upload

      $scope.audio = {};
      $scope.image = {};

      function checkValidUploads() {
         if ($scope.audio.progress !== undefined && $scope.image.progress !== undefined) {
            $scope.uploadOK = false;
         }else{
            $scope.uploadOK = true;
         }
      }

    $scope.upload = function (file, resumable,flag) {
      if (flag == "track") {
         var path = "C:/wamp/www/Steve/P14/assets/audio/";
         uploadUsingUpload(file, resumable,path);
      }else{
         var path = "C:/wamp/www/Steve/P14/assets/img/";
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

       var init = function () {
          functions.getSession();
          $(document).ready(function(){
                 $('[data-toggle="tooltip"]').tooltip();
             });
       };

       init();
   }
 });
