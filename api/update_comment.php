<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/12 0012 17:00
 * Description : 添加评论
 */

require 'conn.php';

$id = $_GET['id'];
$comment = $_GET['comment'];
if ($id === null || $id === '' || $comment === null || $comment === '') {
    $json['msg'] = '参数为空';
    $json['status'] = 'fail';
    echo json_encode($json);
    return;
}
$conn = connection();

$sql = "UPDATE [order] SET o_comment = '" . $comment . "', o_info = '订单已完成', o_die = 1, modified_time = getdate()
     WHERE o_id = '" . $id . "'";
if (sqlsrv_query($conn, $sql)) {
    $sql = "EXEC update_work '" . $id . "')";
    sqlsrv_query($conn, $sql);
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