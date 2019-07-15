var add = function (a, b) {
  return a + b
}

// 第一个jest例子
test('1 + 1应该等于2', function () {
  expect(add(1,1)).toBe(2)
})

// jest Matchers
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

// jest异步
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
  // promise
test('the data is peanut butter', () => {
  return fetchData2().then(data => {
    expect(data).toBe('peanut butter');
  });
});
  // .resolves / .rejects
test('the data is peanut butter', () => {
  return expect(fetchData2()).resolves.toBe('peanut butter');
});
  // Async/Await
test('the data is peanut butter', async () => {
  const data = await fetchData2();
  expect(data).toBe('peanut butter');
});

// jets周期钩子函数 和 作用域
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

// 作用域
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

// 多个嵌套模块之间的执行顺序
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

// jest mock
