# Pokémon Challenge API

API RESTful para gerenciar Times de Pokémon criados por Treinadores, desenvolvida com NestJS e integração com a PokéAPI.

## Status do Projeto

**Este projeto está INCOMPLETO por conta de limitações técnicas do ambiente de desenvolvimento. Desenvolvido em poucas horas**

### Problemas Identificados:
- **Docker não disponível**: Não foi possível ativar a virtualização no computador, impedindo a execução do Docker
- **Banco de dados**: Sem Docker, não foi possível configurar o PostgreSQL
- **Testes de integração**: Impossível testar a funcionalidade completa da API
- **Injeção de dependência**: Problemas de configuração nos módulos NestJS

### O que foi implementado:
- **Arquitetura completa**: Todas as camadas implementadas (Controllers, Services, Repositories)
- **Entidades e relacionamentos**: Modelagem correta do banco de dados
- **DTOs e validações**: Validação completa com class-validator
- **Integração PokéAPI**: Serviço completo para interação com API externa
- **Documentação Swagger**: Documentação completa da API
- **Regras de negócio**: Limite de 6 Pokémon por time, assim como no Pokémon TCG.

## Tecnologias Utilizadas

- **Framework**: NestJS
- **Banco de Dados**: PostgreSQL (configurado mas não testado)
- **ORM**: TypeORM
- **Validação**: class-validator e class-transformer
- **Documentação**: Swagger/OpenAPI
- **Containerização**: Docker e Docker Compose (não funcionou)

## Funcionalidades Implementadas

### Treinadores (Trainers)
- ✅ CRUD para treinadores
- ✅ Campos: id, nome, cidadeOrigem (opcional)
- ✅ Validação de dados de entrada com class-validator

### Times (Teams)
- ✅ CRUD para times
- ✅ Relacionamento 1:N com treinadores
- ✅ Campos: id, nomeDoTime, treinadorId
- ✅ Listagem por treinador específico

### Pokémon dos Times (Team Pokemon)
- ✅ Adicionar Pokémon ao time (máximo 6 por time)
- ✅ Remover Pokémon do time
- ✅ Listar Pokémon do time com detalhes da PokéAPI
- ✅ Validação de existência do Pokémon na PokéAPI
- ✅ Enriquecimento de dados com informações da PokéAPI

### Integração com PokéAPI
- ✅ Validação de existência de Pokémon
- ✅ Busca de detalhes (nome, tipos, sprite, altura, peso)
- ✅ Tratamento de erros de API externa

## Arquitetura Implementada

A aplicação segue o padrão de arquitetura em camadas do NestJS:

Controllers: recebem requisições HTTP, validam DTOs
Services: lógica de negócio, coordenação entre camadas
Repositories: acesso a dados, operações de banco
Entities: modelos de dados, mapeamento ORM

### Estrutura de Relacionamentos

Trainer (id, nome, cidadeOrigem) -> Team (id, nomeDoTime, treinadorID) -> TeamPokemon (id, timeId, pokemonIdOuNome)

## 🔗 Endpoints Implementados

### Treinadores
- `GET /trainers` - Lista todos os treinadores
- `GET /trainers/:id` - Busca treinador por ID
- `POST /trainers` - Cria novo treinador
- `PUT /trainers/:id` - Atualiza treinador
- `DELETE /trainers/:id` - Deleta treinador

### Times
- `GET /teams` - Lista todos os times
- `GET /teams?trainerId=:id` - Listar times de um treinador
- `GET /teams/:id` - Busca time por ID
- `POST /teams` - Cria novo time
- `PUT /teams/:id` - Atualiza time
- `DELETE /teams/:id` - Deleta time

### Pokémon dos Times
- `GET /teams/:teamId/pokemons` - Lista Pokémon do time
- `POST /teams/:teamId/pokemons` - Adiciona Pokémon ao time
- `DELETE /teams/:teamId/pokemons/:pokemonIdOuNome` - Remove Pokémon do time

### Pokémon (PokéAPI)
- `GET /pokemons/:pokemonIdOuNome` - Busca detalhes de um Pokémon

## Validação com class-validator

O class-validator é um sistema de validação declarativa que usa decorators para validar dados:

```typescript
export class CreateTrainerDto {
  @IsString()                    // Deve ser string
  @IsNotEmpty()                  // Não pode ser vazio
  @MaxLength(100)                // Máximo 100 caracteres
  nome: string;

  @IsOptional()                  // Campo opcional
  @IsString()                    // Se preenchido, deve ser string
  @MaxLength(100)                // Máximo 100 caracteres
  cidadeOrigem?: string;
}
```

### Decorators utilizados:

- `@IsString()`: Valida se é string
- `@IsNotEmpty()`: Não pode ser vazio
- `@IsOptional()`: Campo opcional
- `@MaxLength(n)`: Limite de caracteres
- `@IsNumber()`: Valida se é número

### Configuração global no main.ts:

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,              // Remove propriedades não definidas no DTO
  forbidNonWhitelisted: true,   // Rejeita propriedades extras
  transform: true,              // Converte tipos automaticamente
}));
```

## Validação da PokéAPI

### A validação antes de adicionar Pokémon:

1. **Verificação de existência**: Antes de adicionar um Pokémon ao time, o sistema consulta a PokéAPI para verificar se o Pokémon existe
2. **Validação de dados**: Se o Pokémon existir, busca os detalhes completos
3. **Tratamento de erro**: Se não existir, retorna erro apropriado

### Endpoints de validação implementados:

- **POST /teams/:teamId/pokemons**: Valida existência antes de adicionar
- **GET /teams/:teamId/pokemons**: Enriquece dados com informações da PokéAPI
- **DELETE /teams/:teamId/pokemons/:pokemonIdOuNome**: Remove Pokémon do time

## Documentação Swagger

A documentação Swagger está configurada em `main.ts` e gera automaticamente:

- **Interface interativa**: Para testar todos os endpoints
- **Documentação de DTOs**: Campos obrigatórios e opcionais
- **Exemplos de requisição**: Payloads de exemplo
- **Códigos de resposta**: Status codes e mensagens de erro
- **Tags organizadas**: Treinadores, Times, Pokémon dos Times, Pokémon

### Acesso à documentação:
- **URL**: `http://localhost:3000/api` (quando a aplicação estiver rodando)

## Como Executar (Quando Docker Estiver Disponível)

1. **Instalar Docker Desktop**
2. **Executar**: `docker-compose up -d`
3. **Instalar dependências**: `npm install`
4. **Executar aplicação**: `npm run start:dev`
5. **Acessar Swagger**: `http://localhost:3000/api`

## Exemplos de Uso

### Criar um treinador
```bash
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ash Ketchum", "cidadeOrigem": "Pallet Town"}'
```

### Criar um time
```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"nomeDoTime": "Time do Ash", "treinadorId": 1}'
```

### Adicionar Pokémon ao time
```bash
curl -X POST http://localhost:3000/teams/1/pokemons \
  -H "Content-Type: application/json" \
  -d '{"pokemonIdOuNome": "pikachu"}'
```

### Listar Pokémon do time
```bash
curl http://localhost:3000/teams/1/pokemons
```

**Limitação**: Impossibilidade de testar a execução devido a problemas de ambiente (Docker).

---

**Desenvolvido para o Desafio Técnico - Estagiário Backend Leany**
