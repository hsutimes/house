<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/12 0012 18:27
 * Description : 删除订单
 */
require 'conn.php';
$id = $_GET['id'];
if ($id === null || $id === '') {
    $json['msg'] = '参数为空';
    $json['status'] = 'fail';
    echo json_encode($json);
    return;
}
$conn = connection();

$sql = "DELETE FROM [order] WHERE o_id = '" . $id . "'";
if (sqlsrv_query($conn, $sql)) {
    $json['msg'] = '删除成功';
    $json['status'] = 'success';
} else {
    $json['msg'] = 'database error';
    $json['status'] = 'fail';
//    print_r(sqlsrv_errors());
}
sqlsrv_close($conn);

echo json_encode($json);

?>