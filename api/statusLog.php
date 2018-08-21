<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addStatusLog':
    $input->date_added = date("Y-m-d H:i", strtotime($input->date_added));
    $result = $conn->query("INSERT INTO `status_log` (`room_equipments_id`, `personnel_id`, `status`, `message`, `date_added`, `added_by`) VALUES
    ('" . $input->room_equipments_id . "',
    (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->responsible . "', '-', -1))),
    '" . $input->status . "', '" . $input->message . "',  TIMESTAMP(DATE_FORMAT('" . $input->date_added . "', '%Y-%m-%d %H:%i:%s')), '" . $input->user . "')");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteStatusLog':
    $result = $conn->query("DELETE FROM `status_log` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updateStatusLog':
    $input->date_added = date("Y-m-d H:i", strtotime($input->date_added));
    $result = $conn->query("UPDATE `status_log` SET `room_equipments_id`='" . $input->room_equipments_id . "',
    `personnel_id`= (SELECT `id` FROM `personnel` WHERE `cnp` = (SELECT SUBSTRING_INDEX('" . $input->responsible . "', '-', -1))),
    `status`='" . $input->status . "',
    `message`='" . $input->message . "',
    `date_added`= '" . $input->date_added . "'
    WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchStatusLog':
    $result = $conn->query("SELECT `id`, `room_equipments_id`, `personnel_id`,(SELECT CONCAT(`full_name`, '-', `cnp`) FROM `personnel` WHERE `id` = `personnel_id`) AS `responsible`,
    `status`, `message`, `date_added`, `added_by`, `created_at`, `updated_at` FROM `status_log` ORDER BY `room_equipments_id`, `date_added` ASC");
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
