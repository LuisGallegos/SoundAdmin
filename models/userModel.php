<?php
require('queries.php');
include('../lib/sharedFunctions.php');  //// THIS FILES CONTAINTS executeQuery and startTransaction and endTransaction functions

//CLASS TO CHECK DATA THE USER SUBMITTS, INHERITS FROM UserData.
class userModel {

  public function getUsers($params){
    global $SELECT_USERS;
    return executeQuery($SELECT_USERS,$params);
  }

  public function getRoles(){
    global $SELECT_ROLES;
    return executeQuery($SELECT_ROLES);
  }

  public function addUser($params){
    global $INSERT_USER;
    startTransaction();
    executeQuery($INSERT_USER,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function banUser($params){
    global $DEACTIVE_USER;
    startTransaction();
    executeQuery($DEACTIVE_USER,$params);
    return json_encode(endTransaction());
  }

  public function activeUser($params){
    global $ACTIVE_USER;
    startTransaction();
    executeQuery($ACTIVE_USER,$params);
    return json_encode(endTransaction());
  }

  public function setNewUserName($params){
    global $UPDATE_USERNAME;
    startTransaction();
    executeQuery($UPDATE_USERNAME,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewPassword($params){
    global $UPDATE_PASSWORD;
    startTransaction();
    executeQuery($UPDATE_PASSWORD,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewRole($params){
    global $UPDATE_ROLE;
    startTransaction();
    executeQuery($UPDATE_ROLE,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewStatus($params){
    global $UPDATE_STATUS;
    startTransaction();
    executeQuery($UPDATE_STATUS,json_decode($params,true));
    return json_encode(endTransaction());
  }

}

?>
