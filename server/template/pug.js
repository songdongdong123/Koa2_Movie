module.exports = `
doctype html
html
  head
    meta(chatset='utf-8')
    meta(name='viewport' content='width=device-width, initial-scale=1')
    title Koa Server Pug html
    link(href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.0/jquery.min.js')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle.min.js')
  body
    .container
      .row
        .col-md-8
          h1 Hi #{you}
          p This is #{me}
        .col-md-4
          p 测试动态的 Pug 模板引擎
`