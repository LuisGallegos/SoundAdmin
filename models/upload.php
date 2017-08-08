<?php

$filename = $_FILES['file']['name'];
$meta = $_POST;
$destination = $meta['path'] . $filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );

 ?>
