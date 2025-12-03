import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import Inicio from '@/views/Catequizando/Catequizando.vue'
import Catequista from '@/views/Catequista/Catequista.vue'
import FormCatequista from '@/views/Catequista/CatequistaForm.vue'
import ViewCatequista from '@/views/Catequista/ViewCatequista.vue'
import EditCatequista from '@/views/Catequista/EditCatequista.vue'
import CatequizandoForm from '@/views/Catequizando/CatequizandoForm.vue'
import ViewCatequizando from '@/views/Catequizando/ViewCatequizando.vue'
import EditCatequizando from '@/views/Catequizando/EditCatequizando.vue'
import Documentos from '@/views/Documentos/Documentos.vue'
import DocumentosForm from '@/views/Documentos/DocumentosForm.vue'
import DetalheDoc from '@/views/Documentos/DetalheDoc.vue'
import EditDocumento from '@/views/Documentos/EditDoc.vue'
import Turma from '@/views/Turmas/Turma.vue'
import TurmaForm from '@/views/Turmas/TurmaForm.vue'
import DetalhesTurma from '@/views/Turmas/DetalhesTurma.vue'
import EditarTurma from '@/views/Turmas/EditarTurma.vue'
import Encontro from '@/views/Turmas/Encontro.vue'
import EditarEncontro from '@/views/Turmas/EditarEncontro.vue'

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
      path: '/Catequizando/Detalhes/:id',
      name: 'ViewCatequizando',
      component: ViewCatequizando
    },
    {
      path: '/Catequizando/EditCatequizando/:id',
      name: 'EditCatequizando',
      component: EditCatequizando
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
      path: '/Catequista/Detalhes/:id',
      name: 'ViewCatequista',
      component: ViewCatequista
    },
    {
      path: '/Catequista/EditCatequista/:id',
      name: 'EditCatequista',
      component: EditCatequista
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
    },
    {
      path: '/Documento/DetalheDoc/:id',
      name: 'DetalhesDoc',
      component: DetalheDoc
    },
    {
      path: '/Turma',
      name:  'turmas',
      component: Turma
    },
    {
      path: '/Turma/TurmaForm',
      name: 'TurmaForm',
      component: TurmaForm
    },
    {
      path: '/Turma/DetalhesTurma/:id',
      name: 'DetalhesTurma',
      component: DetalhesTurma
    },
    {
      path: '/Turma/EditTurma/:id',
      name: 'EditTurma',
      component: EditarTurma
    },
    {
      path: '/Turma/DetalhesTurma/Encontro',
      name: 'Encontro',
      component: Encontro
    },
    {
      path: '/Turma/DetalhesTurma/Encontro/EditEncontro',
      name: 'DetalhesEncontro',
      component: EditarEncontro
    },
    {
      path: '/Documento/EditDocumento/:id',
      name: 'EditDocumento',
      component: EditDocumento
    },
  ],
})

export default router
