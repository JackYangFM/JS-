define(["jquery"], function() {
    //用jQuery Ajax获取数据
    $.ajax({    
        url : "http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128",
        dataType:"jsonp",//用jsonp格式获取数据
        success:function(res){
            var dataJson = res.data.list;                
            //console.log(dataJson);               
            var list = "<ul>";
            $.each(dataJson,function(index,item){//index=>下标，item=>下标对应的项
                //用ES6拼接字符串
                list += `<li>
                            <a href="###"><img src="${item.image}"></a>
                            <div class="info">
                                <div class="part">
                                    <div class="price">￥${item.discountPrice}</div>
                                    <div class="collect">
                                        <i class="icon-star"></i>${item.itemLikes}
                                    </div>
                                </div>
                                <a class="title" href="http://item.meilishuo.com/detail/1kkehqm" btn-id="${item.item_id}">
                                    <i class="icon-select"></i>${item.title}
                                </a>
                            </div>
                        </li> `
            });
            $("#container").append(list);//将数据渲染到容器
        },
        error:function(dataJson){
            alert("数据加载失败...");
        }   
    })
    
});