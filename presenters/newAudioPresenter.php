<?php

include '../models/newAudioModel.php';
$audioPresenter = new audioPresenter();

$request = filter_input(INPUT_POST, "request", FILTER_SANITIZE_STRING);
$params = filter_input(INPUT_POST, "params");

$audioPresenter->$request($params);

class audioPresenter{
  private $audioModel;

  function __construct(){
    $this->audioModel = new audioModel();
  }

  public function addAudioRecord($params){
    echo $this->audioModel->addAudioRecord($params);
  }


}

?>
