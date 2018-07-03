<?php
/**
 * Created by PhpStorm.
 * User: xin.ran
 * Date: 2017/11/20
 * Time: 下午6:07
 */

    require 'config.php';
    $strPass = sha1($_POST['pass']);

    $strQuery = mysql_query("select user, pass from user where user='" . $_POST['user'] ."' and pass='" . $strPass . "'") or die('sql error!');

    if(mysql_fetch_array($strQuery, MYSQL_ASSOC)){
        echo 'true';
    }else{
        echo 'false';
    }

    mysql_close();