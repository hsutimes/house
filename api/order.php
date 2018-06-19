<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/6 0006 23:20
 * Description : 查询所有订单
 */

require 'conn.php';
$conn = connection();
$id = $_GET['id'];
$sql = "SELECT * FROM orders WHERE o_master = '" . $id . "'";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('id' => $row[0], 'number' => $row[1], 'money' => $row[2], 'info' => $row[3]
    , 'die' => $row[4], 'comment' => $row[5],'w_name' => $row[6],'s_name' => $row[7],'w_info' => $row[9]
    , 'create_time' => $row[10], 'modified_time' => $row[11]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>