/*
 @author: Luis Gallegos
 @version: 1.0
 This is the JavaScript File help us to send the values to the php files.
 */
 define([], function( ){
   return ['functions','$scope','$q','$rootScope','$compile','$timeout'],
   function(functions,$scope, $compile,$q,$rootScope,$timeout,Upload,DTOptionsBuilder, DTColumnBuilder){
       var url = '../presenters/audioPresenter.php';
////////////////////// USER TABLE
        $scope.vm = this;
        $scope.vm.songs = {};
        $scope.vm.dtInstance = {};
        $scope.vm.dtOptions = DTOptionsBuilder
            .fromFnPromise(function () {
               var defer = $q.defer();
               functions.async("POST",url,'getAudio').then(function (promise) {
                  $scope.songs = promise.data;
                  defer.resolve(promise.data);
                  //return promise.data;
               })
               return defer.promise;
            })
            // Add Bootstrap compatibility
            .withOption('createdRow', createdRow)
            .withBootstrap();
        $scope.vm.dtColumns = [
            DTColumnBuilder.newColumn('id_Track').withTitle('ID').withClass('text-danger'),
            DTColumnBuilder.newColumn('name').withTitle('Song Name'),
            DTColumnBuilder.newColumn(null).withTitle('Album').withClass('text-center').notSortable().renderWith(images),
            DTColumnBuilder.newColumn('year').withTitle('Year'),
            DTColumnBuilder.newColumn('artist').withTitle('Artist'),
            DTColumnBuilder.newColumn('genre').withTitle('Genre'),
            DTColumnBuilder.newColumn('owner').withTitle('Uploaded by'),
            DTColumnBuilder.newColumn(null).withTitle('Preview').notSortable().renderWith(song),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
        ];


        function actionsHtml(data, type, full, meta) {
           $scope.vm.songs[data.id_Track] = data;
           return '<button class="btn btn-warning" ng-click="edit('+ data.id_Track + ')" data-toggle="modal" data-target="#myModal">' +
               '   <i class="fa fa-edit"></i>' +
               '</button>&nbsp;' +
               '<button class="btn btn-danger" ng-click="deleteRow(vm.songs[' + data.id_Track + '])">' +
               '   <i class="fa fa-trash"></i>' +
               '</button>&nbsp;';
         }

         function images(data,type,full,meta) {
            data.album_image = data.album_image.replace(/ /g, '%20');
            return '<img style="height: 90px; width: 90px;" src="../assets/img/'+data.album_image+'.jpg" alt="Album Name"><br><strong>'+data.album+'</strong>';
         }

         function song(data,type,full,meta) {
            data.track_name = data.track_name.replace(/ /g, '%20');
            return '<audio controls src="../assets/audio/'+data.track_name+'.mp3"></audio>';
         }

         function createdRow(row, data, dataIndex) {
              // Recompiling so we can bind Angular directive to the DT
              $compile(angular.element(row).contents())($scope);
          }

          $scope.edit = function(id) {
             $scope.setOldImage = $scope.vm.songs[id]['album_image'];
             $scope.idUpdateSong = id;

          }

          $scope.deleteRow = function(object) {
             $scope.deleteSong(object);
          }

          $scope.activeRow = function(id) {
             // $scope.activeUser(id);
          }
/////////////// USER FORM Image

   $scope.setAlbum = function () {
      $scope.newImageUser = $scope.imageAlbum.name
      $scope.newImageUser = $scope.newImageUser.replace(".jpg","");
      $scope.upload($scope.imageAlbum,true);
   };

    $scope.chunkSize = 100000;
    $scope.uploadOK = true;

    $scope.getReqParams = function () {
     return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
     '&errorMessage=' + $scope.serverErrorMsg : '';
   };


   $scope.upload = function (file, resumable,flag) {
      var path = "C:/wamp/www/Steve/P14/assets/img/";
      uploadUsingUpload(file,resumable,path);
      checkValidUploads();
      $scope.vm.dtInstance.reloadData();
  };

  var urlTrack = '../models/uploadChange.php';

  function uploadUsingUpload(file, resumable, path) {
   file.upload = Upload.upload({
     url: urlTrack,
     headers: {
       'optional-header': 'header-value'
     },
     data: {path: path, file: file, name:$scope.setOldImage, newImage: $scope.newImageUser, id:$scope.idUpdateSong}
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
   $scope.vm.dtInstance.reloadData();

}
   function checkValidUploads() {
      if ($scope.newImageUser.progress !== undefined) {
         $scope.uploadOK = false;
      }else{
         $scope.uploadOK = true;
      }
   }

//// DEACTIVATE SONG
      $scope.deleteSong = function (object) {
         console.log(object);
         var params = {};
         params.id = object.id_Track
         params.track_name = object.track_name.replace(/%20/g," ");
         params.track_name = params.track_name + ".mp3";
         params.album_image = object.album_image.replace(/%20/g," ");
         params.album_image = params.album_image + ".jpg";
         params = JSON.stringify(params);
         functions.async("POST",url,'banUser',params).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You banned this User!", "success");

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
      $scope.validSongName = true;
      $scope.validAlbumName = true;
      $scope.validYear = true;
      $scope.validArtist = true;
      $scope.validLength = true;
      $scope.validGenre = true;

//// Check if Song Name field is empty in order to activate the button (modal)
      $scope.checkSongname = function () {
         if ($scope.updateSongName !== "" && $scope.updateSongName !== null && $scope.updateSongName !== undefined) {
            $scope.validSongName = false;
         }else{
            $scope.validSongName = true;
         }
      }
//// Check if Song Album field is empty in order to activate the button (modal)
      $scope.checkSongAlbum = function () {
         if ($scope.updateAlbumName !== "" && $scope.updateAlbumName !== null && $scope.updateAlbumName !== undefined) {
            $scope.validAlbumName = false;
         }else{
            $scope.validAlbumName = true;
         }
      }
//// Check if Song Year field is empty in order to activate the button (modal)
      $scope.checkYear = function () {
         if ($scope.updateYear !== "" && $scope.updateYear !== null && $scope.updateYear !== undefined) {
            $scope.validYear = false;
         }else{
            $scope.validYear = true;
         }
      }
//// Check if Song Artist field is empty in order to activate the button (modal)
      $scope.checkYear = function () {
         if ($scope.updateArtist !== "" && $scope.updateArtist !== null && $scope.updateArtist !== undefined) {
            $scope.validArtist = false;
         }else{
            $scope.validArtist = true;
         }
      }
//// Check if Song Lenght field is empty in order to activate the button (modal)
      $scope.checkLength = function () {
         if ($scope.updateLength !== "" && $scope.updateLength !== null && $scope.updateLength !== undefined) {
            $scope.validLength = false;
         }else{
            $scope.validLength = true;
         }
      }

//// Check if Song Lenght field is empty in order to activate the button (modal)
      $scope.checkGenre = function () {
         if ($scope.updateGenre !== "" && $scope.updateGenre !== null && $scope.updateGenre !== undefined) {
            $scope.validGenre = false;
         }else{
            $scope.validGenre = true;
         }
      }
////// Update User name
      $scope.updateSongNameCall = function () {
         var params = {};
         params.songname = $scope.updateSongName;
         params.idSong = $scope.idUpdateSong;
         params = JSON.stringify(params);
         functions.async("POST",url,'setNewSongName',params).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You change the song name for this track!", "success");
               $scope.updateSongName = "";
            }else{
               swal("Opps!","Something went wrong!","error");
            }
            $scope.updateSongName = "";
            $scope.validUserName = true;
            $scope.vm.dtInstance.reloadData();
         });
      }
////// Update Password
      $scope.updateSongAlbum = function () {
         var params = {};
         params.password = $scope.updateAlbumName;
         params.idSong = $scope.idUpdateSong;
         params = JSON.stringify(params);
         functions.async("POST",url,'setNewAlbum',params).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You change the album name for this song!", "success");
               $scope.updateAlbumName = "";
            }else{
               swal("Opps!","Something went wrong!","error");
            }
            $scope.updateAlbumName = "";
            $scope.validAlbumName = true;
            $scope.vm.dtInstance.reloadData();
         });
      }
////// Update Year
      $scope.updateNewYear = function () {
         var params = {};
         params.role = $scope.updateYear;
         params.idUser = $scope.idUpdateSong;
         params = JSON.stringify(params);
         functions.async("POST",url,'setNewYear',params).then(function (promise) {
            if (promise.data == "true") {
               swal("Good job!", "You change the year for this song!", "success");
               $scope.updateYear = "";
            }else{
               swal("Opps!","Something went wrong!","error");
            }
            $scope.updateYear = "";
            $scope.validYear = true;
            $scope.vm.dtInstance.reloadData();
         });
      }
////// Update Year
         $scope.updateNewArtist = function () {
            var params = {};
            params.role = $scope.updateArtist;
            params.idUser = $scope.idUpdateSong;
            params = JSON.stringify(params);
            functions.async("POST",url,'setNewArtist',params).then(function (promise) {
               if (promise.data == "true") {
                  swal("Good job!", "You change the artist for this song!", "success");
                  $scope.updateArtist = "";
               }else{
                  swal("Opps!","Something went wrong!","error");
               }
               $scope.updateArtist = "";
               $scope.validArtist = true;
               $scope.vm.dtInstance.reloadData();
            });
         }
////// Update Year
         $scope.updateNewLength = function () {
               var params = {};
               params.role = $scope.updateLength;
               params.idUser = $scope.idUpdateSong;
               params = JSON.stringify(params);
               functions.async("POST",url,'setNewLength',params).then(function (promise) {
                  if (promise.data == "true") {
                     swal("Good job!", "You change the lenght for this song!", "success");
                     $scope.updateLength = "";
                  }else{
                     swal("Opps!","Something went wrong!","error");
                  }
                  $scope.updateLength = "";
                  $scope.validLength = true;
                  $scope.vm.dtInstance.reloadData();
               });
            }
////// Update Year
            $scope.updateNewGenre = function () {
                  var params = {};
                  params.role = $scope.updateGenre;
                  params.idUser = $scope.idUpdateSong;
                  params = JSON.stringify(params);
                  functions.async("POST",url,'setNewGenre',params).then(function (promise) {
                     if (promise.data == "true") {
                        swal("Good job!", "You change the genre for this song!", "success");
                        $scope.updateGenre = "";
                     }else{
                        swal("Opps!","Something went wrong!","error");
                     }
                     $scope.updateGenre = "";
                     $scope.validGenre = true;
                     $scope.vm.dtInstance.reloadData();
                  });
               }

       var init = function () {
          functions.getSession();
          //$scope.getRoles();
       };

       init();
   }
 });
