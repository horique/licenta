<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addRoomEquipments':
    $result = $conn->query("INSERT INTO `room_equipments` (`room_id`, `equipment_id`, `owner_id`, `current_status`)
    VALUES ((SELECT `id` FROM `room` WHERE `name` = '" . $input->room_name . "'),
    (SELECT `id` FROM `equipment` WHERE `name` = '" . $input->equipment_name . "'),
    (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->owner_name . "', '-', -1))),
    '" . $input->current_status . "')");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteRoomEquipments':
    $result = $conn->query("DELETE FROM `room_equipments` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updateRoomEquipments':
    $result = $conn->query("UPDATE `room_equipments` SET `room_id`=(SELECT `id` FROM `room` WHERE `name` = '" . $input->room_name . "'),
    `equipment_id`=(SELECT `id` FROM `equipment` WHERE `name` = '" . $input->equipment_name . "'),
    `owner_id`= (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->owner_name . "', '-', -1))),
    `current_status` = '" . $input->current_status . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchRoomEquipments':
    $result = $conn->query("SELECT re.`id`, re.`room_id`, re.`equipment_id`, re.`owner_id`, r.`name` AS `room_name`, e.`name` AS `equipment_name`,
    (SELECT CONCAT(`full_name`, '-', `cnp`) FROM `personnel` WHERE `id` = re.`owner_id`) AS `owner_name`,
    re.`current_status`, re.`created_at`, re.`updated_at`
    FROM `room_equipments` AS re JOIN `room` AS r ON re.`room_id` = r.`id`
    JOIN `equipment` AS e ON re.`equipment_id` = e.`id`
    JOIN `personnel` AS p ON re.`owner_id` = p.`id`
    ORDER BY r.`name`, e.`name`, `owner_name`, re.`current_status` ASC");
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
