<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addRoomType':
    $result = $conn->query("INSERT INTO `room_type`(`type`)
    VALUES ('" . $input->type . "')") ;
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteRoomType':
    $result = $conn->query("DELETE FROM `room_type` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updateRoomType':
    $result = $conn->query("UPDATE `room_type` SET `type`='" . $input->type . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchRoomType':
    $result = $conn->query("SELECT `id`, `type`, `created_at`, `updated_at` FROM `room_type` ORDER BY `type` ASC");
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
