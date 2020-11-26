const isoDateRegex = /*#__PURE__*/
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;


export function jsonReviver(_: string, value: any) {
  if (typeof value === 'string' && isoDateRegex.exec(value)) {
    return new Date(value);
  }

  return value;
}

export function parseJson(string: string) {
  return JSON.parse(string, jsonReviver);
}
