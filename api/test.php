<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/7 0007 20:08
 * Description : 测试使用
 */

$max = 6;
$number = '12128-';
echo f(20);

/**
 * 生成订单编号
 * @param $n
 * @return string
 */
function f($n)
{

    $l = $GLOBALS['max'] - strlen($n);
    $s = '';
    for ($i = 0; $i < $l; $i++) {
        $s = $s . '0';
    }
    return $GLOBALS['number'] . $s . $n;
}

?>


