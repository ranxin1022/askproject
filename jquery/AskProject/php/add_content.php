<?php
/**
 * Created by PhpStorm.
 * User: xin.ran
 * Date: 2017/11/27
 * Time: 下午4:01
 */

//标题，描述（可选）
// 首页上出现 标题和回答中最热门的部分
//评论

/*
 * 标题，描述+ 评论（用评论代替回答）
 */

require 'config.php';
sleep(3);
date_default_timezone_set("Asia/Shanghai");
$strRegisterDate = date('Y-m-d H:i:s', time());

$strQuery = "insert into question(title, content, user, date)"
    . "values ('". $_POST['title'] . "', '". $_POST['content'] ."', '"
    . $_POST['user'] . "','" .  $strRegisterDate ."')";

mysql_query($strQuery) or die('新增失效'.mysql_error());
echo mysql_affected_rows();
mysql_close();