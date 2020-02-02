// TODO: usually I would do this setup inside the test and just export
// the ioMock but for some reason doing this setup in the test file was failing.
// Not sure if it has to do with the naming convention for socket.io-client ¯\_(ツ)_/¯

const ioMock = jest.fn();
const socketMock = jest.fn();
const socketMockObj = {
  emit: socketMock,
};

socketMock.mockImplementation((event, data, cb) => cb(null));

ioMock.mockReturnValue(socketMockObj);

export const socket = socketMock;
export default ioMock;
