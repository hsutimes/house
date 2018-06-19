<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/13 0013 23:25
 * Description : 登录日志
 */

require '../conn.php';
$conn = connection();
$sql = "SELECT * FROM logs";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('id' => $row[0], 'name' => $row[1], 'age' => $row[2], 'sex' => $row[3]
    , 'email' => $row[4], 'role' => $row[5], 'info' => $row[6], 'create_time' => $row[7]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>
