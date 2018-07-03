<?php
/**
 * Created by PhpStorm.
 * User: xin.ran
 * Date: 2017/11/16
 * Time: 上午11:28
 */

require 'config.php';
sleep(3);
date_default_timezone_set("Asia/Shanghai");
$strRegisterDate = date('Y-m-d H:i:s', time());

$strQuery = "insert into user(user, pass, email, sex, birthday, register_date)"
          . "values ('". $_POST['user'] . "', '". sha1($_POST['pass']) ."', '"
                       . $_POST['email'] . "','" . $_POST['sex'] . "', '"
                       . $_POST['bday'] . "','" . $strRegisterDate ."')";

mysql_query($strQuery) or die('新增失效'.mysql_error());
echo mysql_affected_rows();
mysql_close();
?>