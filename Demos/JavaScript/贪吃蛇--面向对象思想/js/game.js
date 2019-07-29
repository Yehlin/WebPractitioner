//自调用函数--游戏对象
(function(){
    var that = null;
    //游戏的构造函数
    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    //游戏初始化
    Game.prototype.init = function(){
        //初始化游戏
        this.food.init(this.map);
        this.snake.init(this.map);
        //调用自动运行方法
        this.runSnake(this.food,this.map);
        //调用键盘监听
        this.bindKey();
    };
    //添加原型方法，让小蛇自动运行
    Game.prototype.runSnake = function(food,map){
        //自动移动
        //定时器
        var timeId = setInterval(function(){
            //此时的this是window
            this.snake.move(food,map);
            this.snake.init(map);
            //横坐标最大值
            var maxX = map.offsetWidth/this.snake.width;
            //纵坐标最大值
            var maxY = map.offsetHeight/this.snake.height;
            //蛇头坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //水平撞墙
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("Game Over!");
            }
            //垂直撞墙
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("Game Over!");
            }
        }.bind(that),150);      //bind改变this指向，window改成实例对象
    };
    //添加原型方法，设置按键
    Game.prototype.bindKey = function(){
        //获取用户按键，改变小蛇方向
        document.addEventListener("keydown",function(e){
            //此时的this是触发keydown事件的对象----document
            switch(e.keyCode){
                case 37:
                    this.snake.direction = "left";break;
                case 38:
                    this.snake.direction = "top";break;
                case 39:
                    this.snake.direction = "right";break;
                case 40:
                    this.snake.direction = "bottom";break;
            }
        }.bind(that),false);
    }
    window.Game = Game;
}());