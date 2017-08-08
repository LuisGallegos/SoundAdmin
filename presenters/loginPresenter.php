<?php

include '../models/loginModel.php';
$loginPresenter = new loginPresenter();

$request = filter_input(INPUT_POST, "request", FILTER_SANITIZE_STRING);
$params = filter_input(INPUT_POST, "params");

$loginPresenter->$request($params);

class loginPresenter{
  private $loginModel;

  function __construct(){
    $this->loginModel = new loginModel();
  }

  function getSession($params){
	   echo $this->loginModel->getSession($params);
  }

}

?>
