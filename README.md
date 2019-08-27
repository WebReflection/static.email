# StaticEmail - Alpha

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
});
</script>
```
