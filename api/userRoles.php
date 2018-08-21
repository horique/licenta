<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';

switch ($request[0]) {
  case 'addUserRole':
    $result = $conn->query("INSERT INTO `user_roles`(`user_id`, `role_id`)
    VALUES ((SELECT `id` FROM `user` WHERE `username` ='" . $input->username . "'), (SELECT `id` FROM `role` WHERE `role` ='" . $input->role . "'))") ;
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'deleteUserRole':
    $result = $conn->query("DELETE FROM `user_roles` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      echo $result;
    }
    break;
  case 'fetchUserRoles':
    $result = $conn->query("SELECT ur.`id`, ur.`user_id`, ur.`role_id`, u.`username`, r.`role`, ur.`created_at`, ur.`updated_at`
    FROM `user_roles` AS ur JOIN `user` AS u ON ur.`user_id` = u.`id` JOIN `role` AS r ON r.`id` = ur.`role_id` ORDER BY u.`username` ASC");
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
