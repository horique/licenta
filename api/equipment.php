<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addEquipment':
    $result = $conn->query("INSERT INTO `equipment`(`equipment_category_id`, `name`, `total`) VALUES ((SELECT `id` FROM `equipment_category`
      WHERE `category` = '" . $input->category . "'), '" . $input->name . "', '" . $input->total . "')");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteEquipment':
    $result = $conn->query("DELETE FROM `equipment` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updateEquipment':
    $result = $conn->query("UPDATE `equipment` SET `equipment_category_id`=(SELECT `id` FROM `equipment_category` WHERE `category`='" . $input->category . "'), `name`='" . $input->name . "',`total`='" . $input->total . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchEquipment':
    $result = $conn->query("SELECT e.`id`, e.`equipment_category_id`, ec.`category`, e.`name`, e.`total`, e.`created_at`, e.`updated_at` FROM `equipment` AS e JOIN `equipment_category` AS ec ON e.`equipment_category_id`= ec.`id` ORDER BY e.`id`, ec.`category`, e.`name`, e.`created_at`, e.`updated_at` ASC");
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

$conn->close();
?>
