# Contracts Dashboard React

## Visão Geral

Este projeto é um dashboard para gerenciamento de contratos, desenvolvido utilizando React. Ele permite visualizar, adicionar, editar e excluir contratos, além de fornecer uma visão geral dos contratos existentes.

## Funcionalidades Implementadas

- Visualização de contratos
- Adição de novos contratos
- Edição de contratos existentes
- Exclusão de contratos
- Filtros e busca de contratos

## Instruções para Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/contracts-dashboard-react.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd contracts-dashboard-react
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```

## Instruções para Execução

1. Inicie o servidor de desenvolvimento e o backend:
    ```bash
    npm run dev
    nem run serve
    ```
2. Abra o navegador e acesse `http://localhost:5173`.

## Instruções para Teste

1. Execute os testes:
    ```bash
    npm test
    ```

## Decisões de Arquitetura

- **React**: Escolhido pela sua eficiência na construção de interfaces de usuário dinâmicas e reutilizáveis.
- **React Query**: Utilizado para gerenciamento de estado das requisições, facilitando a manipulação e cacheamento dos dados.
- **React Router**: Implementado para navegação entre diferentes páginas do dashboard.
- **Axios**: Utilizado para realizar requisições HTTP para a API de contratos.

## Escolhas de Bibliotecas e Ferramentas

- **Tempolabs**: Utilizado para criar as interfaces (HTML e CSS), acelerando o processo de design.
- **Windsurf com O3 mini**: Utilizado para desenvolver as lógicas e testes, garantindo a qualidade do código.
- **ShadCN**: Utilizado para componentes, fornecendo uma biblioteca de componentes reutilizáveis e estilizados.
- **Tailwind CSS**: Utilizado para estilização, permitindo um design rápido e eficiente com classes utilitárias.
- **Vitest e Testing Library**: Utilizados para testes, garantindo a qualidade e funcionalidade do código.

## Desafios Enfrentados e Soluções Aplicadas

- **Gerenciamento de Estado das Requisições**: A implementação do React Query ajudou a centralizar o estado das requisições, facilitando a manipulação e cacheamento dos dados.
- **Navegação**: A utilização do React Router simplificou a navegação entre diferentes componentes e páginas.
- **Requisições HTTP**: A escolha do Axios permitiu uma integração mais simples e eficiente com a API de contratos.

## Utilização de IA no Desenvolvimento

- **Tempolabs**: Utilizado para criar as telas (HTML e CSS), acelerando o processo de design e implementação da interface.
- **Windsurf com O3 mini**: Utilizado para desenvolver as lógicas e testes, garantindo a qualidade e funcionalidade do código de forma mais rápida e eficiente.
