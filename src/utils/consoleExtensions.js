function assertNotNullOrUndefined(param, ...rest) {
  console.assert(
    param !== null && param !== undefined,
    {
      param: param,
      errorMsg: 'Oops! "param" is null or undefined!',
    },
    ...rest
  );
}

function assertNonEmptyString(param, ...rest) {
  console.assert(
    typeof param === 'string' && param.length > 0,
    {
      param: param,
      type: (typeof param),
      errorMsg: 'Oops! "param" is empty or not a typeof string!',
    },
    ...rest
  );
}

function assertNonEmptyArray(param, ...rest) {
  console.assert(
    Array.isArray(param) && param.length > 0,
    {
      param: param,
      type: (typeof param),
      errorMsg: 'Oops! "param" is empty or not a typeof array!',
    },
    ...rest
  );
}

/**
 * Asserts a param is of a given type.
 *
 * @example
 * // Passes
 * rossConsole.assertType('Hello!', 'string')
 * // Fails
 * rossConsole.assertType({}, 'bolean')
 *
 * @param {*} param The param to assert the type of.
 * @param {*} expectedType The expected type of the param.
 * @param  {...any} rest Args passed through to console.assert.
 */
function assertTypeOf(param, expectedType, ...rest) {
  console.assert(
    typeof param === expectedType,
    {
      param: param,
      type: (typeof param),
      errorMsg: `Oops! "param" is not a type of ${expectedType}!`,
    },
    ...rest
  );
}

export default Object.assign(
  {
    assertNotNullOrUndefined: assertNotNullOrUndefined,
    assertNonEmptyString: assertNonEmptyString,
    assertNonEmptyArray: assertNonEmptyArray,
    assertTypeOf: assertTypeOf,
  },
  console
);
