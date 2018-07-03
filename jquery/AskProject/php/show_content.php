<?php
/**
 * Created by PhpStorm.
 * User: xin.ran
 * Date: 2017/11/27
 * Time: 下午9:47
 */

require 'config.php';
$strQuery = mysql_query('select (select count(titleid) from comment where titleid = question.id) as count, id, title, content, user, date from question order by date desc limit 0,5') or die('sql 错误！');
$strJson = '';

$value = "(原文链接：<a href=\"http://www.cnblogs.com/bigboyLin/p/5272902.html\">";

while(!!$strRow = mysql_fetch_array($strQuery, MYSQL_ASSOC)){
    foreach( $strRow as $strKey => $strValue){
        //echo str_replace("\n", "", $strValue);
//echo $strValue;
        //if($strKey == "content")
        //{
            //echo str_replace('"', "'", $strValue);
            //echo str_replace('&quot;', "'", htmlentities($strValue)) . "\n";
            //echo str_replace("\"", "\\\"", htmlentities($strValue));
            //$strRow[$strKey] = urlencode(str_replace("\"", "\\\"", htmlentities($strValue)));
        //}
        //$strRow[$strKey] = urlencode(str_replace('&quot;', "'", htmlentities($strValue)));
        $strValue = str_replace("\n", "", $strValue);
        $strRow[$strKey] = urlencode(str_replace('"', "'", $strValue));
        //$strRow[$strKey] = urlencode($strValue);

        //echo urlencode( $strValue) . "\n";

    }
    $strJson .=urldecode(json_encode($strRow)) . ",";
}

echo '[' . substr($strJson, 0, strlen($strJson) - 1) . ']';
mysql_close();