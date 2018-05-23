'use strict';
// 命名空间： 减少全局变量污染，降低变量冲突
var Index = (function (){

    // 即时函数，返回一个对象，函数外部无法访问到函数内部定义的变量
    return {
        // 选项卡切换
        tagChange: function (){
            // 单一var模式，在函数最开始，声明所有需要的变量
            var $ul = $('#tag'),
            $con_lis = $('#tagCon > li'),
            cur_index = 0;
            // 事件委托
            $ul.on('click','li',function () {
               if($(this).is('current')) {
                return false;
               }else {
                    cur_index = $(this).index();
                    // console.log(cur_index);
                   $(this).addClass('current')
                          .siblings().removeClass('current');
                    // 显示对应下标的内容
                    $con_lis.eq(cur_index).css('display','block')
                            .siblings().css('display','none');
               }
            });
        },
        // 购买区域效果
        chooseShop: function (){
            //获取需要的对象
            // 定位上下文
            var $csShop = $('#cs-shop'),
                $up = $('#up',$csShop),  // 个数 +
                $down = $('#down',$csShop), // 个数 -
                $allPrice = $('#all-price',$csShop),  // 总价
                $input = $('input',$csShop),  // 输入框
                status = true, // 状态，用来判断用户是否是第一次改变输入框内容
                con = -1, // 用于保存用户手动输入的值
                sum = parseInt($input.val()); // 总个数

                   // 编写一个用于判断sum值对应的范围的总价格
                function needMoney(sum) {
                    if (sum >1 && sum <100) {
                        return sum * 0.5;
                    } else if (sum >=100 && sum < 1000) {
                        return sum * 0.45;
                    } else if (sum >= 1000 ) {
                        return sum * 0.4
                    }else {
                        return 1;
                    }
                }
                // down对象的回调函数
                function down() {
                    sum -= 1;
                    $input.val(sum);
                    $allPrice.text(needMoney(sum));
                    if (sum == 1) {
                        $(this).addClass('no-click').off();
                    }
                }
                // 给up对象添加点击事件
                $up.on('click',function (){
                    sum += 1;
                    $input.val(sum);
                    $allPrice.text(needMoney(sum));
                    // 移除down对应的元素的no-click类
                    if (sum == 2) {
                        $down.removeClass('no-click').on('click',down);
                    }
                    // 
                });
                // input 键盘事件
                $input.on('keyup',function (){
                    // console.log('我的内容被改变了');
                     con = $input.val();
                    if( !Number(con) || parseInt(con) <= 1) {
                        $input.val(1);
                        sum = 1;
                        $allPrice.text(needMoney(sum));
                        $down.addClass('no-click').off();
                        status = true;
                    }else {
                        sum = parseInt(con);
                        if (status) {
                            $down.removeClass('no-click').on('click',down);
                            status = false;
                        }
                        $allPrice.text(needMoney(sum));
                    }
                }); 
        },
        // 下单按钮
        // place an order
        paOrder: function (){
            // 获取元素
            var $btn = $('#btn');
            // 添加点击事件
            $btn.click(function (){
                confirm('你是认真的吗?');
            });
        },
        // 第二页的表格显示功能
        // create Table
        upcTable: function table() {
            var aboutUPC = function (){
                return '<button class="upc">下载数字码</button><button class="upc btn-style">下载条形码</button>';
            },
                aboutEAN = function (){
                return '<button class="ean">下载数字码</button><button class="ean btn-style">下载条形码</button>';
             };
            

            $('#upc-table').bootstrapTable({
                cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
                pagination: true, // 在表格底部显示分页组件，默认false
                pageList: [5,10, 20], // 设置页面可以显示的数据条数
                pageSize: 5, // 页面数据条数
                pageNumber: 1, // 首页页码
                sortName: 'id', // 要排序的字段
                sortOrder: 'asc', // 排序规则
                method: 'GET', //请求服务器数据的方式
                // url: 
                dataType: 'json',  //服务器应该返回json格式的数据
                classes: 'table-no-bordered', //删除表格的边框
                columns: [
                    {
                        field: 'id',
                        title: '订单号',
                        align: 'center',
                        width: '15%',
                        valign: 'middle'
                    },
                    {
                        field: 'date',
                        title: '购买时间',
                        align: 'center',
                        width: '25%',
                        valign: 'middle'
                    },
                    {
                        field: 'count',
                        title: '数量',
                        align: 'center',
                        width: '10%',
                        valign: 'middle'
                    },
                    {
                        field: 'money',
                        title: '付款金额',
                        align: 'center',
                        width: '15%',
                        valign: 'middle'
                    },
                    {
                        field: 'upc',
                        title: 'UPC码下载',
                        align: 'center',
                        valign: 'middle',
                        width: '20%',
                        formatter : aboutUPC
                    },
                    {
                        field: 'ean',
                        title: 'EAN码下载',
                        align: 'center',
                        width: '20%',
                        valign: 'middle', 
                        formatter: aboutEAN
                    },
                ],
                data: [
                    {
                        id: 1,
                        date: 11,
                        count: 111,
                        money: 1111,
                        upc: 11111,
                        ean: 111111
                    },
                    {
                        id: 2,
                        date: 22,
                        count: 222,
                        money: 2222,
                        upc: 22222,
                        ean: 222222
                    },
                     {
                        id: 1,
                        date: 11,
                        count: 111,
                        money: 1111,
                        upc: 11111,
                        ean: 111111
                    },
                    {
                        id: 2,
                        date: 22,
                        count: 222,
                        money: 2222,
                        upc: 22222,
                        ean: 222222
                    },
                    {
                       id: 1,
                       date: 11,
                       count: 111,
                       money: 1111,
                       upc: 11111,
                       ean: 111111
                   },
                   {
                       id: 2,
                       date: 22,
                       count: 222,
                       money: 2222,
                       upc: 22222,
                       ean: 222222
                   },
                   {
                      id: 1,
                      date: 11,
                      count: 111,
                      money: 1111,
                      upc: 11111,
                      ean: 111111
                  },
                  {
                      id: 2,
                      date: 22,
                      count: 222,
                      money: 2222,
                      upc: 22222,
                      ean: 222222
                  },
                  {
                     id: 1,
                     date: 11,
                     count: 111,
                     money: 1111,
                     upc: 11111,
                     ean: 111111
                 },
                 {
                     id: 2,
                     date: 22,
                     count: 222,
                     money: 2222,
                     upc: 22222,
                     ean: 222222
                 },
                 {
                    id: 1,
                    date: 11,
                    count: 111,
                    money: 1111,
                    upc: 11111,
                    ean: 111111
                },
                {
                    id: 2,
                    date: 22,
                    count: 222,
                    money: 2222,
                    upc: 22222,
                    ean: 222222
                }
                ],
            });
        }
    };
})();
