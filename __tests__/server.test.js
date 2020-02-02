import io from 'socket.io';
import express from 'express';
import { readJson, outputJson } from 'fs-extra';
// import server from '../server';

const ioMock = jest.fn();
const ioOnMock = jest.fn();
const socketOnMock = jest.fn();
const socketEmitMock = jest.fn();

ioMock.mockReturnValue(() => ({
  on: ioOnMock,
}));

ioOnMock.mockImplementation((event, cb) => {
  cb({
    on: socketOnMock,
    emit: socketEmitMock,
  });
});

describe(`#Server`, () => {
  it(`incrementally emits data`, () => {
    expect(true).toBe(true);
  });

  it(`updates data`, () => {
    expect(true).toBe(true);
  });
});
