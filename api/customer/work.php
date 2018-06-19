<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/9 0009 21:19
 * Description : 工作信息
 */
require '../conn.php';
$conn = connection();
$server = $_GET['server'];
$sql = "SELECT * FROM work WHERE w_server = '" . $server . "'";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('id' => $row[0], 'info' => $row[1], 'user' => $row[2], 'money' => $row[4]
    , 'shop' => $row[5], 'count' => $row[6]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>