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

// jest模块

// jest周期钩子

// jest mock
