<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/7 0007 19:09
 * Description : 服务内容信息
 */
require 'conn.php';
$conn = connection();
$type = $_GET['type'];
$sql = "SELECT * FROM server_type WHERE t_type = '" . $type . "' ORDER BY create_time ASC";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('id' => $row[0], 'name' => $row[1], 'info' => $row[3], 'create_time' => $row[4]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>