import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Inicio from '@/views/Catequizando/Catequizando.vue'
import Catequista from '@/views/Catequista/Catequista.vue'
import FormCatequista from '@/views/Catequista/CatequistaForm.vue'
import CatequizandoForm from '@/views/Catequizando/CatequizandoForm.vue'
import Documentos from '@/views/Documentos/Documentos.vue'
import DocumentosForm from '@/views/Documentos/DocumentosForm.vue'
import DetalheDoc from '@/views/Documentos/DetalheDoc.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/Catequizando',
      name: 'Catequizando',
      component: Inicio,
    },
    {
      path: '/Catequizando/CatequizandoForm',
      name: 'Formulário Catequizando',
      component: CatequizandoForm
    },
    {
      path: '/Catequista',
      name: 'Catequistas',
      component: Catequista
    },
    {
      path:'/Catequista/CatequistaForm',
      name: 'Formulario',
      component: FormCatequista
    },
    {
      path: '/Documento',
      name: 'Documentos&Impressoes',
      component: Documentos
    },
    {
      path: '/Documento/DocumentoForm',
      name: 'DocumentoForm',
      component: DocumentosForm
    },{
      path: '/Documento/DetalheDoc',
      name: 'DetalhesDoc',
      component: DetalheDoc
    }
  ],
})

export default router
