class Menu extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="images/logo/northwind_T.png" alt="" width="65%"  class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                
                <li class="nav-item">
                <a class="nav-link" href="cargarCSV.html">Productos</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="categories.html">Categorías</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="suppliers.html">Proveedores</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="customers.html#">Clientes</a>
                </li>
        
                <li class="nav-item">
                    <a class="nav-link" href="signup.html">Registrar nuevo usuario</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="salir()">Salir</a>
                </li>
            </ul>
        </div>
    </div>
</nav>`;
  }
}

customElements.define("menu-component", Menu);
