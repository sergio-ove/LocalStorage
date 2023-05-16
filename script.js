//Nos traemos los elementos del html
let productos = document.querySelector("#productos");

let productosSeleccionados = document.querySelector("#selecionados");

let borrar = document.querySelector("#borrar");

//Creamos un fragmment vacío para agregar nodos
let fragment = document.createDocumentFragment();


//Nos creamos un array de productos
const arrayProductos = [

    {
        id: 1,
        product: "Lechuga"
    },

    {
        id: 2,
        product: "Arroz"
    },

    {
        id: 3,
        product: "Chocolate"
    },

    {
        id: 4,
        product: "Queso"
    },

    {
        id: 5,
        product: "Carne"
    },

    {
        id: 6,
        product: "Aceite"
    },
    {
        id: 7,
        product: "Agua"
    },

    {
        id: 8,
        product: "Tomate"
    }
];


//Guardamos en una variable los productos que tenemos en el LocalStorage.
let productosLocal = JSON.parse(localStorage.getItem("lista")) || [];


//Evento para vaciar la lista entera
borrar.addEventListener("click", () => {
    deleteAll();
});


//Eventos para añadir o eliminar un producto determinado de la lista
document.addEventListener("click", ({ target }) => {
    if (target.matches(".add")) {
        const id = target.parentElement.id;
        AñadirmismoProducto(id);
        dibujarListaStorage();

    } if (target.matches(".eliminar")) {
        const id = target.parentElement.id;
        console.log(id);
        EliminarDeLaLista(id);
        dibujarListaStorage();
    }
});


//Recorremos el array de productos y lo pintamos.
const dibujarlista = () => {

    arrayProductos.forEach(({ id, product }) => {
        const listElement = document.createElement("LI");
        listElement.id = id;
        listElement.innerHTML = `${product}
                                  <button class="add">Añadir</button>`;
        fragment.append(listElement);
    });
    productos.append(fragment);

};

//Recorremos nuestra "lista de la compra" tras guardarle en el local y la pintamos.
const dibujarListaStorage = () => {

    productosSeleccionados.innerHTML = "";
    const productsToPrint = getLocal();
    productsToPrint.forEach((item) => {
        const articulosAñadir = document.createElement("li");
        articulosAñadir.id = item.id;
        articulosAñadir.innerHTML = `${item.count}x ${item.product}<button class="eliminar">Eliminar</button>`;
        fragment.append(articulosAñadir)

    });
    productosSeleccionados.append(fragment);
}




//Añadimos productos
const AñadirmismoProducto = (id) => {
    //Buscamos el producto que se "clickea".
    const productFound = arrayProductos.find((item) => item.id == id).product;
    console.log(productFound);
    //Buscamos el producto dentro de nuestro array en el local.
    const productAlready = productosLocal.find((item) => item.id == id);
    console.log(productAlready);

    if (!productAlready) {
        productosLocal.push({ id: id, product: productFound, count: 1 });
        setLocal();
    } else {
        productAlready.count++;
        setLocal();
    }
};




//Eliminamos un producto concreto de la lista
const EliminarDeLaLista = (id) => {
    //Buscamos el producto que se "clickea".
    const productFound = productosLocal.find((item) => item.id === id);
    console.log(productFound);
    if (productFound.count > 1) {
        productFound.count--;
        setLocal();
    } else {
        //Utilizamos el método findIndex para encontrar el índice del objeto en el array.
        const elementIndex = productosLocal.findIndex((item) => item.id === id);
        console.log(elementIndex);
        //Si nos devuelve distinto de -1 es que la respuesta es "true" por lo que seguidamente la aplicamos el método splice para eliminarlo del array.
        if (elementIndex !== -1) {
            productosLocal.splice(elementIndex, 1);
            setLocal();
        }
    }
};



const setLocal = () => {
    return localStorage.setItem("lista", JSON.stringify(productosLocal));
};

const getLocal = () => {
    return JSON.parse(localStorage.getItem("lista")) || [];
};

const deleteAll = () => {

    localStorage.clear();
    productosLocal = [];

    dibujarListaStorage([]);
};

dibujarlista();