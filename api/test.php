<?php
//require_once ('DB_Config.php');
//echo ('hello' . $_GET['file']);
// switch ($request[0]) {
//   case 'addEquipmentCategory':
//     echo ('hello world');
//   default:
//     print('NO METHOD');
//     http_response_code(404);
//     break;
// }

//not necessary
//$conn->close();// selects http method
$method = $_SERVER['REQUEST_METHOD'];
// fetches url params
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
// fetches http body (for post requests)
$input = json_decode(file_get_contents("php://input"));
echo ($_SERVER['PATH_INFO']);
?>
