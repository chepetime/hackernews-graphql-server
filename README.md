# Hackernews Node GraphQL

## Tech Stack

- `graphql-yoga` (Fully-featured GraphQL server)
- `prisma` (Open source database toolkit)
- `SQLite` (Self-contained, serverless, zero-configuration, transactional SQL database engine)

## Database

This is the typical workflow you will follow when updating your data:

1. Manually adjust your Prisma data model.

```sh
code prisma/schema.prisma
```

2. Migrate your database using the `prisma migrate` CLI commands we covered.

```sh
npx prisma migrate save --experimental
npx prisma migrate up --experimental
```

3. (Re-)generate Prisma Client

```sh
npx prisma generate
```

4. Use Prisma Client in your application code to access your database.

```js
// ...
await prisma.
```
