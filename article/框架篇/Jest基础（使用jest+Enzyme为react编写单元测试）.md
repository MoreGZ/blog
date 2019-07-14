# Jest基础（使用jest+Enzyme为react编写单元测试）

## 前端单元测试介绍
在将jest之前先介绍一下什么是前端单元测试，前端单元测试和其他的单元测试有什么的区别。
前端单元测试最大的的特点就是要测试页面渲染

## jest是什么
>Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

这是jest的官方介绍，jest是由facebook出品的一个测试框架，它拥有：安全与高效，输出代码报告，
mock模块，高质量的错误报告...等特点

## 市面上的前端单元测试对比（mocha，jest）

## 编写第一个jest单元测试用例
1. 先使用npm安装jest
```
npm i jest --save -dev
```
2. 在项目根目录下新建一个test目录，并且新建一个 *o*index.test.js** 文件
```
├── README.md
├── package-lock.json
├── package.json
├── server 
├── test 测试代码目录
│   ├── index.test.js 
├── tsconfig.json
└── web
    ├── config
    ├── script
    └── src
```

3. 编写测试代码

```javascript
var add = function (a, b) {
    return a + b
}

describe('加法测试', function () {
    it('1 + 1应该等于2', function () {
        expect(add(1,1)).to.be.equal(2)
    })
})
```
4. 在 **package.json** 文件中的scripts变量中添加一个别名
```
{
    ...
    "scripts": {
        ...
        "test": "jest"
    },
    ...
}
```
5. 执行测试

```
npm run test
```

## Jest特点
### matchers(断言)
Jest内置了自己的断言库，不需要自己再去找第三方断言库
（代码）

### 模块
Jest可以将测试代码划分为一个个模块，用于承载不同的业务功能，而每个模块内可以编写多个测试用例。

###  生命周期钩子
有时候我们需要在单元测试

### 异步函数测试

### mock

### snapshot(代码片段)

### 社区扩展资源

Enzyme 介绍（shallow，fullDom，static）， 结合例子

例子（ui组件测试+业务组件测试）