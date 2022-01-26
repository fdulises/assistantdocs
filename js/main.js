//Logica principal que se ejecuta en cada página
function main(footercont) {

    //Cargar footer, logica y estilos
    let newcont = document.createElement('div');
    newcont.innerHTML = footercont;
    document.body.appendChild(newcont);

    //Img lightbox
    const myimglb = new lilightbox('.mylbselector');

    //Estilizar contenedor demos
    cssbrowser();
}

/* -- Ventana para lightbox y modal dialogs -- */
class liwindow {
    constructor(html) {
        //Creamos el contenedor principal del lightbox
        this.container = document.createElement('div');
        this.container.setAttribute('class', 'liwindow-container liwindow-hide');
        this.container.addEventListener('click', this.hide);
        document.body.appendChild(this.container);

        //Añadimos el html proporcionado por el usuario
        if (html != null) this.setContent(html);
    }

    //Metodo para abrir lightbox
    show = () => {
        this.container.classList.remove('liwindow-hide');
        document.body.style.overflow = 'hidden';
    }

    //Metodo para cerrar lightbox
    hide = () => {
        /*setTimeout(()=>this.container.classList.add('mlb-hide'), 600);*/
        this.container.classList.add('liwindow-hide');
        document.body.style.overflow = 'auto';
    }

    //Metodo para remover el lightbox y su contenido del html
    remove = () => document.body.removeChild(this.container);

    //Metodo para agregar contenido al lightbox
    setContent = cont => {
        if (typeof cont == 'string') {
            this.container.innerHTML = cont;
            this.container.firstChild.addEventListener('click', function (e) { e.stopPropagation() });
        } else {
            cont.addEventListener('click', function (e) { e.stopPropagation() });
            this.container.appendChild(cont);
        }
    }
}
/* -- Image Lightbox -- */
class lilightbox {
    constructor(sel) {
        document.querySelectorAll(sel).forEach(t=>{
            t.addEventListener("click", e => {
                e.preventDefault();
                const cont = `
                    <div class="lilightbox">
                        <button type="button" class="lilightbox-close">×</button>
                        <img src="${t.rel}">
                    </div>
                `;
                const liw = new liwindow(cont);
                liw.container.querySelector('.lilightbox-close').addEventListener('click', liw.hide);
                liw.show();
            }, false);
        });

    }
}
/* CSS drawing a browser */
function cssbrowser(){
    let cs_list = document.querySelectorAll('.code-sample');
    for (i = 0; i < cs_list.length; ++i) {
        let cs_url = cs_list[i].getAttribute('data-url') || '';
        let bo = document.createElement('div');
        bo.innerHTML = `
            <div class="code-sample-browser">
                <div class="code-sample-url">${cs_url}</div>
                <div class="code-sample-browactions">
                    <span class="code-sample-bmin"></span>
                    <span class="code-sample-bmax"></span>
                    <span class="code-sample-bclose"></span>
                </div>
            </div>
        `;
        cs_list[i].parentNode.insertBefore(bo, cs_list[i]);
    }
}

/* Syntax highlight */
const hljsscript = document.createElement('script');
hljsscript.src = 'js/highlight.js';
document.querySelector('body').appendChild(hljsscript);

/* Materialize */
const materialize = document.createElement('script');
materialize.src = 'js/materialize.js';
document.querySelector('body').appendChild(materialize);

window.addEventListener('load', () =>{
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        edge: 'right',
        draggable: true,
    });
});

/* Carga dinámica de footer y header */
const maintag = document.querySelector('#firsttag');
document.addEventListener('DOMContentLoaded', function(){
    fetch('html-parts/header.html').then(function (response) {
        return response.text();
    }).then(function (response) {
        let newcont = document.createElement('div');
        newcont.innerHTML = response;
        maintag.parentNode.insertBefore(newcont, maintag);
    }).catch(function (err) {
        console.log('Fetch problem: ' + err.message);
    });
    fetch('html-parts/footer.html').then(function (response) {
        return response.text();
    }).then(main).catch(function (err) {
        console.log('Fetch problem: ' + err.message);
    });
});