<?php
require_once 'DB_Config.php';
require_once 'validateJWT.php';
use \PDFShift\PDFShift;

switch ($request[0]) {
  case 'fetchColumns':
  $result = $conn->query("SELECT COLUMN_NAME AS `field`
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = 'licenta' AND TABLE_NAME = '" . $input->tableName . "';");
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
  case 'fetchReports':
    $result = $conn->query("SELECT `id`, `path_to_file`, `file_name`, `table_name`, `created_at`FROM `reports` ORDER BY `id`, `file_name`");
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
  case 'generatePDF':
    PDFShift::setApiKey('6d44cda07b944dd78f27861f733ffca8');
    $data = $input->html;
    $path = 'storage/';
    $result = $conn->query("INSERT INTO `reports`(`path_to_file`, `file_name`, `table_name`)
    VALUES ('" . $path . "', '" . $input->file_name . "', '" . $input->table_name . "')") ;
    if(!$result) {
      echo $conn->error;
    } else {
      PDFShift::convertTo($data, ['css' => 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.css'], '../' . $path . $input->file_name);
      echo $result;
    }
    break;
  case 'deletePDF':
    $result = $conn->query("DELETE FROM `reports` WHERE `id`='" . $input->id . "'");
    if(!$result) {
      echo $conn->error;
    } else {
      unlink('../' .$input->path_to_file . $input->file_name);
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
