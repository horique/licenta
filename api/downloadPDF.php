<?php
  header('Content-Type: application/pdf');
  header("Content-Disposition: attachment;filename=" . $_GET['file']);
  header("Content-Transfer-Encoding: binary ");
  readfile('../storage/' . $_GET['file']);
?>
