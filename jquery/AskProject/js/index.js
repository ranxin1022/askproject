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

//    $('#reg').validate({
    /*
            submitHandler: function (form) {
                //alert('验证成功');
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

    //success: function (label) {
    //alert(label);
    //label.addClass('adc');///.text('ok');
    //},
    //invalidHandler: function(event, validator){
    //    var errors = validator.numberOfInvalids();
    //    if(errors){
    //$('#myerror').html('有' + errors + '个错误');
    //    }
    //},
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
    //ignoreTitle: true,


    //});

    $('#search_button').button({
        // disabled : true
        // label : '搜索',
        icons : {
            primary: 'ui-icon-search',
            //secondary: 'ui-icon-search',
        },
        //text: false
    });

    $('#question_button').button({
        // disabled : true
        // label : '搜索',
        icons : {
            primary: 'ui-icon-lightbulb',
            //secondary: 'ui-icon-search',
        },
        //text: false
    }).click(function () {

        if($.cookie('user')){
            $('#question').dialog('open');
        }else{
            $('#error').dialog('open');
            setTimeout(function () {
                //1秒钟后关闭错误提示框，打开登录对话框
                $('#error').dialog('close');
                $('#login').dialog('open');
            }, 1000);
        }
    });

    $('#reg_a').click(function () {
        $('#reg').dialog('open');

    });

    $('#login_a').click(function () {
        $('#login').dialog('open');
    });

    $.validator.addMethod('code', function (value, element) {
       var tel = /^[0-9]{6}$/;
       return this.optional(element)||(tel.test(value));
    });

    var strUserCookie = $.cookie('user');

    if( strUserCookie ){
        $('#reg_a, #login_a').hide();
        $('#member, #logout').show();
        $('#member').html(strUserCookie);
    }
    else{
        $('#reg_a, #login_a').show();
        $('#member, #logout').hide();
    }

    $('#logout').click(function () {
        $.removeCookie('user');
        window.location.href = '/jquery/AskProject/index.html';
    });

    $('#loading').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: false,
        resizable: false,
        draggable: false,
        width: 180,
        height:50,
    }).parent().parent().find('.ui-widget-header').hide();

    $('#error').dialog({
        autoOpen: false,
        modal: true,
        closeOnEscape: false,
        resizable: false,
        draggable: false,
        width: 180,
        height:50,
    }).parent().parent().find('.ui-widget-header').hide();

    $('#login').dialog({
        autoOpen: false,
        //对话框外可操作
        modal: true,
        resizable: false,
        width: 360,
        height: 260,
        title: '会员登录',
        buttons: {
            '登录': function () {
                //alert('正在Ajax提交中');
                //alert($('#expires').is(':checked'));
                $(this).submit();

            },

            '取消': function () {
                //    $(this).dialog('close');
            }

        }
    }).validate({

        submitHandler: function () {
            $('form').ajaxSubmit({
                url: 'php/login.php',
                type: 'POST',
                beforeSubmit: function (formData, jqForm, options) {
                    $('#loading').dialog('open');
                    $('#login').dialog('widget').find('button').eq(1).button('disable');
                },
                success: function (responseText, statusText) {
                    if(responseText){
                        //$('#loading').dialog('close');
                        //alert('heh');
                        $('#login').dialog('widget').find('button').eq(1).button('enable');
                        $('#loading').css('background', 'url("css/images/check_32x32.png") no-repeat 20px center').html('登录成功');

                        if($('#expires').is(':checked')){
                            $.cookie('user', $('#login_user').val(),{
                                expires: 7,
                            });
                        }else{
                            $.cookie('user', $('#login_user').val());
                        }

                        //$('#loading').css('background', 'red').html('数据新增成功');
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#login').dialog('close');
                            $('#login').resetForm();
                            $('#login span.star').html('*').removeClass('succ');
                            $('#loading').css('background', 'url("css/images/loading2_32x32.gif") no-repeat 20px center').html('数据加载中');

                            //登录成功， 显示用户名和退出， 隐藏注册和登录
                            $('#reg_a, #login_a').hide();
                            $('#member, #logout').show();
                            $('#member').html($.cookie('user'));


                        },1000);

                    }
                },
            });
        },

        showErrors: function (errorMap, errorList) {

            var errors = this.numberOfInvalids();
            if( errors > 0 ){

                $('#login').dialog('option','height', errors*20 + 260);
            }else{
                $('#login').dialog('option','height', 260);
            }

            var height = 20 * errors;
            this.defaultShowErrors();
        },

        highlight: function (element, errorClass) {
            $(element).css('border', '1px solid #639');
            $(element).parent().find('span').html('*').removeClass('succ');
        },

        unhighlight: function (element, errorClass) {
            $(element).css('border', '1px solid #cccccc');
            $(element).parent().find('span').html('&nbsp;').addClass('succ');
        },

        errorLabelContainer: 'ol.login_error',
        wrapper: 'li',
        rules: {
            user: {
                required: true,
                minlength: 2,
            },
            pass: {
                required: true,
                minlength: 6,
                remote: {
                    url : 'php/login.php',
                    type: 'POST',
                    data : {
                        user: function () {
                            return $('#login_user').val();
                        }
                    },
                }

            }
        },
        messages: {
            user: {
                required: '账号不得为空！',
                minlength: '账号长度不得小于{0}位!',
            },
            pass: {
                required: '密码不得为空！',
                minlength: '密码长度不得小于{0}位!',
                remote: '账号或密码错误！',
            }
        }

    });;

    $('#reg').dialog({
        autoOpen: false,
        //对话框外可操作
        modal: true,
        resizable: false,
        width: 360,
        height: 360,
        title: '知问注册',
        buttons: {
            '提交' : function () {
                //alert('正在Ajax提交中');
                $(this).submit();

            },

            '取消' : function () {
            //    $(this).dialog('close');
            }

        }

    }).buttonset().validate({

        submitHandler: function () {
            $('form').ajaxSubmit({
                url: 'php/add.php',
                type: 'POST',
                beforeSubmit: function (formData, jqForm, options) {
                    $('#loading').dialog('open');
                    $('#reg').dialog('widget').find('button').eq(1).button('disable');
                },
                success: function (responseText, statusText) {
                    if(responseText){
                        //$('#loading').dialog('close');
                        //alert('heh');
                        $('#reg').dialog('widget').find('button').eq(1).button('enable');
                        $('#loading').css('background', 'url("css/images/check_32x32.png") no-repeat 20px center').html('数据新增成功');

                        $.cookie('user', $('#user').val());
                        //$('#loading').css('background', 'red').html('数据新增成功');
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#reg').dialog('close');
                            $('#reg').resetForm();
                            $('#reg span.star').html('*').removeClass('succ');
                            $('#loading').css('background', 'url("css/images/loading2_32x32.gif") no-repeat 20px center').html('数据加载中');

                            //登录成功， 显示用户名和退出， 隐藏注册和登录
                            $('#reg_a, #login_a').hide();
                            $('#member, #logout').show();
                            $('#member').html($.cookie('user'));


                        },1000);

                    }
                },
            });
        },

        showErrors: function (errorMap, errorList) {

            var errors = this.numberOfInvalids();
            if( errors > 0 ){

                $('#reg').dialog('option','height', errors*20 + 360);
            }else{
                $('#reg').dialog('option','height', 360);
            }

            var height = 20 * errors;
            this.defaultShowErrors();
        },

        highlight: function (element, errorClass) {
            $(element).css('border', '1px solid #639');
            $(element).parent().find('span').html('*').removeClass('succ');
        },

        unhighlight: function (element, errorClass) {
            $(element).css('border', '1px solid #cccccc');
            $(element).parent().find('span').html('&nbsp;').addClass('succ');
        },

        errorLabelContainer: 'ol.reg_error',
        wrapper: 'li',
        rules: {
           user: {
               required: true,
               minlength: 2,
               remote: {
                   url: 'php/is_user.php',
                   type: 'POST',
               },
           },
           pass: {
                required: true,
                minlength: 6,
           },
           email: {
                required: true,
                email: true,
           },
           date: {
               date: true,
           }
        },
        messages: {
            user: {
                required: '账号不得为空！',
                minlength: '账号长度不得小于{0}位!',
                remote: '账号被占用',
            },
            pass: {
                required: '密码不得为空！',
                minlength: '密码长度不得小于{0}位!',
            },
            email: {
                required: '邮箱不得为空! ',
                email: '邮箱格式有误!',
            },
            date: {
                date: '生日不得为空!',
            }
        }

    });

    //$('#reg').buttonset();


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
            monthNames: [ "一月","二月","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
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
        maxDate: 0,
        yearRange: '1950:2020',
        changeMonth: true,
        changeYear: true,
    });

    $('#tabs').tabs();

    $('#accordion').accordion({
        collapsible: true,
        //disabled: true,
        //event: 'mouseover',

        icons: {
            "header": "ui-icon-plus",
            "activeHeader": "ui-icon-minus",
        },

        create: function (event, ui) {
            //console.log($(ui.header));
            //console.log($(ui.header.get()));
        },

        activate: function (event, ui) {
            //alert(ui.oldHeader);
            ui.newPanel;
        }
    });

   // $('#accordion').accordion('disable',1);

    $('#accordion').accordion('option','active',1);
    $('#accordion').on('accordionactivate', function (event, ui) {
        //alert($(ui.header.get()).html());

        //alert($(ui.oldHeader.get()).html());
    });


    //$('.uEditorCustom').css('background', 'red').uEditor();
    //var ue = UE.getEditor('container');
    /*
    var ue = UE.getEditor( 'editor', {

        autoHeightEnabled: true,

        autoFloatEnabled: true,

        initialFrameWidth: 480,

        initialFrameHeight:320,

    });
    */

    //alert($('textarea').html('请输入问题描述'));
    $('#question').dialog({
        autoOpen: false,
        //对话框外可操作
        modal: true,
        resizable: false,
        width: 500,
        height: 360,
        title: '知问',
        buttons: {
            '发布' : function () {
                //alert('正在Ajax提交中');
                $(this).ajaxSubmit({
                    url: 'php/add_content.php',
                    type: 'POST',
                    data: {
                        user: function () {
                          return $.cookie('user');
                        },

                    },
                    beforeSubmit: function (formData, jqForm, options) {
                        $('#loading').dialog('open');
                        $('#question').dialog('widget').find('button').eq(1).button('disable');
                    },
                    success: function (responseText, statusText) {
                        if(responseText){
                            $('#question').dialog('widget').find('button').eq(1).button('enable');
                            $('#loading').css('background', 'url("css/images/check_32x32.png") no-repeat 20px center').html('数据新增成功');

                            setTimeout(function () {
                                $('#loading').dialog('close');
                                $('#question').dialog('close');

                                $('#ueditor_0').contents().find('body').html('请输入问题描述');
                                $('#question').resetForm();
                                $('#loading').css('background', 'url("css/images/loading2_32x32.gif") no-repeat 20px center').html('数据加载中');
                            },1000);

                        }
                    },
                });

            },
        }
    });

    //
    var ue = UE.getEditor('content',{
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [[
            'bold', 'italic','link','simpleupload','insertorderedlist', 'script', 'insertunorderedlist', 'paragraph',
        ]],
        //focus时自动清空初始化时的内容
        autoClearinitialContent:true,
        //关闭字数统计
        wordCount:false,
        //关闭elementPath
        elementPathEnabled:false,
        //默认的编辑区域高度
        initialFrameHeight:320,

        //更多其他参数，请参考ueditor.config.js中的配置项
    });

    $.ajax({
        url : 'php/show_content.php',
        type: 'POST',
        success: function (response, status, xhr) {
            var json = $.parseJSON(response);

            var html = '';
            var arr = [];
            var summary = [];
            $.each(json, function (index, value) {
                html +=
                    "<h4>" +
                        value['user'] +" 发表于 " + value['date'] +
                    "</h4>" +
                    "<h3>" +
                        value.title +
                    "</h3>" +
                    "<div class='editor'>" +
                        value.content +
                    "</div>" +
                    "<div class='bottom'>" +
                        "<span class='comment' data-id='" + value.id + "'>" + value.count + "条评论</span>" +
                        "<span class='up'>收起</span>" +
                    "</div>" +
                    "<hr noshade='noshade' size='1'/>" +
                    "<div class='comment_list'></div>";
            });
            //alert(html);
            $('.content').append(html)
            //$('.content').append(comment);
            var strShowAllButton = " ...<span class='down'>显示全部</span>";
            $.each($('.editor'), function (index, value) {
                arr[index] = $(this).html();
                summary[index] = arr[index].substr(0, 200);

                if(summary[index].substring(199,200) == '<'){
                    summary[index] = replacePos(summary[index], 200, '');
                }
                if(summary[index].substring(198,200) == '</'){
                    summary[index] = replacePos(summary[index], 200, '');
                    summary[index] = replacePos(summary[index], 199, '');
                }


                if(arr[index].length > 200){
                    summary[index] += strShowAllButton;
                    $(this).html(summary[index]);
                }

                $('.bottom .up').hide();

            });

            // 点击展开按钮
            $.each($('.editor'), function (index, value) {
                $(this).on('click', '.down', function () {
                    alert(index);
                    //alert(arr[index]);
                    $('.editor').eq(index).html(arr[index]);
                    $(this).hide();
                    $('.bottom .up').eq(index).show();
                });
            });

            // 点击收起按钮
            $.each($('.bottom'), function (index, value) {
                $(this).on('click', '.up', function () {
                    $('.editor').eq(index).html(summary[index]);
                    $(this).hide();
                    $('.editor .down').show();

                });
            });

            // 点击评论按钮
            $.each($('.bottom'), function (index, value) {
                $(this).on('click', '.comment', function () {
                    //console.log($(this).parent().find('.editor'));
                    //登录状态下才可以评论
                    if($.cookie('user')){
                        if(!$('.comment_list').eq(index).has('form').length){
                            $.ajax({
                                url: 'php/show_comment.php',
                                type: 'POST',
                                data:{
                                    titleid: $('.comment').eq(index).attr('data-id'),
                                },
                                beforeSend: function (jqXHR, settings) {
                                    var loading = "<dl class='comment_load'><dd>正在加载评论</dd></dl>";
                                    $('.comment_list').eq(index).append(loading);
                                },
                                success: function (responseText, statusText) {
                                    $('.comment_list').eq(index).find('.comment_load').hide();
                                    var json = $.parseJSON(responseText);
                                    var comment = "";
                                    var page = 2;
                                    var pageTotalCount = "";
                                    $.each(json, function (index2, value) {
                                        pageTotalCount = value.count;
                                        comment += "<dl class='comment_content'>" +
                                            "<dt>"+ value.user +"</dt>" +
                                            "<dd>"+ value.comment +"</dd>" +
                                            "<dd class='comment_date'>"+ value.date +"</dd>" +
                                            "</dl>";
                                    });
                                    $('.comment_list').eq(index).append(comment);
                                    $('.comment_list').eq(index).append('<dl><dd><span class="load_more">加载更多评论</span></dd></dl>');

                                    // 如果加载的页数大于页的总数，销毁点击事件
                                    if(page>pageTotalCount){
                                        //$('.comment_list').eq(index).find('.load_more').off('click');
                                        //$('.comment_list').eq(index).find('.load_more').button('disable');
                                        $('.comment_list').eq(index).find('.load_more').hide();
                                    }

                                    $('.comment_list').eq(index).find('.load_more').button().on('click',function () {
                                        $('.comment_list').eq(index).find('.load_more').button('disable');
                                        $.ajax({
                                            url: 'php/show_comment.php',
                                            type: 'POST',
                                            data:{
                                                titleid: $('.comment').eq(index).attr('data-id'),
                                                page: page,
                                            },
                                            beforeSend: function () {
                                                
                                            },
                                            success: function (response, status) {
                                                $('.comment_list').eq(index).find('.load_more').button('enable');
                                                $('.comment_list').eq(index).find('.comment_load').hide();
                                                var json = $.parseJSON(response);
                                                var commentAppend = "";
                                                $.each(json, function (index3, value) {
                                                    commentAppend += "<dl class='comment_content'>" +
                                                        "<dt>"+ value.user +"</dt>" +
                                                        "<dd>"+ value.comment +"</dd>" +
                                                        "<dd class='comment_date'>"+ value.date +"</dd>" +
                                                        "</dl>";
                                                });

                                                $('.comment_list').eq(index).find('.comment_content').last().after(commentAppend);
                                                page++;
                                                // 如果加载的页数大于页的总数，销毁点击事件
                                                if(page>pageTotalCount){
                                                    //$('.comment_list').eq(index).find('.load_more').off('click');
                                                    //$('.comment_list').eq(index).find('.load_more').button('disable');
                                                    $('.comment_list').eq(index).find('.load_more').hide();
                                                }

                                            }
                                        });

                                    });

                                    var publishText = "<form><dl class='comment_add'>" +
                                                    "<dt><textarea type='text' name='comment'></textarea></dt>" +
                                                    "<dd>" +
                                                    "<input type='button' value='发表' />" +
                                                    "</dd>" +
                                                    "</dl></form>";
                                    $('.comment_list').eq(index).append(publishText);
                                    $('.comment_list').eq(index).find('input[type=button]').button().click(function () {
                                        var _this = this;
                                        $('.comment_list').eq(index).find('form').ajaxSubmit({
                                            url:'php/add_comment.php',
                                            type: 'POST',
                                            data: {
                                                titleid: $('.comment').eq(index).attr('data-id'),
                                                user: $.cookie('user'),
                                            },
                                            beforeSubmit: function (formData, jqForm, options) {
                                                $('#loading').dialog('open');
                                                $(_this).button('disable');
                                            },
                                            success: function (responseText, statusText) {
                                                if(responseText){
                                                    $(_this).button('enable');
                                                    $('#loading').css('background', 'url("css/images/check_32x32.png") no-repeat 20px center').html('数据新增成功');

                                                    setTimeout(function () {
                                                        $('#loading').dialog('close');
                                                        var date = new Date();
                                                        var commentSubmit = "<dl class='comment_content'>" +
                                                                        "<dt>"+ $.cookie('user') +"</dt>" +
                                                                        "<dd>"+ $('.comment_list').eq(index).find('textarea').val() +"</dd>" +
                                                                        "<dd class='comment_date'>"+ date.getFullYear()+"-" +(date.getMonth()+1) + "-"+ date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() +"</dd>" +
                                                                        "</dl>";
                                                        $('.comment_list').eq(index).prepend(commentSubmit);

                                                        $('.comment').eq(index).html('');
                                                        $('.comment_list').eq(index).find('form').resetForm();
                                                        //console.log($('.comment_list').eq(index).find('form'));
                                                        //console.log($(this));
                                                        //$(this).resetForm();
                                                        $('#loading').css('background', 'url("css/images/loading2_32x32.gif") no-repeat 20px center').html('数据加载中');
                                                    },1000);
                                                }
                                            },
                                        });
                                    });
                                },
                            });
                        }


                        if($('.comment_list').eq(index).is(':hidden')){
                            $('.comment_list').eq(index).show();
                        }else{
                            $('.comment_list').eq(index).hide();
                        }


                    }else{
                        $('#error').dialog('open');
                        setTimeout(function () {
                            $('#error').dialog('close');
                            $('#login').dialog('open');
                        },1000);
                    }

                });


            });

            /*
            $.each($('.editor'), function (index, value) {
                arr[index] = $(this).height();
                if($(this).height() > 155){
                    $(this).next('.bottom').find('.up').hide();
                    $(this).height(158);
                }
               //alert($(this).css('height'));
            });


            $.each($('.bottom .down'), function (index, value) {
                $(this).click(function () {

                    //$(this).parent().prev().height(arr[index]);
                    $(this).hide();
                    //console.log($(this).next('.up'));
                    console.log($(this).parent().find('.up'));
                    $(this).parent().find('.up').show();
                    //$(this).next('.up').show();
                });
            });

            $.each($('.bottom .up'), function (index, value) {
                $(this).click(function () {
                    if($(this).parent().prev().height() > 155) {
                        $(this).hide();
                        $(this).parent().prev().height(155);
                        $(this).parent().find('.down').show();
                    }
                });
            });
            */
        },
    });
});

//alert(replacePos("123", 2, ""));
function replacePos(strObj, pos, replaceText){
    return strObj.substr(0, pos-1) + replaceText + strObj.substr(pos, strObj.length);
}