<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addPersonnelCategory':
    $result = $conn->query("INSERT INTO `personnel_category`(`category`)
    VALUES ('" . $input->category . "')") ;
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deletePersonnelCategory':
    $result = $conn->query("DELETE FROM `personnel_category` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updatePersonnelCategory':
    $result = $conn->query("UPDATE `personnel_category` SET `category`='" . $input->category . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchPersonnelCategory':
    $result = $conn->query("SELECT `id`, `category`, `created_at`, `updated_at` FROM `personnel_category` ORDER BY `category` ASC");
    if(!$result) {
      echo $conn->error;
    } else {
      $rows = array();
      while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $rows[] = $rs;
      }
      echo json_encode($rows, JSON_NUMERIC_CHECK);
    }
    break;
  default:
    print('NO METHOD');
    http_response_code(404);
    break;
}

//not necessary
$conn->close();
?>
