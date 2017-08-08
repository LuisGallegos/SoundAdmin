<?php
require('queries.php');
include('../lib/sharedFunctions.php');

//CLASS TO CHECK DATA THE USER SUBMITTS, INHERITS FROM UserData.
class headerModel {

  public function getPermission($params){
    global $SELECT_USER_ROL;
    // var_dump($params);
    return executeQuery($SELECT_USER_ROL,json_decode($params,true));
  }

}

?>
