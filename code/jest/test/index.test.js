import { shallow, mount, render } from 'enzyme';
import TodoList from '../web/src/index/components/TodoList';


// 第一个jest例子
var add = function (a, b) {
  return a + b
}
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

beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
  test('', () => console.log('3 - test'));
});

// // 多个嵌套模块之间的执行顺序
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
  // function mocks
test(() => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  // 该 mock function 被调用两次
  expect(mockCallback.mock.calls.length).toBe(2);

  // 第一次被调用时传入的第一个参数是0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // 第二次被调用时传入的第一个参数是1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // 第一次执行后的返回值是42
  expect(mockCallback.mock.results[0].value).toBe(42);
})

  // timer mocks
function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // Schedule the next game in 10 seconds
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}
jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test('calls the callback after 1 second', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.runAllTimers();

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});

test('schedules a 10-second timer after 1 second', () => {
  const callback = jest.fn();

  infiniteTimerGame(callback);

  // At this point in time, there should have been a single call to
  // setTimeout to schedule the end of the game in 1 second.
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

  // Fast forward and exhaust only currently pending timers
  // (but not any new timers that get created during that process)
  jest.runOnlyPendingTimers();

  // At this point, our 1-second timer should have fired it's callback
  expect(callback).toBeCalled();

  // And it should have created a new timer to start the game over in
  // 10 seconds
  expect(setTimeout).toHaveBeenCalledTimes(2);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
});

it('calls the callback after 1 second via advanceTimersByTime', () => {
  const callback = jest.fn();

  timerGame(callback);

  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.advanceTimersByTime(1000);

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});

// snapshot
it('snapshot', () => {
  const wrapper1 = shallow(<TodoList />);
  const wrapper2 = mount(<TodoList />);
  const wrapper3 = render(<TodoList />);
  expect(wrapper1).toMatchSnapshot();
  expect(wrapper2).toMatchSnapshot();
  expect(wrapper3).toMatchSnapshot();
});