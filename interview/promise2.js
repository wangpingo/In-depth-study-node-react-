/**
 * Created by Administrator on 2017/6/20 0020.
 */
function Promise(executor) {
  var self = this;
  self.status = 'pending';
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];
  function resolve(value) {
    if (self.status === 'pending'){
      self.status = 'resolved';
      self.data = value;
      for (var i = 0; i < onResolvedCallback.length; i++){
        self.onResolvedCallback[i](value)
      }
    }
  }
  function reject() {
    if (self.status === 'pending'){
      self.status = 'rejected';
      self.data=value;
      for(var i = 0; i< onRejectedCallback.length;i++){
        self.onRejectedCallback[i](value);
      }
    }
  }

  try{
    executor(resolve,reject)
  }catch(e){
    reject(e);
  }
}

Promise.prototype.then(function (onResolved,onRejected) {
  var self = this;
  var promise2;
  onResolved = typeof onResolved === 'function'? onResolved:function (v) {}
  onRejected = typeof onRejected === 'function'? onRejected:function (v) {}

  if (self.status === 'resolved'){
    return promise2 = new Promise(function (resolve,reject) {
      try{
         var x = onResolved(self.data)
        if (x instanceof Promise){
           x.then(resolve , reject);
        }
        resolve(x);
      }catch (e){
        reject(e)
      }

    })
  }
  if (self.status === 'rejected'){
    return promise2 = new Promise(function (resolve,reject) {
      try{
        var x = onRejected(self.data)
        if (x instanceof Promise){
          x.then(resolve , reject);
        }
      }catch (e){
        reject(e)
      }

    })
  }

  if (self.status === "pending"){

    return promise2 = new Promise(function (resolve,reject) {

      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e){
          reject(e);
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })

    })

  }

})
