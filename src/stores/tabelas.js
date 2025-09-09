import { defineStore } from "pinia"

export const useTabelasStore = defineStore("tabelas", {
  state: () => ({
    dadosIniciais: [
      { descricao: "Conta 1", jan_2024: 2222, fev_2024: 3333, jan_2025: 0, fev_2025: 0, media: 222, perc_projetado: 10 },
      { descricao: "Conta 2", jan_2024: 333, fev_2024: 2222, jan_2025: 0, fev_2025: 0, media: 333, perc_projetado: 12 }
    ],

    dadosiniTab4: {
      grupos: [
        {
          nome: "Financeiro",
          subgrupos: [
            {
              nome: "Receitas",
              items: [
                { id: 1, descricao: "Venda de produtos", jan_2024: 15000, fev_2024: 2000, jan_2025: 0, fev_2025: 0, media_9_meses: 125.55, perc_projetado: 0 },
                { id: 2, descricao: "Serviços prestados", jan_2024: 15000, fev_2024: 2000, jan_2025: 0, fev_2025: 0, media_9_meses: 125.55, perc_projetado: 0 }
              ]
            },
            {
              nome: "Despesas",
              items: [
                { id: 3, descricao: "Aluguel", jan_2024: 15000, fev_2024: 2000, jan_2025: 0, fev_2025: 0, media_9_meses: 125.55, perc_projetado: 0 },
                { id: 4, descricao: "Salários", jan_2024: 15000, fev_2024: 2000, jan_2025: 0, fev_2025: 0, media_9_meses: 125.55, perc_projetado: 0 }
              ]
            }
          ]
        },
        {
          nome: "Operacional",
          subgrupos: [
            {
              nome: "Estoque",
              items: [
                { id: 5, descricao: "Matéria-prima", jan_2024: 15000, fev_2024: 2000, jan_2025: 0, fev_2025: 0, media_9_meses: 125.55, perc_projetado: 0 },
                { id: 6, descricao: "Produtos acabados", jan_2024: 15000, fev_2024: 2000, jan_2025: 0, fev_2025: 0, media_9_meses: 125.55, perc_projetado: 0 }
              ]
            }
          ]
        }
      ]
    },
    tabela1: [],
    tabela2: [],
    tabela4: []
  }),
  actions: {
    setTabela1(dados) {
      this.tabela1 = dados
    },
    setTabela2(dados) {
      this.tabela2 = dados
    },
    setTabela4(dados) {
      this.tabela4 = dados
    },

    inicializarTabelas() {
      this.tabela1 = JSON.parse(JSON.stringify(this.dadosIniciais))
      this.tabela2 = JSON.parse(JSON.stringify(this.dadosIniciais))
      this.tabela4 = JSON.parse(JSON.stringify(this.dadosiniTab4))
    }
  }
})