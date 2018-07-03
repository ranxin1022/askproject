<?php
/**
 * Created by PhpStorm.
 * User: xin.ran
 * Date: 2017/11/29
 * Time: 下午12:52
 */

sleep(1);
require 'config.php';
// 测试参数
//$_POST['titleid'] = '34';
//$_POST['page'] = 1;


//分页
$nPage=1;
$nPagesize = 2;
$strCountQuery = mysql_query("select count(*) as count from comment where titleid=" . $_POST['titleid']) or die('求总数出错！');
$strSqlResult  = mysql_fetch_array($strCountQuery, MYSQL_ASSOC);
$strPageCount = ceil($strSqlResult['count']/$nPagesize);

if(!isset($_POST['page'])){
    $nPage = 1;
}else{
    $nPage = $_POST['page'];

    if($nPage > $strPageCount){
        $nPage = $strPageCount;
    }
}



$nLimit = ($nPage -1) * $nPagesize;

$strSql = "select " . $strPageCount . " as count, comment, user, date from comment where titleid='" . $_POST['titleid']. "' order by date desc limit $nLimit, $nPagesize";

$strQuery = mysql_query($strSql) or die('sql 错误！');
$strJson = '';

$value = "(原文链接：<a href=\"http://www.cnblogs.com/bigboyLin/p/5272902.html\">";

while(!!$strRow = mysql_fetch_array($strQuery, MYSQL_ASSOC)){
    foreach( $strRow as $strKey => $strValue){
        $strValue = str_replace("\n", "", $strValue);
        $strRow[$strKey] = urlencode(str_replace('"', "'", $strValue));
    }
    $strJson .=urldecode(json_encode($strRow)) . ",";
}

echo '[' . substr($strJson, 0, strlen($strJson) - 1) . ']';
mysql_close();