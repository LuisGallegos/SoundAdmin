<?php
require('queries.php');
include('../lib/sharedFunctions.php');

$filename = $_FILES['file']['name'];
$meta = $_POST;
$destination = $meta['path'] . $filename;
$oldImage = $meta['path'] . $meta['name']. ".jpg";

if(unlink($oldImage) == true){
  if(move_uploaded_file( $_FILES['file']['tmp_name'] , $destination ) == true){
    global $UPDATE_SONG_ALBUM_IMAGE;
    startTransaction();
    $data = array( $meta['newImage'], $meta['id']);
    executeQuery($UPDATE_SONG_ALBUM_IMAGE,$data);
    endTransaction();
  }else{

  }
}else{

}




 ?>
