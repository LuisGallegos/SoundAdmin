<?php
require('queries.php');
include('../lib/sharedFunctions.php');  //// THIS FILES CONTAINTS executeQuery and startTransaction and endTransaction functions

//CLASS TO CHECK DATA THE USER SUBMITTS, INHERITS FROM UserData.
class modifyUserModel {


  public function setNewName($params){
    global $UPDATE_NAME;
    startTransaction();
    executeQuery($UPDATE_NAME,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewLastName($params){
    global $UPDATE_LAST_NAME;
    startTransaction();
    executeQuery($UPDATE_LAST_NAME,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewPass($params){
    global $UPDATE_PASSWORD;
    startTransaction();
    executeQuery($UPDATE_PASSWORD,json_decode($params,true));
    return json_encode(endTransaction());
  }

}

?>
