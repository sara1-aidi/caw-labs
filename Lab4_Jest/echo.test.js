
console.log = jest.fn();

require('./echo');

test('exf("echo",5) prints echo 5 times', () => {
  // From the first call: exf("echo", 5)
  expect(console.log).toHaveBeenCalledWith("echo");
  expect(console.log.mock.calls.filter(c => c[0] === "echo").length).toBe(5);
});

test('exf("JS from server", 10) prints JS from server 10 times', () => {
  expect(console.log).toHaveBeenCalledWith("JS from server");
  expect(console.log.mock.calls.filter(c => c[0] === "JS from server").length).toBe(10);
});
