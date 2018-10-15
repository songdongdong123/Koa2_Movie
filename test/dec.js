class Boy {
  @speak('中文') // 方法的装饰
  run () {
    console.log('I am a Boy')
    console.log('I can speak' + this.language)
  }
}
// 装饰器的作用： ES2016中的装饰器只是一种语法糖而已，编译时会把注解的代码翻译成我们熟悉的那种形式。
// 装饰器的概念: 装饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。
//              装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码
// 

function speak (language) {
  // target, key, descriptor 这个三个参数时装饰器函数本身原有的三个参数，如果我们要添加额外的参数，
  // 那就将原先的函数返回下下面这样
  return function (target, key, descriptor) {
    console.log(target)
    console.log(key)
    console.log(descriptor)
    target.language = language
    return descriptor
  }
}

// function speak (target, key, descriptor) {
//   // 第一个参数: 装饰器函数的第一个参数，就是所要装饰的目标类。
//   // 第二个参数: 是所要装饰的属性名
//   // 第三个参数: 是该属性的描述对象。
//   console.log(target)
//   console.log(key)
//   console.log(descriptor)
//   return descriptor
// }
// 装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升

const ethan = new Boy()
ethan.run()