# StaticEmail - Alpha

[![Build Status](https://travis-ci.com/WebReflection/static.email.svg?branch=master)](https://travis-ci.com/WebReflection/static.email) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/static.email/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/static.email?branch=master) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)


The easiest way to send emails to yourself on the Web.


### Configuration

Visit https://static.email/ to start sending emails to yourself from your sites.


### Client Side

Either `import StaticEmail from 'static.email'` or put the script on top of your page.

```html
<script src="https://static.email/js/se.js"></script>
<script>
StaticEmail({
  // your unique identifier for the page
  token: 'URL-AUTH-TOKEN',

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
