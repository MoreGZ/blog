var add = function (a, b) {
    return a + b
}
var m = function (a, b) {
    return a - b
}

// describe('算数测试', function () {
    // describe('加法测试', function () {
    //     it('1 + 1应该等于2', function () {
    //         expect(add(1,1)).to.be.equal(2);
    //     })
    
    //     it('1 + 2应该等于3', function () {
    //         expect(add(1,2)).to.be.equal(3);
    //     })
    // })

//     describe('减法测试', function () {
//         it('2 - 1应该等于1', function () {
//             expect(m(2,1)).to.be.equal(1);
//         })
    
//         it('3 - 1应该等于2', function () {
//             expect(m(3,1)).to.be.equal(3);
//         })
//     })
// })
// test('1 + 1应该等于2', function () {
//     // expect(add(1,1)).to.be.equal(2);
//     expect(add(1, 2)).toBe(3);
// })

// test('adding positive numbers is not zero', () => {
//     for (let a = 1; a < 10; a++) {
//         for (let b = 1; b < 10; b++) {
//         expect(a + b).not.toBe(0);
//         }
//     }
// })
// describe('商品模测试c', () => { // 单个模块
//     describe('查询商品列表', () => { //单个接口
//         it('不传人任何筛选条件，仅传入页数和页码', async () => { //单个接口用例
//             assert(3 === 2)
//         })
//     })
// })
// test('1 + 1应该等于2', function () {
//     console.log('test out 1')
//     // expect(add(1,1)).to.be.equal(2);
//     // expect(add(1, 2)).toBe(3);
// })
// test('1 + 1应该等于2', function () {
//     console.log('test out 2')
//     // expect(add(1,1)).to.be.equal(2);
//     // expect(add(1, 2)).toBe(3);
// })
// describe('outer', () => {
//     console.log('describe outer-a');
  
//     describe('describe inner 1', () => {
//       console.log('describe inner 1');
//       test('test 1', () => {
//         console.log('test for describe inner 1');
//         // expect(add(1, 2)).toBe(3);
//       });
//     });
  
//     console.log('describe outer-b');
  
//     test('test 1', () => {
//       console.log('test for describe outer');
//     //   expect(add(1, 2)).toBe(3);
//     });
  
//     describe('describe inner 2', () => {
//       console.log('describe inner 2');
//       test('test for describe inner 2', () => {
//         console.log('test for describe inner 2');
//         // expect(add(1, 2)).toBe(3);
//       });
//     });
  
//     console.log('describe outer-c');
//   });
//   test('1 + 1应该等于2', function () {
//     console.log('test out 3')
//     // expect(add(1,1)).to.be.equal(2);
//     // expect(add(1, 2)).toBe(3);
// })

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