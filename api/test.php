<?php


switch ($request[0]) {
  case 'addEquipmentCategory':
    echo ('hello world');
  default:
    print('NO METHOD');
    http_response_code(404);
    break;
}

//not necessary
$conn->close();
?>