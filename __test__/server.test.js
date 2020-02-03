import io from 'socket.io';
import express from 'express';
import { readJson, outputJson } from 'fs-extra';
import next from 'next';
import http from 'http';

jest.mock('http');

const ioMock = jest.fn();
const ioOnMock = jest.fn();
const socketOnMock = jest.fn();
const socketEmitMock = jest.fn();
const nextPrepareMock = jest.fn();
const mockExpressGet = jest.fn();
const httpListenMock = jest.fn();
const getRequestHandlerMock = jest.fn();

io.mockReturnValue({
  on: ioOnMock,
});

httpListenMock.mockImplementation((port, cb) => {
  cb(null);
});

nextPrepareMock.mockImplementation(() => Promise.resolve());
express.mockReturnValue({
  get: mockExpressGet,
});

http.Server.mockReturnValue({
    listen: httpListenMock
});

next.mockImplementation(() => ({
  getRequestHandler: getRequestHandlerMock,
  prepare: nextPrepareMock
}));

ioMock.mockReturnValue(() => ({
  on: ioOnMock,
}));

ioOnMock.mockImplementation((event, cb) => {
  cb({
    on: socketOnMock,
    emit: socketEmitMock,
  });
});
const itemAName = 'name';
const itemAId = 'A';
const itemBId = 'A';

const newItem = {
  id: itemAId,
  name: itemAName,
};

socketOnMock.mockImplementation((event, cb) => {
  cb(newItem, () => {});
});

const items = [
  {
    id: itemAId,
    sent_at_second: 1,
  },
  {
    id: itemBId,
    sent_at_second: 2,
  },
]

readJson.mockReturnValue(items);
outputJson.mockReturnValue(Promise.resolve());

describe(`#Server`, () => {
  const server = require('../server');

  it(`incrementally emits data`, async () => {
    await new Promise((res) => setTimeout(res, 2000));

    expect(socketEmitMock.mock.calls[1][1]).toEqual({items: [items[0]]});
  });

  it.skip('updates data', () => {
    expect(outputJson.mock.calls[0][1]).toEqual([newItemA, ...items.slice(-1)]);
  });
});
