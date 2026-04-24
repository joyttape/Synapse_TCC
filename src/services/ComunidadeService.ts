import { api } from '@/common/http';

export const ComunidadeService = {
  async listar( ) {
    try {
      const { data } = await api.get("/api/Comunidade");
      return Array.isArray(data) ? data : (data.items || []);
    } catch (error) {
      console.error("Erro ao buscar comunidades no Service:", error);
      throw error;
    }
  }
};
