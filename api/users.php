<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'updateUser':
    $result = $conn->query("UPDATE `user` SET `firstname`='" . $input->firstname ."', `surname`='" . $input->surname . "',`username`='" . $input->username . "' WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchUsers':
    $result = $conn->query("SELECT `id`, `username`, `firstname`, `surname`, `created_at`, `updated_at` FROM `user` ORDER BY `id`, `username`, `created_at`, `updated_at` ASC");
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
