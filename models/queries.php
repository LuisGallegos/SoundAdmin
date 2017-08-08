<?php


//:::::SELECT
// $SELECT_USERS_DATA = "SELECT users.username, users.pass, users.stat, attempts.times FROM users INNER JOIN attempts ON users.username = attempts.username WHERE users.username= ?;";
$SELECT_CHECKUSER= "SELECT username, password, rol FROM users WHERE username=?;"; //Chek if the user already exist

$SELECT_USER = "SELECT * FROM users WHERE username=? AND password = ? AND active = 1;";

$SELECT_USER_ROL = "SELECT rol.name as rol, img,users.name,lastname,username,password,id_Users FROM users INNER JOIN rol ON users.rol = rol.id_Rol WHERE users.username=?;";

$SELECT_USERS = "SELECT * FROM users WHERE username NOT LIKE ?;";

$SELECT_ROLES = "SELECT * FROM rol;";

$SELECT_AUDIO = "SELECT * FROM tracks;";

//:::::UPDATES

$DEACTIVE_USER = "UPDATE users SET active = 0 WHERE id_Users = ?;";

$ACTIVE_USER = "UPDATE users SET active = 1 WHERE id_Users = ?;";

$UPDATE_USERNAME = "UPDATE users SET username = ? WHERE id_Users = ?;";

$UPDATE_PASSWORD = "UPDATE users SET password = ? WHERE id_Users = ?;";

$UPDATE_ROLE = "UPDATE users SET rol = ? WHERE id_Users = ?;";

$UPDATE_SONG_NAME = "UPDATE tracks SET name = ? WHERE id_Track = ?;";

$UPDATE_SONG_ALBUM = "UPDATE tracks SET album = ? WHERE id_Track = ?;";

$UPDATE_SONG_YEAR = "UPDATE tracks SET year = ? WHERE id_Track = ?;";

$UPDATE_SONG_ARTIST = "UPDATE tracks SET artist = ? WHERE id_Track = ?;";

$UPDATE_SONG_GENRE = "UPDATE tracks SET genre = ? WHERE id_Track = ?;";

$UPDATE_SONG_LENGTH = "UPDATE tracks SET legnth = ? WHERE id_Track = ?;";

$UPDATE_SONG_ALBUM_IMAGE = "UPDATE tracks SET album_image = ? WHERE id_Track = ?;";

$UPDATE_PROFILE_IMAGE = "UPDATE users SET img = ? WHERE id_Users = ?;";

$UPDATE_NAME = "UPDATE users SET name = ? WHERE id_Users = ?;";

$UPDATE_LAST_NAME = "UPDATE users SET lastname = ? WHERE id_Users = ?;";

$UPDATE_PASSWORD = "UPDATE users SET password = ? WHERE id_Users = ?;";

//:::::INSERTS

$INSERT_USER = "INSERT INTO users VALUES (null,?,?,?,?,?,?,1);";

$INSERT_AUDIO = "INSERT INTO tracks VALUES (NULL,?, ?, ?, ?, ?, ?, ?, ?, ?);";


//:::::DELETES

$DELETE_AUDIO = "DELETE FROM tracks WHERE id_Track = ?;";

?>
