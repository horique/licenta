<?php
//require_once 'DB_Config.php';
// require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addEquipmentCategory':
    $result = $conn->query("INSERT INTO `equipment_category`(`category`)
    VALUES ('" . $input->category . "')") ;
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteEquipmentCategory':
    $result = $conn->query("DELETE FROM `equipment_category` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updateEquipmentCategory':
    $result = $conn->query("UPDATE `equipment_category` SET `category`='" . $input->category . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchEquipmentCategory':
    $result = $conn->query("SELECT `id`, `category`, `created_at`, `updated_at` FROM `equipment_category` ORDER BY `id`, `category`, `created_at`, `updated_at` ASC");
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
