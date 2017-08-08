<?php
include('connection.php');

function convertToJson($resultSet) {
    $resultSetArray = Array();
    foreach ($resultSet as $row) {
        $resultSetArray[] = $row;
    }
    if ($resultSet->_numOfRows < 2 && $resultSet->_numOfRows > 0) {
        if(!is_array($resultSetArray[0])) {
            return json_encode($resultSetArray[0]);
        }
    }
    return json_encode($resultSetArray);
}

function convertToAsocArray($json) {
    $newIOIArray = json_decode($json);
    $resultAscoArray = array();
    foreach ($newIOIArray as $row => $data) {
        $rowArray = array();
        foreach ($data as $colName => $value) {
            $rowArray[$colName] = $value;
        }
        $resultAscoArray[$row] = $rowArray;
    }
    return $resultAscoArray;
}

  function JSONToArray($object){
      $newArray = array();
      $i=0;
      foreach ($object as $value) {
        $newArray[$i]=$value;
        $i++;
      }
      return $newArray;
    }

function executeQuery($query, $params = null) {
    global $conn;
    try {
        $stmt = $conn->Prepare($query);
        if ($params) {
            $resultSet = $conn->Execute($stmt, $params);
        } else {
            $resultSet = $conn->Execute($stmt);
        }
        $result = convertToJson($resultSet);
    } catch (Exception $ex) {
        $result = $ex->getMessage();
//        $result = json_encode(false);
    }
    return $result;
  }

  function startTransaction() {
      global $conn;
      $conn->StartTrans();
  }

  function endTransaction() {
      global $conn;
      return $conn->CompleteTrans();
  }

  function getLastInsertID() {
      global $conn;
      return $conn->Insert_ID();
  }

  function getOne($query){
    global $conn;
    $result = $conn->GetOne($query);
    return $result;
  }


 ?>
