//Define new components

const components = [
    ['app-root', require('@app/app-component.js').AppComponent],
    ['menu-component', require('@app/menu/menu-component.js').MenuComponent],
    ['view-component', require('@app/view/view-component.js').ViewComponent],
    ['login-component', require('@app/view/login/login-component.js').LoginComponent],
    ['accounts-component', require('@app/view/accounts/accounts-component.js').AccountsComponent],
    ['search-bar-component', require('@app/view/accounts/search-bar/search-bar-component.js').SearchBarComponent],
]

components.forEach(c => {
    customElements.define (c[0], c[1]);
});


