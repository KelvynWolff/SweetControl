# 🧁 Sweet Control

Sistema de gestão completo para confeitarias e padarias, desenvolvido como Trabalho de Conclusão de Curso (TCC) de **Engenharia de Software**.

---

## 🚀 Sobre o Projeto

O **Sweet Control** é uma solução web projetada para **automatizar e otimizar a administração de confeitarias e padarias**.  
Ele oferece:

- 📦 **Gerenciamento de produtos e insumos**  
- 📊 **Controle de estoque automatizado**  
- 🛒 **Gestão de pedidos**  
- 💰 **Geração de relatórios financeiros**  
- 🎯 **Módulo de fidelização de clientes**  

---

## 💻 Tecnologias Utilizadas

O projeto segue uma arquitetura com **backend e frontend desacoplados**.

### **Backend**
- **Node.js** — Ambiente de execução JavaScript no servidor  
- **Nest.js** — Framework para aplicações eficientes e escaláveis  
- **TypeScript** — Linguagem de programação
- **TypeORM** — ORM para comunicação com o banco de dados  

### **Frontend**
- **React.js** — Biblioteca para interfaces de usuário  
- **Axios** — Cliente HTTP para integração com a API  
- **CSS** — Estilização customizada  

### **Banco de Dados & DevOps**
- **MySQL 8.0** — Banco de dados relacional  
- **Docker** — Ambientes containerizados para desenvolvimento  

---

## ⚙️ Pré-requisitos

Antes de começar, instale:

- **Node.js**
- **Docker**
- **Git**

---

## 📦 Instalação e Execução

### 1. Clonar o Repositório
```bash
git clone https://github.com/KelvynWolff/SweetControl.git
cd SweetControl
```

### 2. Configurar o Backend
```bash
cd backend

# Criar o arquivo de variáveis de ambiente
cp .env.example .env
```
> **Importante:** Edite o arquivo `.env` com as credenciais corretas do banco de dados. Os valores padrão funcionam com o Docker Compose.

```bash
# Instalar dependências
npm install
```

### 3. Configurar o Frontend
Em um novo terminal:
```bash
cd frontend
npm install
```

---

## ▶️ Rodando a Aplicação

Será necessário **3 terminais** abertos.

### **Terminal 1 — Banco de Dados**
Na pasta raiz do projeto:
```bash
docker compose up -d
```

### **Terminal 2 — Backend**
```bash
cd backend
npm run start:dev
```
API disponível em: **[http://localhost:3000](http://localhost:3000)**

### **Terminal 3 — Frontend**
```bash
cd frontend
npm start
```
Interface disponível em: **[http://localhost:3001](http://localhost:3001)**

---

## 📂 Estrutura de Pastas

```
SweetControl/
├── backend/
├── frontend/
└── docker-compose.yml
```

---

## 👨‍💻 Autores

- **Kelvyn Luiz Wolff**  
- **Rodrigo Lodi Micali**

---