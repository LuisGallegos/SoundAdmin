<?php

include '../models/modifyUserModel.php';
$modifyUserPresenter = new modifyUserPresenter();

$request = filter_input(INPUT_POST, "request", FILTER_SANITIZE_STRING);
$params = filter_input(INPUT_POST, "params");

$modifyUserPresenter->$request($params);

class modifyUserPresenter{
  private $modifyUserModel;

  function __construct(){
    $this->modifyUserModel = new modifyUserModel();
  }

  public function banUser($params){
    echo $this->modifyUserModel->banUser($params);
  }

  public function setNewName($params){
    echo $this->modifyUserModel->setNewName($params);
  }

  public function setNewLastName($params){
    echo $this->modifyUserModel->setNewLastName($params);
  }

  public function setNewPass($params){
    echo $this->modifyUserModel->setNewPass($params);
  }

}

?>
