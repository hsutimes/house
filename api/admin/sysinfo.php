<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/3 0003 9:04
 * Description : 系统信息
 */

require '../conn.php';
$conn = connection();
$sql = "SELECT * FROM sysinfo";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('u_num' => $row[0], 'l_num' => $row[1], 'o_num' => $row[2], 't_num' => $row[3]
    , 's_num' => $row[4], 'w_num' => $row[5]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>
