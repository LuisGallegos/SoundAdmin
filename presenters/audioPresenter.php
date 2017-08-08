<?php

include '../models/audioModel.php';
$audioPresenter = new audioPresenter();

$request = filter_input(INPUT_POST, "request", FILTER_SANITIZE_STRING);
$params = filter_input(INPUT_POST, "params");

$audioPresenter->$request($params);

class audioPresenter{
  private $audioModel;

  function __construct(){
    $this->audioModel = new audioModel();
  }

  function getAudio(){
	   echo $this->audioModel->getAudio();
  }


  public function banUser($params){
    echo $this->audioModel->banUser($params);
  }

  public function setNewSongName($params){
    echo $this->audioModel->setNewSongName($params);
  }

  public function setNewAlbum($params){
    echo $this->audioModel->setNewAlbum($params);
  }

  public function setNewYear($params){
    echo $this->audioModel->setNewYear($params);
  }

  public function setNewArtist($params){
    echo $this->audioModel->setNewArtist($params);
  }

  public function setNewGenre($params){
    echo $this->audioModel->setNewGenre($params);
  }

  public function setNewLength($params){
    echo $this->audioModel->setNewLength($params);
  }

}

?>
