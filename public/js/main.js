function setHead() {
    const head = document.head;

    const metaCharset = document.createElement("meta");
    metaCharset.setAttribute("charset", "UTF-8");
    head.appendChild(metaCharset);

    const metaIE = document.createElement("meta");
    metaIE.setAttribute("http-equiv", "X-UA-Compatible");
    metaIE.setAttribute("content", "IE=edge");
    head.appendChild(metaIE);

    const metaViewport = document.createElement("meta");
    metaViewport.setAttribute("name", "viewport");
    metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0"
    );
    head.appendChild(metaViewport);

    const title = document.createElement("title");
    title.textContent = "Biking World";
    head.appendChild(title);

    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/stylesheets/style.css");
    head.appendChild(link);
}

function showHeader() {
    const header = document.createElement("header");

    const imagenHeader = document.createElement("div");
    imagenHeader.setAttribute("id", "imagen_header");

    const imagen = document.createElement("img");
    imagen.setAttribute("src", "/resources/logo/logo.jpg");
    imagen.setAttribute("alt", "Imagen");

    imagenHeader.appendChild(imagen);

    const textoHeader = document.createElement("div");
    textoHeader.setAttribute("id", "texto_header");

    const h1 = document.createElement("h1");
    h1.innerHTML = "Biking World";
    textoHeader.appendChild(h1);

    const h2 = document.createElement("h2");
    h2.innerHTML = "La mejor web de bicis";
    textoHeader.appendChild(h2);

    header.appendChild(imagenHeader);
    header.appendChild(textoHeader);

    const nav = document.createElement("nav");

    const ul = document.createElement("ul");

    const homeLink = document.createElement("a");
    homeLink.setAttribute("href", "/");

    const homeLi = document.createElement("li");
    homeLi.innerHTML = "Home";

    homeLink.appendChild(homeLi);
    ul.appendChild(homeLink);

    const bikesLink = document.createElement("a");
    bikesLink.setAttribute("href", "/bike");

    const bikesLi = document.createElement("li");
    bikesLi.innerHTML = "Bikes";

    bikesLink.appendChild(bikesLi);
    ul.appendChild(bikesLink);

    nav.appendChild(ul);

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);
}

setHead();
showHeader();
