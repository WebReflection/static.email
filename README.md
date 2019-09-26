# StaticEmail

[![Build Status](https://travis-ci.com/WebReflection/static.email.svg?branch=master)](https://travis-ci.com/WebReflection/static.email) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/static.email/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/static.email?branch=master) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)


The easiest way to send emails to yourself, as described in [this post](https://medium.com/@WebReflection/how-to-send-emails-from-static-websites-9a34ceb9416c).


### Back End

Publish a static website via [zeit now](https://zeit.co/), use [static.email.ses](https://github.com/WebReflection/static.email.ses#readme) as serverless function and call it a day 🎉


### Client Side

Either `import StaticEmail from 'static.email'` or put the script on top of your page.

```html
<script src="https://unpkg.com/static.email"></script>
<script>
StaticEmail({
  // your zeit now SES enabled serverless function
  path: '/api/paperboy',

  // optional fields
  from: 'Some Body <some@body.me>',
  subject: 'Is it really that simple?',

  // allowed content
  html: '<strong>Great Service!</strong>',
  md: '# Great Service!',
  text: 'Great Service'
})
  .then(() => console.log('email sent 🎉'))
  .catch(console.error);
</script>
```
