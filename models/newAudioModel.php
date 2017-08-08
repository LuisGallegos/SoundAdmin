<?php
require('queries.php');
include('../lib/sharedFunctions.php');  //// THIS FILES CONTAINTS executeQuery and startTransaction and endTransaction functions

//CLASS TO CHECK DATA THE USER SUBMITTS, INHERITS FROM UserData.
class audioModel {

  public function addAudioRecord($params){
    global $INSERT_AUDIO;
    startTransaction();
    executeQuery($INSERT_AUDIO,json_decode($params,true));
    return json_encode(endTransaction());
  }

}

?>
