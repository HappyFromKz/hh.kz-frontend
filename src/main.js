import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';

import  "bootstrap/dist/css/bootstrap.min.css"
import  "bootstrap/dist/js/bootstrap.min.js"
import  "bootstrap/dist/js/bootstrap.bundle.min"

//primevue
import Button from "primevue/button"
import InputGroup from 'primevue/inputgroup';
import Password from 'primevue/password';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';

const app = createApp(App);

app.component('Button', Button);
app.component('InputGroup', InputGroup);
app.component('Password', Password);
app.component('InputText', InputText);
app.component('Card', Card);
app.component('Menubar', Menubar);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row', Row);
app.component('Dropdown', Dropdown);
app.component('Textarea', Textarea);
app.component('InputNumber', InputNumber);


app.use(store)
app.use(router)
app.use(PrimeVue, { unstyled: false })

app.mount('#app')

