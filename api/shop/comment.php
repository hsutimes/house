<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/12 0012 16:37
 * Description : 评论信息
 */

require '../conn.php';
$id = $_GET['id'];
$conn = connection();
$sql = "SELECT o_id,o_comment,create_time,modified_time FROM comments WHERE w_shop = '" . $id . "' AND o_die = 1";
$query = sqlsrv_query($conn, $sql);
$i = 0;
$data = array();
while ($row = sqlsrv_fetch_array($query)) {
    $data[$i++] = array('id' => $row[0], 'comment' => $row[1], 'create_time' => $row[2], 'modified_time' => $row[3]);
}
sqlsrv_close($conn);
$json['data'] = $data;
$json['status'] = 'success';
echo json_encode($json);

?>