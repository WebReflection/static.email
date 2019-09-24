'use strict';
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

const {call} = require('safer-function');

const {Error, XMLHttpRequest, encodeURIComponent} = window;

const {getOwnPropertyDescriptor, keys} = Object;

const allowed = ['from', 'html', 'md', 'subject', 'text'];
const {filter, indexOf, join, map} = allowed;

const {prototype} = XMLHttpRequest;
const {addEventListener, open, send, setRequestHeader} = prototype;
const {get: readyState} = getOwnPropertyDescriptor(prototype, 'readyState');
const {get: responseText} = getOwnPropertyDescriptor(prototype, 'responseText');
const {get: status} = getOwnPropertyDescriptor(prototype, 'status');

Object.defineProperty(exports, '__esModule', {value: true}).default = details => new Promise((resolve, reject) => {

  const info = keys(details || {});
  if (call(indexOf, info, 'path') < 0 || (
    call(indexOf, info, 'html') < 0 &&
    call(indexOf, info, 'md') < 0 &&
    call(indexOf, info, 'text') < 0
  ))
    return reject(new Error('Bad Request'));

  const xhr = new XMLHttpRequest;
  call(open, xhr, 'POST', details.path, true);
  call(setRequestHeader, xhr, 'Content-Type', 'application/x-www-form-urlencoded');
  call(addEventListener, xhr, 'readystatechange', () => {
    if (call(readyState, xhr) == 4) {
      if (call(status, xhr) == 200)
        resolve(call(responseText, xhr));
      else
        reject(new Error(call(responseText, xhr) || 'Not Found'));
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
