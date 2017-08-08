<?php
include_once('../lib/config.php');
include('../lib/adodb5/adodb.inc.php');
// include ('../models/queries.php');
global $dbhost, $dbuname, $dbpass, $dbname;
// ADOLoadCode('mysqli');
$conn = ADONewConnection('mysqli'); # eg 'mysql' o 'postgres'   // Select the driver
$conn->Connect($dbhost, $dbuname, $dbpass, $dbname) or die ("the database is not accessible"); // Make connection
$conn->EXECUTE("set names 'utf8'");//Set names or encoding to UTF 8
$conn->debug = false;// Debug of connection

// $recordSet = $conn->Execute("SELECT * FROM users;");
// if (!$recordSet)
// 	print $conn->ErrorMsg();
// else
// while (!$recordSet->EOF) {
// 	print $recordSet->fields[0].' '.$recordSet->fields[1].'<BR>';
// 	$recordSet->MoveNext();
// }
?>
