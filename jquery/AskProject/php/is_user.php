<?php
/**
 * Created by PhpStorm.
 * User: xin.ran
 * Date: 2017/11/20
 * Time: 下午5:47
 */

require 'config.php';

$strQuery = mysql_query("select user from user where user='". $_POST['user'] . "'") or die('sql error!');

if(mysql_fetch_array($strQuery, MYSQL_ASSOC)){
    echo 'false';
}else{
    echo 'true';
}

mysql_close();
?>