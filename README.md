# Projeto Aplicativo Controle Financeiro

Aplicação para controle de despesas domésticas

## Implementação

1. Banco de dados Postgre em container docker
2. Servidor criado com express
3. Backend que expõe APIs REST sendo implementado em padrão MVC
   1. Controller para manutenção de bancos
      1. Listar Bancos cadastrados
      2. Exibir banco
      3. Cadastrar banco
      4. Atualizar banco
      5. Ativar/Inativar banco
   2. Controller para manutenção de métodos de pagamento
      1. Listar métodos de pagamento
      2. Exibir método de pagamento
      3. Armazenar método de pagamento
      4. Atualizar método de pagamento
      5. Ativar/Inativar método de pagamento
   3. Controller para manutenção de despesas (list/show/store/update/)
      1. Listar despesas (com ou sem filtro para active)
      2. Exibir despesa
      3. Armazenar despesa
      4. Atualizar despesa
      5. Ativar/Inativar despesa
   4. Controller para manutenção de pagamentos (list/monthReport/store/update/delete/patch)
      1. Listar pagamentos (com ou sem filtro)
      2. Exibir report mensal
      3. Cadastrar pagamento
      4. Atualizar pagamento
      5. Excluir pagamento
      6. Consumir valor
