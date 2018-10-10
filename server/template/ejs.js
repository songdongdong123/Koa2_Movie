module.exports = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta chatset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Koa Server Html</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <h1>HI <%= you %></h1>
            <p>This is <%= me %><p>
          </div>
          <div class="col-md-4">
            <p>测试动态的 EJS 模板引擎</p>
          </div>
        </div>
      </div>
    </body>
  </html>
`