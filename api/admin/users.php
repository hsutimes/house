<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/3 0003 9:04
 * Description : description
 */
require '../conn.php';
$conn = connection();
$sql = "SELECT * FROM [user]";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('id' => $row[0], 'name' => $row[1], 'age' => $row[3], 'sex' => $row[4]
    , 'email' => $row[5], 'role' => $row[6], 'info' => $row[7], 'create_time' => $row[8]
    , 'modified_time' => $row[9]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>
