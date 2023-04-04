function setHead() {
    const head = document.head;
    const meta = [
        { name: "charset", value: "UTF-8" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ];
    const title = "Biking World";
    const link = {
        rel: "stylesheet",
        type: "text/css",
        href: "/stylesheets/style.css",
    };

    meta.forEach((metaData) => {
        const metaElement = document.createElement("meta");
        Object.entries(metaData).forEach(([key, value]) => {
            metaElement.setAttribute(key, value);
        });
        head.appendChild(metaElement);
    });

    const titleElement = document.createElement("title");
    titleElement.textContent = title;
    head.appendChild(titleElement);

    const linkElement = document.createElement("link");
    Object.entries(link).forEach(([key, value]) => {
        linkElement.setAttribute(key, value);
    });
    head.appendChild(linkElement);
}

function showHeader() {
    const header = document.createElement("header");

    const imagenHeader = createDivWithId("imagen_header");
    const imagen = createImgWithSrcAndAlt("/resources/logo/logo.jpg", "Imagen");
    imagenHeader.appendChild(imagen);
    header.appendChild(imagenHeader);

    const textoHeader = createDivWithId("texto_header");
    const h1 = createH1WithText("Biking World");
    const h2 = createH2WithText("La mejor web de bicis");
    textoHeader.append(h1, h2);
    header.appendChild(textoHeader);

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const homeLink = createLinkWithHrefAndText("/", "Home");
    const bikesLink = createLinkWithHrefAndText("/bike", "Bikes");
    const storesLink = createLinkWithHrefAndText("/store", "Stores");
    const stocksLink = createLinkWithHrefAndText("/stock", "Stocks");

    const homeLi = createLiWithElement(homeLink);
    const bikesLi = createLiWithElement(bikesLink);
    const storesLi = createLiWithElement(storesLink);
    const stocksLi = createLiWithElement(stocksLink);

    ul.append(homeLi, bikesLi, storesLi, stocksLi);
    nav.appendChild(ul);

    document.body.prepend(header, nav);
}

function createDivWithId(id) {
    const div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
}

function createImgWithSrcAndAlt(src, alt) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
    return img;
}

function createH1WithText(text) {
    const h1 = document.createElement("h1");
    h1.textContent = text;
    return h1;
}

function createH2WithText(text) {
    const h2 = document.createElement("h2");
    h2.textContent = text;
    return h2;
}

function createLinkWithHrefAndText(href, text) {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.textContent = text;
    return link;
}

function createLiWithElement(element) {
    const li = document.createElement("li");
    li.appendChild(element);
    return li;
}


setHead();
showHeader();
