import { should, expect } from 'chai'; should();

import { HttpMethod, endpoint, possibleNames, HttpEndpoint } from '../index';
import { parseJson } from '../parse';


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

  describe('parseJson()', () => {
    it('should parse JSON properly.', () => {
      const e = { x: 'hellow', y: [1, 2, 3], z: { w: false, y: [{ 'hellow-world': true}, 42]}};
      parseJson(JSON.stringify(e)).should.eql(e);
    });

    it('should properly parse dates.', () => {
      const d = new Date('December 17, 1995 03:24:00');
      const D: Date = parseJson(JSON.stringify(d));

      D.should.be.instanceof(Date);
      D.getFullYear().should.equal(1995);
      D.getMonth().should.equal(11);
      D.getHours().should.equal(3);
    });
  });
});
