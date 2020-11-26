# tyfon-conventions
[TyFON](https://loreanvictor.github.io/tyfon) conventions for mapping functions to URL endpoints.

👉 [Read this for more information](https://loreanvictor.github.io/tyfon/conventions).

<br>

## Installation

```bash
npm i tyfon-conventions
```

<br>

## Usage

👉 Find possible names from an invoked URL:

```ts
import { possibleNames } from 'tyfon-conventions';

console.log(possibleNames({
  method: 'POST',
  url: 'something'
});

// > something, postSomething, createSomething, addSomething
```

👉 Find URL and http method for a function name:

```ts
import { endpoint } from 'tyfon-conventions';

console.log(endpoint('postSomething'));

// > {
// >   method: 'POST',
// >   url: 'something'
// > }
```
