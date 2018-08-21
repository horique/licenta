<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addRoomSubjects':
    $result = $conn->query("INSERT INTO `room_subjects`(`room_id`, `semester`, `subject`)
    VALUES ((SELECT `id` FROM `room` WHERE `name` = '" . $input->name . "'),
    '" . $input->semester ."', '" . $input->subject  . "')");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteRoomSubjects':
    $result = $conn->query("DELETE FROM `room_subjects` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updateRoomSubjects':
    $result = $conn->query("UPDATE `room_subjects` SET `room_id`=(SELECT `id` FROM `room` WHERE `name` = '" . $input->name . "'),
    `semester`='" . $input->semester . "', `subject`='" . $input->subject . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchRoomSubjects':
    $result = $conn->query("SELECT rs.`id`, rs.`room_id`, r.`name`, rs.`semester`, rs.`subject`, rs.`created_at`, rs.`updated_at` FROM `room_subjects` AS rs JOIN `room` AS r ON rs.`room_id` = r.`id` ORDER BY rs.`semester`, r.`name` ASC");
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
