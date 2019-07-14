var add = function (a, b) {
  return a + b
}

describe('加法测试', function () {
  it('1 + 1应该等于2', function () {
      expect(add(1,1)).toBe(2)
  })
})

