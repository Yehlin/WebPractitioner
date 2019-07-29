//自调用函数---食物对象
(function(){
    var elements = [];   //用来保存每个小方块食物
    //食物=对象，属性有宽高颜色坐标，定义构造函数来实例化
    function Food(x,y,width,height,color){
        //坐标
        this.x = x||0;
        this.y = y||0;
        //宽高
        this.width = width||20;
        this.height = height||20;
        //背景颜色
        this.color = color||"green";
    }
    //为原型添加初始化方法
    //食物在地图上显示，需要地图参数
    Food.prototype.init = function(map){
        //删除上一个小食物
        remove();
        //创建div
        var div = document.createElement("div");
        //把div加到map里
        map.appendChild(div);
        //设置div样式
        div.style.width = this.width+"px";
        div.style.height = this.height+"px";
        div.style.backgroundColor = this.color;
        div.style.position = "absolute";
        //坐标随机产生
        this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        //把div加入到数组elements中
        elements.push(div);
    };
    //私有函数---删除食物
    function remove(){
        //elements数组中有这个食物
        for(var i=0;i<elements.length;i++){
            var ele = elements[i];
            //找到这个子元素的父级元素，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个子元素也删除
            elements.splice(i,1);
        }
    }
    window.Food = Food;     //把Food构造函数暴露给全局
}());
/*  var food = new Food();
    food.init(document.querySelector(".map"));
    console.log(food.x+"-------"+food.y);
*/
/*   var food = new Food();
     console.log(food.width);
     测试代码，结果为默认值，说明Food构造函数已经被暴露给全局
*/