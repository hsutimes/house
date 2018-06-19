<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/7 0007 0:26
 * Description : 服务类型
 */

require 'conn.php';
$conn = connection();
$sql = "SELECT DISTINCT t_type FROM server_type";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('name' => $row[0]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>
