<?php

include '../models/userModel.php';
$userPresenter = new userPresenter();

$request = filter_input(INPUT_POST, "request", FILTER_SANITIZE_STRING);
$params = filter_input(INPUT_POST, "params");

$userPresenter->$request($params);

class userPresenter{
  private $userModel;

  function __construct(){
    $this->userModel = new userModel();
  }

  function getUsers($params){
	   echo $this->userModel->getUsers($params);
  }

  function getRoles(){
     echo $this->userModel->getRoles();
  }

  public function addUser($params){
    echo $this->userModel->addUser($params);
  }

  public function banUser($params){
    echo $this->userModel->banUser($params);
  }

  public function activeUser($params){
    echo $this->userModel->activeUser($params);
  }

  public function setNewUserName($params){
    echo $this->userModel->setNewUserName($params);
  }

  public function setNewPassword($params){
    echo $this->userModel->setNewPassword($params);
  }

  public function setNewRole($params){
    echo $this->userModel->setNewRole($params);
  }

  public function setNewStatus($params){
    echo $this->userModel->setNewStatus($params);
  }

}

?>
