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
### 自带matchers(断言)
不同于其他测试框架，Jest内置了自己的断言库，不需要自己再去找第三方断言库。[文档](https://jestjs.io/docs/en/expect)
```javascript
test('doAsync calls both callbacks', async () => {
  const drink = jest.fn();

  expect({kitchen: 20}).toHaveProperty('kitchen', 20);
  expect(2).toBe(2)
  expect(undefined).toBeUndefined()
  expect(NaN).toBeNaN();
  expect(['lime', 'georgemo']).toContain('lime');
  expect(false).toBeFalsy()
  expect(Promise.resolve('lemon')).resolves.toBe('lemon')
  expect(drink).not.toHaveBeenCalled();
})
```
### 异步函数测试
jest支持多种方式来编写异步测试用例，其中包括，**Callbacks**，**Promises**，**.resolves / .rejects**，**Async/Await**
```javascript
function fetchData1(callback) {
  setTimeout(() => {
    callback('peanut butter')
  }, 1000);
}
function fetchData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('peanut butter')
    }, 1000);
  })
}
  // callback的方式
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
  // promise的方式
test('the data is peanut butter', () => {
  return fetchData2().then(data => {
    expect(data).toBe('peanut butter');
  });
});
  // .resolves / .rejects的方式
test('the data is peanut butter', () => {
  return expect(fetchData2()).resolves.toBe('peanut butter');
});
  // Async/Await的方式
test('the data is peanut butter', async () => {
  const data = await fetchData2();
  expect(data).toBe('peanut butter');
});
```

### 模块和生命周期钩子
有时候我们需要在测试之前做很多初始化工作，测试完成之后有时候也需要利用代码帮我们做很多“善后”的工作，jest提供了 **beforeEach** 和 **afterEach** 两个钩子函数以满足以上的场景
有时候我们只需要初始化一次而并不需要为每个测试执行初始化，以满足这种场景，jest提供了 **beforeAll** 和 **afterAll** 两个钩子函数 
```javascript
beforeAll(() => {
  return fetchData2();
});

afterAll(() => {
  return fetchData2();
});

beforeEach(() => {
  console.log('beforeEach')
});

afterEach(() => {
  console.log('afterEach')
});

test('city database has Vienna', () => {
  expect(2).toBe(2)
});

test('city database has San Juan', () => {
  expect(2).toBe(2)
});
```
默认情况下，before和after块适用于文件中的每个测试。 您还可以使用describe块将测试组合在一起。 当它们位于describe块中时，before和after块仅适用于该describe块中的测试。
```javascript
describe('matching cities to foods', () => {
  beforeEach(() => {
    console.log('beforeEach1')
  });

  test('Vienna <3 sausage', () => {
    expect(false).toBeFalsy()
  })
});

describe('matching cities to foods', () => {
  beforeEach(() => {
    console.log('beforeEach1')
  });

  test('Vienna <3 sausage', () => {
    expect(false).toBeFalsy()
  })
});
```
在执行顺序方面，顶级beforeEach在describe块内的beforeEach之前执行，如下例子：
```javascript
beforeAll(() => console.log('1 - beforeAll'))
afterAll(() => console.log('1 - afterAll'))
beforeEach(() => console.log('1 - beforeEach'))
afterEach(() => console.log('1 - afterEach'))
test('', () => console.log('1 - test'))
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'))
  afterAll(() => console.log('2 - afterAll'))
  beforeEach(() => console.log('2 - beforeEach'))
  afterEach(() => console.log('2 - afterEach'))
  test('', () => console.log('2 - test'))
  test('', () => console.log('3 - test'))
})

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

### mock everything
#### timer mocks
模拟所有时间流逝
模拟当前的timer的时间流逝
流逝指定秒数
```javascript
jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  function timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
      console.log("Time's up -- stop!");
      callback && callback();
    }, 1000);
  }
  
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```
#### function mocks
可以使用jest.fn(funcition)生成一个mock对象，该mock对象仍然是个函数，其执行结果与接受的函数一致，同时会在对象上挂载一个‘mock’属性，这个属性包含函数的历史调用信息等一系列信息，方便后面进行断言。

模拟函数返回值

模拟执行过程

#### module mocks

个人模块模拟

node_modules 模块模拟

绕过模块模拟

（es6 class mock）

### snapshot(代码片段)

### 社区扩展资源

Enzyme 介绍（shallow，fullDom，static）， 结合例子

例子（ui组件测试+业务组件测试）