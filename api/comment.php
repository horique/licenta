<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'lookUPequipment_name':
    $result = $conn->query("SELECT `name` AS `equipment_name` FROM `equipment` WHERE `id` IN
    (SELECT `equipment_id` FROM `room_equipments` AS re JOIN `room` AS r ON r.`id` = re.`room_id` WHERE r.`name`='" . $input->room_name . "')");
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
  case 'lookUPequipment_unit_id':
    $result = $conn->query("SELECT `id` AS `equipment_unit_id` FROM `room_equipments` WHERE `equipment_id` IN (SELECT `id` FROM  `equipment` WHERE `name`='" . $input->equipment_name . "')");
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
  case 'addComment':
    $input->date_added = date("Y-m-d H:i", strtotime("now"));
    $result = $conn->query("INSERT INTO `status_log`(`room_equipments_id`, `personnel_id`, `status`, `message`, `date_added`, `added_by`) VALUES
    ('" . $input->equipment_unit_id . "',
    (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->responsible . "', '-', -1))),
    '" . $input->status . "',
    '" . $input->message . "',
    '" . $input->date_added . "',
    '" . $input->added_by . "')");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchCommentList':
    $result = $conn->query("SELECT
    sl.`id`,
    sl.`room_equipments_id`,
    sl.`personnel_id`,
    sl.`status`,
    sl.`message`,
    sl.`date_added`,
    sl.`added_by`,
    (SELECT `name` FROM `room` WHERE re.`room_id` = `id`) AS `room_name`,
    (SELECT `name` FROM `equipment` WHERE re.`equipment_id` = `id`) AS `equipment_name`,
    (SELECT CONCAT(`full_name`, '-', `cnp`) FROM `personnel` WHERE `id` = `personnel_id`) AS `responsible`
    FROM
        `status_log` AS sl JOIN `room_equipments` AS re ON sl.`room_equipments_id` = re.`id`
    ORDER BY
        `date_added`
    DESC");
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
