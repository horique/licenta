<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addRoom':
    $result = $conn->query("INSERT INTO `room`(`room_type_id`, `responsible1_id`, `responsible2_id`, `name`, `capacity`) VALUES
    ((SELECT `id` FROM `room_type` WHERE `type` = '" . $input->type . "'),
    (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->responsible1 . "', '-', -1))),
    (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->responsible2 . "', '-', -1))),
    '" . $input->name . "', '" .  $input->capacity . "')");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteRoom':
    $result = $conn->query("DELETE FROM `room` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updateRoom':
    $result = $conn->query("UPDATE `room` SET
    `room_type_id` = (SELECT `id` FROM `room_type` WHERE `type` = '" . $input->type . "'),
    `responsible1_id` = (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->responsible1 . "', '-', -1))),
    `responsible2_id` = (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->responsible2 . "', '-', -1))),
    `name` = '" . $input->name . "', `capacity` = '" .  $input->capacity . "' WHERE `id`= '" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchRoom':
    $result = $conn->query("SELECT r.`id`, r.`room_type_id`, r.`responsible1_id`, r.`responsible2_id`, rt.`type`, (SELECT CONCAT(`full_name`, '-', `cnp`) FROM `personnel` WHERE `id` = r.`responsible1_id`) AS `responsible1`, (SELECT CONCAT(`full_name`, '-', `cnp`) FROM `personnel` WHERE `id` = r.`responsible2_id`) AS `responsible2`, r.`name`, r.`capacity`, r.`created_at`, r.`updated_at` FROM `room` AS r JOIN `room_type` AS rt ON r.`room_type_id` = rt.`id` ORDER BY r.`name` ASC");
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
