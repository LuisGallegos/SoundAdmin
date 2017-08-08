<?php
require('queries.php');
include('../lib/sharedFunctions.php');  //// THIS FILES CONTAINTS executeQuery and startTransaction and endTransaction functions

//CLASS TO CHECK DATA THE audio SUBMITTS, INHERITS FROM audioData.
class audioModel {

  public function getAudio(){
    global $SELECT_AUDIO;
    return executeQuery($SELECT_AUDIO);
  }

  public function banUser($params){
    global $DELETE_AUDIO;
    $data = json_decode($params,true);
    $fileSong = "C:/wamp/www/Steve/P14/assets/audio/".$data['track_name'];
    $filePhoto = "C:/wamp/www/Steve/P14/assets/img/".$data['album_image'];
    if(unlink($fileSong) == true && unlink($filePhoto) == true){
      startTransaction();
      executeQuery($DELETE_AUDIO,$data['id']);
      return json_encode(endTransaction());
    }else {
      return 'false';
    }
  }

  public function setNewSongName($params){
      global $UPDATE_SONG_NAME;
      startTransaction();
      executeQuery($UPDATE_SONG_NAME,json_decode($params,true));
      return json_encode(endTransaction());
  }

  public function setNewAlbum($params){
      global $UPDATE_SONG_ALBUM;
      startTransaction();
      executeQuery($UPDATE_SONG_ALBUM,json_decode($params,true));
      return json_encode(endTransaction());
  }

  public function setNewYear($params){
    global $UPDATE_SONG_YEAR;
    startTransaction();
    executeQuery($UPDATE_SONG_YEAR,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewArtist($params){
    global $UPDATE_SONG_ARTIST;
    startTransaction();
    executeQuery($UPDATE_SONG_ARTIST,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewGenre($params){
    global $UPDATE_SONG_GENRE;
    startTransaction();
    executeQuery($UPDATE_SONG_GENRE,json_decode($params,true));
    return json_encode(endTransaction());
  }

  public function setNewLength($params){
    global $UPDATE_SONG_LENGTH;
    startTransaction();
    executeQuery($UPDATE_SONG_LENGTH,json_decode($params,true));
    return json_encode(endTransaction());
  }
  
}

?>
