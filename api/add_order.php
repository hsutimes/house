<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/12 0012 17:00
 * Description : 添加订单
 */

require 'conn.php';
require 'util.php';

$work = $_GET['work'];
$master = $_GET['master'];
if ($work === null || $work === '' || $master === null || $master === '') {
    $json['msg'] = '参数为空';
    $json['status'] = 'fail';
    echo json_encode($json);
    return;
}
$conn = connection();

$sql = "SELECT TOP 1 o_id FROM [order] ORDER BY o_id DESC";
$query = sqlsrv_query($conn, $sql);
$row = sqlsrv_fetch_array($query);
$number = intval($row[0]) + 1;

$sql = "INSERT INTO [order] (o_number, o_info, o_die, o_work, o_master, create_time, modified_time)
    VALUES ('" . f($number) . "','正在进行','0','" . $work . "','" . $master . "',getdate(), getdate())";
if (sqlsrv_query($conn, $sql)) {
    $json['msg'] = '添加成功';
    $json['status'] = 'success';
} else {
    $json['msg'] = 'database error';
    $json['status'] = 'fail';
//    print_r(sqlsrv_errors());
}
sqlsrv_close($conn);

echo json_encode($json);

?>