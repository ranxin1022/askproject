$(function () {

    /*
        同时打开两个对话框
        $('#reg').dialog();
        $('#login').dialog();
    */

    //$('#reg').dialog('open').css('font-size', '50px');
    //$('#reg').dialog('widget').css('font-size', '50px');
    /*
    $('#reg').dialog('option', 'title', 'haha');
    $('#reg').on('test', function () {
        alert('haha');
    })
    */
/*
    $('#login').dialog({
        autoOpen: false
    });
*/
    //alert('test');

    /*
    $('#search_button').button({
       // disabled : true
       // label : '搜索',
        icons : {
            primary: 'ui-icon-search',
            //secondary: 'ui-icon-search',
        },
        text: false
    });
    */
    //$('#search_button').button('disable');
    //$('#search_button').button('enable');
    /*
    $('#search_button').click(function () {

    });

    $('#reg').dialog({
        buttons: {
            '提交' : function () {
                
            }
        }
    });
    */

    //$('#reg input[type=radio]').button();
//$('#reg').buttonset();
//$('#reg input[type=checkbox]').button();
    $('#reg_a').click(function () {
        $('#reg').dialog('open');

    });

    $('#login_a').click(function () {
        $('#login').dialog('open');
    });

    $('#login').dialog({
        autoOpen: false
    });

    $.validator.addMethod('code', function (value, element) {
       var tel = /^[0-9]{6}$/;
       return this.optional(element)||(tel.test(value));
    });

    $('#reg').validate({
/*
        submitHandler: function (form) {
            alert('验证成功');
            // 当验证成功后执行， 而且阻止了默认提交
            // 一般用于AJAX提交
        },
*/
        /*
        groups : {
            //myerror: 'user pass',
        },
        */
/*
        errorPlacement: function(error, element){
            //alert(element[0]);

            $.each(error, function(index, value){
                //alert(index + ' ' + $(value).html());
                //console.log('hehe');
                //console.log($(value).html());
                //$('#myerror').html($('#myerror').html() + $(value).html() );
                //console.log(index + ' ' + value);
                error.appendTo('#myerror');
            });
        },
*/
       // wrapper : 'li',
        //success: 'abc',

        success: function (label) {
            //alert(label);
          label.addClass('adc');///.text('ok');
        },
        invalidHandler: function(event, validator){
            var errors = validator.numberOfInvalids();
            if(errors){
                //$('#myerror').html('有' + errors + '个错误');
            }
        },
        /*
        showErrors : function (errorMap, errorList) {
            $.each(errorMap, function (index, value) {
               //alert(index + ' ' + value);
            });
            $.each(errorList, function (index, value) {

                //alert(errorList[0].message);
                $.each(value, function (vIndex, vValue) {
                    //alert(vIndex + ' ' + vValue);
                })
                //alert(index  + ' ' + value);
            })
        },
        */
        ignoreTitle: true,
        rules: {
            user: {
                required: true,
                minlength: 3,
                rangelength: [4,10],
                //code: true,
                //remote: 'php/user.php',
            },
            pass: {
                required: true,
                minlength: 6,
                remote: {
                    type: 'POST',
                    url : 'php/user.php',
                    data : {
                        user : function () {
                          return $('#user').val();
                        },
                    }
                }
            },
            /*
            email:{
                required: true,
                email: true
            },
            bday1:{
                date: true
            },
            confirmPass:{
                required: true,
                equalTo: '#pass'
            }
            */
        },
        messages: {
            user: {
                required: '账号不得为空',
                minlength: '长度不得小于{0}位！',
                rangelength: 'please账号必须在{0}~{1}之间',
                //code: '必须是0到9的六位数字',
                //remote: '账号被占用',

            },
            pass: {
                required: '密码不得为空',
                minlength: '长度不得小于{0}位！',
                remote: '账号或密码不正确',
            },
            /*
            email:{
                email:'必须输入正确的电子邮件'
            },
            confirmPass:{
                required: '确认密码不得为空！',
                equalTo: '输入的密码不相同！！'
            }
            */
        }
    });
    $('#reg').dialog({
        autoOpen: false,
        //对话框外可操作
        modal: true,
        resizable: false,
        width: 400,
        height: 340,
        title: '知问注册',

        //show: 'slide',
        //hide: 'slide'

        //draggable: false,
        //resizable: false,
        focus: function (e, ui) {
            //alert('focus');
        },
        create: function () {
            //alert('create');
        },
        open: function () {
            //alert('open');
        },
        close: function () {
            //alert('close');
        },

        // 这个事件可以做一些关闭确认的工作
        beforeClose: function () {
            //alert('before close');
            //return false;
        },

        drag: function (e, ui) {
            //alert('drag');
            //console.log('top: ' + ui.position.top + '\n');
            //console.log('left:' + ui.position.left + '\n');
        },

        resize : function (e, ui) {
            console.log(ui.size.width);
        },

        buttons: {
            '提交' : function () {
                $('#reg').submit();
                //alert('正在Ajax提交中');
            },

            '取消' : function () {
            //    $(this).dialog('close');
            }

        }


    });

    $('#reg').buttonset();


    /*
    $('#reg input[title]').tooltip({

        //disabled: true,
        //content: 'haha',
        // 过滤其中含有title的标签
        //items: 'input',
        //tooltipClass : 'a',
        //show: 'slide',
        //hide: 'slide',
        //track: true,
        position: {
            my : 'left center',
            at : 'right+5 center'
        }

        //open : function (e, ui) {
        //    alert('打开时触发 ' + ui.tooltip);
        //}

    });
*/
    /*
    $('[title]').tooltip({
        position : {
            my : 'left center'
        }
    });
    */
    //$('#reg input[title]').tooltip('open');
    //$('#pass').tooltip('open');

    var host = ['aa', 'aaaa', 'aaaaaa', 'bb'];
   /* $('#email').click(function () {
        $(this).autocomplete({
            minLength: 0,
            delay: 0,
            autoFocus: true,
            focus: function (e, ui) {

            },
            source : host
        });
    });
    */
    /*
    $('#email').autocomplete({
        //disabled: true
        minLength: 0,
        focus : function (e, ui) {
            alert(ui.item.value );
        },
        source : host

    });
    */

    $('#email').autocomplete({
        source : function (request, response) {
            // 获取用户输入的内容
            //console.log(request.term);
            // 绑定数据源的， 不会根据搜索关键字过滤无关结果
            //response(['aa', 'aaaa', 'abcd', 'bc']);

            var hosts = ['qq.com', '163.com', '126.com', 'sina.com', 'hotmail.com', 'gmail.com'];
            var term = request.term; //term = xxx@126.com
            var name = term;         //name = xxx
            var host = '';           //host = 126.com
            var ix = term.indexOf('@'); // @的位置
            var result = [];            // 最终呈现的邮箱列表


            // 当有@的时候， 重新分配用户名和域名
            if (ix > -1){
                name = term.slice(0, ix);
                host = term.slice(ix + 1);
            }
            if(name){
                // 如果用户已经输入@和后面的域名，
                // 那么就找到相关的域名提示， 比如xxx@1, 就查找到xxx@163.com
                // 如果用户还没有输入@或后面的域名， 比如xxx, 那么列出所有的host
                var foundHosts = [];

                if(host){
                    result.push(term);
                    foundHosts = $.grep(hosts, function (value, index) {
                        return value.indexOf(host) > -1;
                    });
                } else{

                    foundHosts = hosts;
                }
                var foundResult = $.map(foundHosts, function (value, index) {
                    return name + '@' + value;
                });
                result = result.concat(foundResult);
            }

            response(result);
        }
    });

    jQuery(function($){
        $.datepicker.regional[ "zh-CN" ] = {
            closeText: "关闭",
            prevText: "&#x3C;上月",
            nextText: "下月&#x3E;",
            currentText: "今天",
            monthNames: [ "一月","二月hy","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月s","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
            dayNames: [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六" ],
            dayNamesShort: [ "周日","周一","周二","周三","周四","周五","周六" ],
            dayNamesMin: [ "日","一","二","三","四","五","六" ],
            weekHeader: "周",
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            //numberOfMonths: 3,
            //numberOfMonths: [3, 2],
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            yearRange: '1950:2020',
            //defaultDate: -1,
            gotoCurrent: true,
            yearSuffix: "年" };
        $.datepicker.setDefaults( $.datepicker.regional[ "zh-CN" ] );

    });

    $('#bday').datepicker({
        dateFormat: 'yy-mm-dd',
        altField: '#abc',
        altFormat: 'dd/mm/yy',
        showWeek: true,

        //onChangeMonthYear: function (year, month, inst) {
        //    alert(year);
        //    alert(month);
        //}
    });

    //$('#bday').datepicker('setDate', '2013-02-14');

    /*
    $('#reg').ajaxForm(function () {
        alert('提交成功！');
    });
    */
    /*
    $('#reg').submit(function () {
        $(this).ajaxSubmit(function () {
           alert('提交成功');
        });
    });
*/
    $('#reg').submit(function () {

        $(this).ajaxSubmit({
            url: 'php/user.php',
            target: '#ajaxText',
            beforeSubmit: function (form, jqForm, options) {
                //alert(form);
                //alert(jqForm.html());
                //alert('submit before');
                return false;
            },
            success: function (responseText, status) {
                //alert('success');
            },

        });
        return false;
    });

    //alert($('#reg').formSerialize());
    //alert($('#reg #user').fieldSerialize());
    //alert($('#reg #user').fieldValue());
    $.cookie('aaa1','bbb1', {
        domain: 'localhost',
        secure: true,
    });
    //alert('test');

    $('#tabs').tabs({
        /*
        collapsible: true,
        //disabled: [0],
        event: 'mouseover',
        active: [1],

        create: function (event, ui) {
            //alert("创建tab时触发." + event.target);
            //alert($(ui.panel.get()).html());

        },
        
        activate: function (event, ui) {
            //console.log(ui.oldTab);
            //console.log(ui.oldPanel);
            //console.log(ui.newTab);
            //console.log(ui.oldPanel);
        }
        */

        load: function (event, ui) {
            //alert('ajax 加载文档后触发');
        },

        beforeLoad: function (event, ui) {
            //alert('ajax 加载文档前触发');
            ui.jqXHR.success(function (responseText) {
                //alert(responseText);
            });

            ui.ajaxSettings.url = "tab3.html";
        }
    });
    //$('#tabs').tabs('disable',0);
    //$('#tabs').tabs('enable');
    //$('#tabs').tabs('destroy');
    $('#button').click(function () {
        alert('test');
        $('#tabs').tabs('load',0);
    });

});

$(function(){});