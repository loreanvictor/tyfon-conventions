export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface HttpEndpoint {
  url: string;
  method: HttpMethod;
}

function prefix(pre: string, name: string) {
  return pre.toLowerCase() + name[0].toUpperCase() + name.substr(1);
}

function deprefix(pre: string, name: string) {
  if (name.startsWith(pre)) {
    const _name = name.substr(pre.length);
    return _name[0].toLowerCase() + _name.substr(1);
  } else {
    return name;
  }
}

export const HttpMethodPrefixes = /*#__PURE__*/{
  'GET': ['get'],
  'POST': ['post', 'create', 'add'],
  'PUT': ['put', 'set', 'update'],
  'DELETE': ['delete', 'remove'],
};

export function endpoint(name: string): HttpEndpoint {
  const entries = Object.entries(HttpMethodPrefixes);
  for (let i = 0, entry = entries[i]; i < entries.length; entry = entries[++i]) {
    const [method, prefixes] = entry;
    for (let j = 0, prefix = prefixes[j]; j < prefixes.length; prefix = prefixes[++j]) {
      if (name.startsWith(prefix)) {
        return {
          method: method as HttpMethod,
          url: deprefix(prefix, name)
        }
      }
    }
  }

  return {
    method: 'POST',
    url: name
  }
}

export function possibleNames(endpoint: HttpEndpoint) {
  const res = HttpMethodPrefixes[endpoint.method].map(pre => prefix(pre, endpoint.url));
  if (endpoint.method === 'POST') {
    return [endpoint.url, ...res];
  } else {
    return res;
  }
}


export { parseJson } from './parse';
