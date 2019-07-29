//小蛇的自调用函数
(function(){
    //存放蛇的每个身体部分
    var elements = [];
    //小蛇的构造函数,蛇每节宽高
    function Snake(width,height,direction){
        //小蛇每部分的宽
        this.width = width||20;
        this.height = height||20;
        //小蛇的身体
        this.body = [
            {x:3,y:2,color:"red"},      //head
            {x:2,y:2,color:"orange"},   //body
            {x:1,y:2,color:"orange"}    //body
        ];
        //方向
        this.direction = direction||"right";
    }
    //为原型添加方法---小蛇初始化
    Snake.prototype.init = function(map){
        //先删除之前的蛇
        remove();
        //循环遍历创建div
        for(var i = 0;i<this.body.length;i++){
            //数组中的每个元素都是一个对象
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            //把div加入到map地图中
            map.appendChild(div);
            //设置div的样式
            div.style.position = "absolute";
            div.style.width = this.width+"px";
            div.style.height = this.height+"px";
            //横纵坐标
            div.style.left = obj.x*this.width+"px";
            div.style.top = obj.y*this.height+"px";
            //背景颜色
            div.style.backgroundColor = obj.color;
            //把小蛇的每个部分加入到数组中
            elements.push(div);
        }
    }
    //为原型添加方法让小蛇动起来
    Snake.prototype.move = function(food,map){
        //改变小蛇身体坐标
        var i =this.body.length-1;
        for(;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        //改变小蛇方向
        switch(this.direction){
            case "right":
                this.body[0].x+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
        }
        //判断小蛇有没有吃到食物，舌头坐标和食物一致
        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;
        //食物横纵坐标
        var foodX = food.x;
        var foodY = food.y;
        if(headX == foodX && headY == foodY){
            //获取小蛇最后的尾巴
            var last = this.body[this.body.length-1];
            //复制蛇尾，加入到body
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //删除食物,初始化食物
            food.init(map);
        }
    };
    //删除小蛇的私有函数
    function remove(){
        //获取数组
        var i = elements.length-1;
        for(;i>=0;i--){
            //先从当前的子元素中找到该子元素的父级元素，然后删除
            var ele = elements[i];
            //从map地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    //把Snake暴露给window
    window.Snake = Snake;
}());