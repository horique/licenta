<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addPersonnel':
    $result = $conn->query("INSERT INTO `personnel`(`personnel_category_id`, `cnp`, `full_name`, `surname`, `firstname`, `email`, `telephone`, `job`) VALUES ((SELECT `id` FROM `personnel_category` WHERE `category` = '" . $input->category . "'), '" .$input->cnp . "', CONCAT('" . $input->surname . "', ' ', '" . $input->firstname . "'),'" . $input->surname . "', '" . $input->firstname . "', '" . $input->email . "', '" . $input->telephone . "', '" . $input->job . "')");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deletePersonnel':
    $result = $conn->query("DELETE FROM `personnel` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'updatePersonnel':
    $result = $conn->query("UPDATE `personnel` SET `personnel_category_id`=(SELECT `id` FROM `personnel_category` WHERE `category`='" . $input->category . "'), `cnp`='" . $input->cnp . "', `full_name`= CONCAT('" . $input->surname . "', ' ', '" . $input->firstname . "'), `surname`='" . $input->surname . "', `firstname`='" . $input->firstname . "', `email`='" . $input->email . "', `telephone`='" . $input->telephone . "', `job`='" . $input->job . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchPersonnel':
    $result = $conn->query("SELECT p.`id`, p.`personnel_category_id`, pc.`category`, p.`cnp`, p.`full_name`, p.`surname`, p.`firstname`, p.`email`, p.`telephone`, p.`job`, p.`created_at`, p.`updated_at` FROM `personnel` AS p JOIN `personnel_category` AS pc ON p.`personnel_category_id` = pc.`id` ORDER BY pc.`category`, p.`surname`, p.`firstname` ASC");
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
