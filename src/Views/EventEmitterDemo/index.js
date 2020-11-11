
// 发布订阅模型简易Demo
class EventEmitterDemo {
  constructor(){
    // 订阅关系映射表
    this.eventMap = {}
  }

  // 订阅方法，绑定订阅类型和回调函数
  on(type,func){
    // 参数校验
    if(!(func instanceof Function)){
      throw new Error('callback must be a function')
    }

    // 判断当前订阅是否已经存在
    if(!this.eventMap[type]){
      this.eventMap[type] = []
    }

    // 将订阅callback写入订阅列表
    this.eventMap[type].push(func)
  }

  // 发布方法，触发订阅绑定的callback
  emit(type,params){
    if(!(this.eventMap[type])) return;
    this.eventMap[type].forEach((handle,index) =>{
      handle(params)
    })
  }

  // 移除订阅，取消某一个订阅
  off(type,func){
    if(this.eventMap[type]){
      let index = this.eventMap[type].indexOf(func);
      if(index > 0){
        this.eventMap[type].splice(index,1)
      }
    }
  }
}
 
export default EventEmitterDemo;

const myEvent = new EventEmitterDemo();

myEvent.on('test',function(params){
  console.log('订阅函数1params：',params)
})

myEvent.on('test',function(params){
  console.log('订阅函数2params：',params)
})

myEvent.emit('test','开始发布啦...')

