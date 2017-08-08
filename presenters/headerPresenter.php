<?php

include '../models/headerModel.php';
$headerPresenter = new headerPresenter();

$request = filter_input(INPUT_POST, "request", FILTER_SANITIZE_STRING);
$params = filter_input(INPUT_POST, "params");

$headerPresenter->$request($params);

class headerPresenter{
  private $headerModel;

  function __construct(){
    $this->headerModel = new headerModel();
  }

  function getPermission($params){
	   echo $this->headerModel->getPermission($params);
  }

}

?>
