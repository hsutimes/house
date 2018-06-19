<?php
/**
 * Created by PhpStorm.
 * User        : 蒋正
 * Time        : 2018/4/29 0029 21:39
 * Description : 数据库连接
 */

header("Content_Type: text/html; charset=utf-8");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: x-requested-with,content-type");
function connection()
{
    $serverName = "localhost";//服务器的名字，本地localhost
    $connectionInfo = array("Database" => "家政管理系统", "UID" => "sa", "PWD" => "123456", "CharacterSet" => "UTF-8");
    $conn = sqlsrv_connect($serverName, $connectionInfo);
    if ($conn) {
        return $conn;
    } else {
        echo "Connection could not be established\n";
        die(print_r(sqlsrv_errors(), true));
    }
}

// 关闭数据库连接
// sqlsrv_close($conn);

?>