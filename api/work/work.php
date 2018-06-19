<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/13 0013 17:33
 * Description : description
 */

require '../conn.php';
$conn = connection();

$id = $_GET['id'];
$sql = "SELECT * FROM works WHERE u_id = '" . $id . "'";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('id' => $row[0], 'money' => $row[4], 'name' => $row[5], 'type' => $row[6], 'info' => $row[7]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>