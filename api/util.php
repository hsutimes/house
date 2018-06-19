<?php
/**
 * Created by PhpStorm.
 * User        : times
 * Time        : 2018/6/12 0012 17:31
 * Description : description
 */
$max = 6;
$num = '12128-';
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
    return $GLOBALS['num'] . $s . $n;
}

?>