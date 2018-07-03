<?php
/**
 * Created by PhpStorm.
 * User: xin.ran
 * Date: 2017/11/29
 * Time: 上午11:31
 */

sleep(1);
require "config.php";
date_default_timezone_set("Asia/Shanghai");
$strRegisterDate = date('Y-m-d H:i:s', time());

$strQuery = "insert into comment (titleid, comment, user, date) " .
            "values('" . $_POST['titleid'] . "', '" . $_POST['comment'] . "', '" .
             $_POST['user'] . "', '" . $strRegisterDate . "')";

mysql_query($strQuery) or die('新增失效' . mysql_error());

echo mysql_affected_rows();
mysql_close();