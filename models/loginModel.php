<?php
require('queries.php');
include('../lib/sharedFunctions.php');

//CLASS TO CHECK DATA THE USER SUBMITTS, INHERITS FROM UserData.
class loginModel {

  public function getSession($params){
    global $SELECT_USER;

    $userData = executeQuery($SELECT_USER,json_decode($params,true));
    $userData = json_decode($userData,true);
    $size = sizeof($userData);
    if ($size != 0) {
      if($userData[0]['active'] == '1'){
        $this->initSession($userData[0]['username']);
        $data  = array("found",$userData[0]['rol']);
        return json_encode($data);
      }else{
        $data  = "wrongS";
        return $data;
      }
    }else{
      $data  = "wrong";
      return $data;
    }
  }

//CREATES A PHP SESSION FOR OUR USER
  public function initSession($username){
    $_SESSION = array();
    session_id('active');
    session_start();
    $_SESSION['timeout'] = time();
    if (isset($_SESSION['username'])) {
        $_SESSION['username'] = $username;
    } else {
        $_SESSION['username'] = $username;
    }
  }

}

?>
