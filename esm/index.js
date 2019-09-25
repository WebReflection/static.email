/*!
 * ISC License
 *
 * Copyright (c) 2019, Andrea Giammarchi, @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

import {call} from 'safer-function';

const {Error, XMLHttpRequest, encodeURIComponent} = window;

const {getOwnPropertyDescriptor, hasOwnProperty, keys} = Object;

const allowed = ['from', 'html', 'md', 'subject', 'text'];
const {filter, indexOf, join, map} = allowed;

const {prototype} = XMLHttpRequest;
const {addEventListener, open, send, setRequestHeader} = prototype;
const {get: readyState} = getOwnPropertyDescriptor(prototype, 'readyState');
const {get: responseText} = getOwnPropertyDescriptor(prototype, 'responseText');
const {get: status} = getOwnPropertyDescriptor(prototype, 'status');

const errors = {
  400: 'Bad Request',
  404: 'Not found',
  405: 'Method Not Allowed',
  501: 'Not Implemented'
};

export default details => new Promise((resolve, reject) => {

  const info = keys(details || {});
  if (call(indexOf, info, 'path') < 0 || (
    call(indexOf, info, 'html') < 0 &&
    call(indexOf, info, 'md') < 0 &&
    call(indexOf, info, 'text') < 0
  ))
    return reject(new Error(errors[400]));

  const xhr = new XMLHttpRequest;
  call(open, xhr, 'POST', details.path, true);
  call(setRequestHeader, xhr, 'Content-Type', 'application/x-www-form-urlencoded');
  call(addEventListener, xhr, 'readystatechange', () => {
    if (call(readyState, xhr) == 4) {
      const result = call(status, xhr);
      const response = call(responseText, xhr);
      if (result == 200)
        resolve(response);
      else
        reject(new Error(
          response ||
          (call(hasOwnProperty, errors, result) ?
            errors[result] : errors[501])
        ));
    }
  });
  call(send, xhr, call(
    join,
    call(
      map,
      call(
        filter,
        info,
        key => -1 < call(indexOf, allowed, key)
      ),
      key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
    ),
    '&'
  ));
});
