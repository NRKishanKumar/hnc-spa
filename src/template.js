// html skeleton provider
export default function template(title, initialState = {}, content = "") {
    let scripts = ''; // Dynamically ship scripts based on render type
    if (content) {
        scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="assets/client.js"></script>
                `
    } else {
        scripts = ` <script src="assets/bundle.js"> </script> `
    }
    let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>
                <link href="assets/style.css" rel="stylesheet">
                <link href="assets/index.css" rel="stylesheet">
                <link href="assets/App.css" rel="stylesheet">
                    <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
                />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
              </head>
              <body>
              <script src="https://kit.fontawesome.com/16a5a777bc.js" crossorigin="anonymous"></script>
              <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                <div class="content">
                   <div id="app" class="wrap-inner">
                      ${content}
                   </div>
                </div>

                  ${scripts}
              </body>
              `;

    return page;
}
