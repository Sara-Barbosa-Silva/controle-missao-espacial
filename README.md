# Controle de Missão Espacial

Projeto desenvolvido para a disciplina **Advanced Programming And Mobile Dev**.

## Descrição

O projeto Controle de Missão Espacial é uma solução integrada para monitoramento de uma missão espacial, composta por um backend em Java com Spring Boot e um aplicativo mobile em React Native com TypeScript

O sistema permite cadastrar, visualizar e gerenciar:

* Sensores da missão
* Sistemas monitorados
* Alertas
* Painel geral de gerenciamento da missão

A aplicação mobile consome a API do backend utilizando Axios, permitindo visualizar dados salvos no banco H2 e enviar novas informações por meio de requisições HTTP.

## Integrantes

* Agatha Cassari Benedicto - RM 556251
* Gustavo Shinn Shyong Cheng - RM 559084
* Sara Barbosa da Silva - RM 559042

## Tecnologias Utilizadas

### Backend

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* H2 Database
* Lombok
* Maven

### Mobile

* React Native
* Expo
* TypeScript
* Axios
* React Navigation

## Estrutura do Projeto

```txt
controle-missao-espacial/
├── backend-missao/
│   ├── src/
│   ├── pom.xml
│   └── ...
├── mobile-missao/
│   ├── src/
│   ├── App.tsx
│   ├── package.json
│   └── ...
├── data/
│   └── missao_db.mv.db
└── README.md
```

## Funcionalidades Implementadas

### Backend

* API REST desenvolvida com Spring Boot
* Arquitetura em camadas:

  * Model
  * Repository
  * Service
  * Controller
* Banco H2 em modo file
* Entidades principais:

  * Sensor
  * SistemaMonitorado
  * AlertaCritico
* Endpoints para cadastro, consulta e atualização de dados
* Configuração de CORS para permitir integração com o frontend

### Mobile

* Navegação entre telas com React Navigation
* Tela inicial com tema espacial
* Tela de gerenciamento da missão
* Listagem de sensores
* Cadastro de sensores
* Edição completa de sensores
* Atualização da leitura atual de sensores
* Geração automática de alertas com base nos limites dos sensores
* Listagem de sistemas monitorados
* Cadastro de sistemas monitorados
* Alteração de status dos sistemas
* Geração automática de alertas ao marcar sistemas como atenção ou crítico

## Regras de Negócio

### Sensores

Cada sensor possui:

* Nome
* Tipo
* Unidade de medida
* Valor atual
* Limite de atenção
* Limite crítico
* Status ativo/inativo

A classificação da leitura funciona da seguinte forma:

```txt
Valor atual abaixo do limite de atenção → Normal
Valor atual maior ou igual ao limite de atenção → Atenção
Valor atual maior ou igual ao limite crítico → Crítico
```

Quando a leitura de um sensor é atualizada pelo aplicativo:

* Se estiver normal, apenas atualiza o sensor
* Se estiver em atenção, gera um alerta de nível alto
* Se estiver crítica, gera um alerta crítico

### Sistemas Monitorados

Cada sistema possui:

* Nome
* Descrição
* Status
* Ativo/inativo

Os status disponíveis são:

```txt
operacional
atencao
critico
inativo
```

Quando um sistema é marcado como:

* **Atenção**: é gerado um alerta de nível alto
* **Crítico**: é gerado um alerta crítico
* **Operacional ou Inativo**: apenas atualiza o status do sistema

### Alertas

Os alertas são gerados automaticamente a partir de:

* Leitura de sensor em atenção
* Leitura de sensor crítica
* Sistema monitorado em atenção
* Sistema monitorado crítico

Cada alerta possui:

* Título
* Descrição
* Nível
* Status
* Data e hora

## Endpoints da API

```txt
GET  
POST 
PUT  
```


## Banco de Dados H2

O projeto utiliza o banco H2 em modo file, permitindo manter os dados salvos localmente.

Console H2:

```txt
http://localhost:8080/h2-console
```

Configuração:

```txt
JDBC URL: jdbc:h2:file:./data/missao_db
User Name: sa
Password:
```

A senha deve ficar vazia.

## Como Executar o Backend

Entre na pasta do backend:

```bash
cd backend-missao
```

Execute o projeto pela IDE ou rode a classe principal:

```txt
BackendMissaoApplication.java
```

O backend será iniciado em:

```txt
http://localhost:8080
```

## Como Executar o Mobile

Entre na pasta do mobile:

```bash
cd mobile-missao
```

Instale as dependências:

```bash
npm install
```

Execute o app:

```bash
npm start
```

Para abrir no navegador, pressione:

```txt
w
```

## Integração Frontend e Backend

O frontend se comunica com o backend por meio do Axios.

A configuração da URL base da API está em:

```txt
mobile-missao/src/services/api.ts
```

Configuração utilizada:

```ts
baseURL: "http://localhost:8080"
```

Caso o app seja testado em um celular físico com Expo Go, é necessário substituir `localhost` pelo IP da máquina na mesma rede.

## Telas do Aplicativo

O aplicativo possui as seguintes telas:

* Home
* Gerenciamento da Missão
* Sensores
* Cadastro de Sensor
* Edição de Sensor
* Sistemas Monitorados
* Cadastro de Sistema
* Alertas

## Fluxo Principal do Sistema

```txt
Sensor cadastrado
↓
Leitura do sensor é atualizada
↓
Sistema compara valor atual com limites cadastrados
↓
Se ultrapassar limite de atenção ou crítico
↓
Alerta é gerado automaticamente
```

```txt
Sistema monitorado cadastrado
↓
Status do sistema é alterado
↓
Se o status for atenção ou crítico
↓
Alerta é gerado automaticamente
```
## Demonstração 



https://github.com/user-attachments/assets/108b91e9-1708-484b-ace7-4dadd6fb5d0a



