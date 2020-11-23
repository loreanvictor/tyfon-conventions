import { should, expect } from 'chai'; should();

import { HttpMethod, endpoint, possibleNames, HttpEndpoint } from '../index';


describe('tyfon-conventions', () => {
  describe('endpoint()', () => {
    const testMapping = (name: string, method: HttpMethod, url: string) => {
      it(`should map ${name} to ${method} /${url}`, () => {
        const e = endpoint(name);
        e.method.should.equal(method);
        e.url.should.equal(url);
      });
    };

    testMapping('getX', 'GET', 'x');
    testMapping('postX', 'POST', 'x');
    testMapping('addX', 'POST', 'x');
    testMapping('createX', 'POST', 'x');
    testMapping('x', 'POST', 'x');
    testMapping('putX', 'PUT', 'x');
    testMapping('setX', 'PUT', 'x');
    testMapping('updateX', 'PUT', 'x');
    testMapping('deleteX', 'DELETE', 'x');
    testMapping('removeX', 'DELETE', 'x');
  });

  describe('possibleNames()', () => {
    const testMapping = (endpoint: HttpEndpoint, ...names: string[]) => {
      it(`should map ${endpoint.method} /${endpoint.url} to ${names}.`, () => {
        const p = possibleNames(endpoint);
        p.length.should.equal(names.length);
        p.forEach(_ => names.should.include(_));
      });
    }

    testMapping({method: 'GET', url: 'x'}, 'getX');
    testMapping({method: 'POST', url: 'x'}, 'x', 'postX', 'addX', 'createX');
    testMapping({method: 'PUT', url: 'x'}, 'putX', 'setX', 'updateX');
    testMapping({method: 'DELETE', url: 'x'}, 'deleteX', 'removeX');
  });
});
