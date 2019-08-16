# Projeto Aplicativo Controle Financeiro

Aplicação para controle de despesas domésticas

## Implementação

1. Banco de dados Postgre em container docker
2. Servidor criado com express
3. Backend que expõe APIs REST sendo implementado em padrão MVC
   3.1. Controller para manutenção de bancos (list/store/show/update/activate)
   3.2. Controller para manutenção de métodos de pagamento (list/show/store/update/activate)
   3.3. Controller para manutenção de despesas (list/show/store/update/)
   3.4. Controller para manutenção de pagamentos (list/monthReport) (restante em desenvolvimento)
