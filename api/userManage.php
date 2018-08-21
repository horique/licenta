<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'deleteUser':
    $result1 = $conn->query("DELETE FROM `user_roles` WHERE `user_id`='" . $input->id . "'");
    if(!$result1) {
      echo $conn->error;
    } else {
      $result2 = $conn->query("DELETE FROM `user` WHERE `id`='" . $input->id . "'");
      if(!$result2) {
        echo $conn->error;
      } else {
        echo $result2;
      }
    }
    break;
  case 'fetchUser':
    $result = $conn->query("SELECT `id`, `username`, `surname`, `firstname` FROM `user` WHERE `username` = '" . $input->username . "'");
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
  case 'updateUser':
    if (property_exists($input, 'password')) {
      $input->password = hash('sha512', $input->password);
      $result = $conn->query("UPDATE `user` SET `firstname`='" . $input->firstname ."', `surname`='" . $input->surname . "',`username`='" . $input->username . "', `password`='" . $input->password . "' WHERE `username`='" . $input->oldUser . "'");
    } else {
      $result = $conn->query("UPDATE `user` SET `firstname`='" . $input->firstname ."', `surname`='" . $input->surname . "',`username`='" . $input->username . "' WHERE `username`='" . $input->oldUser . "'");
    }
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
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
