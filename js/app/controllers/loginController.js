/*
 @author: Luis Gallegos
 @version: 1.0
 This is the JavaScript File help us to send the values to the php files.
 */
 define([], function( ){
   return ['functions','$scope','$rootScope'],
   function($scope,$rootScope,functions){
       var url = '../presenters/loginPresenter.php';

       this.postForm = function () {   //First Function that obtains the Username and Password
       var params = {};
       params.username = this.inputData.username;
       params.password = this.inputData.password;
       params = JSON.stringify(params);
       functions.async("POST",url,'getSession',params).then(function (promise) {
          console.log(promise.data);
          if (promise.data[0] == "found") {
             sweetAlert({                //SweetAlert message
                title: "Good job!",     //Title
                 text: "You have logged in successfully!", //Body
                 type: "success" //Type of Message
               },function () { //Funcion that send us to the Home page
                  $rootScope.userRole = promise.data[1];
                  window.location.href = "../views/general.php";
               });
          }else if (promise.data == "wrongS") {
             sweetAlert("Oops...", "Something went wrong! Your user is block", "error");
          }else if(promise.data == "wrong"){
             sweetAlert("Oops...", "Something went wrong! Wrong SSO or Password", "error");
          }else{
             sweetAlert("Error!", "Unable to submit form!", "error");
          }
       });
     };

     this.createSigma= function(){
       bodyController.newsigma();
     };
   }
 });
