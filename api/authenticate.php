<?php
require_once (dirname(__FILE__) . '/DB_Config.php');
use \Firebase\JWT\JWT;

switch ($request[0]) {
  case 'login':
    $input->password = hash('sha512', $input->password);
    $result = $conn->query("SELECT u.`id`, u.`username`, r.`role` FROM `user` AS u JOIN `user_roles` AS ur ON u.`id`=ur.`user_id` JOIN `role` AS r ON ur.`role_id`=r.`id` WHERE u.`username` = '" . $input->username . "' AND u.`password` = '" . $input->password . "'");
    if($result->num_rows >= 1) {
      $rows = array();
      while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        $rows[] = $rs;
      }
      $key = "2D9B99AE97CD37997EE881C54B6C738C9D18C40CC04B9179D6A86211F20E8DFFE389FFF2AE844E963BCFB67EFFAC854F05190F38FA41B9D3DC2C96CB8A86C95D";
      $token = array(
          "user_id" => $rows[0]['id']
      );
      $jwt = JWT::encode($token, $key, 'HS512');
      $result = new stdClass();
      $result->token = $jwt;
      $result->role = array_column($rows, 'role');
      echo json_encode($result, JSON_NUMERIC_CHECK);
    } else {
      echo $conn->error;
    };
    break;
  case 'register':
    $input->password = hash('sha512', $input->password);
    $result1 = $conn->query("INSERT INTO `user`(`username`, `password`, `surname`, `firstname`)
    VALUES ('" . $input->username . "', '" . $input->password . "', '" . $input->surname . "', '" . $input->firstname  . "')");
    if(!$result1) {
      echo $conn->error;
    } else {
      $result2 = $conn->query("INSERT INTO `user_roles`(`user_id`, `role_id`)
      VALUES ((SELECT `id` FROM `user` WHERE `username`='" . $input->username . "'), (SELECT `id` FROM `role` WHERE `role`='personnel'))");
      if(!$result2) {
        echo $conn->error;
      } else {
      echo $result1;
      }
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
