# Migration `20200824205404`

This migration has been generated by José Lugo at 8/24/2020, 3:54:04 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Link" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" text   NOT NULL ,
"url" text   NOT NULL ,
"postedById" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"name" text   NOT NULL ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Vote" (
"id" SERIAL,
"linkId" integer   NOT NULL ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "Vote.linkId_userId_unique" ON "public"."Vote"("linkId", "userId")

ALTER TABLE "public"."Link" ADD FOREIGN KEY ("postedById")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("linkId")REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200824204758..20200824205404
--- datamodel.dml
+++ datamodel.dml
@@ -4,35 +4,35 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Link {
   id          Int      @default(autoincrement()) @id
   createdAt   DateTime @default(now())
   description String
   url         String
   postedById  Int?
-  User        User?    @relation(fields: [postedById], references: [id])
-  Vote        Vote[]
+  user        User?    @relation(fields: [postedById], references: [id])
+  vote        Vote[]
 }
 model User {
   id       Int    @default(autoincrement()) @id
   name     String
   email    String @unique
   password String
-  Link     Link[]
-  Vote     Vote[]
+  link     Link[]
+  vote     Vote[]
 }
 model Vote {
   id     Int  @default(autoincrement()) @id
   linkId Int
   userId Int
-  Link   Link @relation(fields: [linkId], references: [id])
-  User   User @relation(fields: [userId], references: [id])
+  link   Link @relation(fields: [linkId], references: [id])
+  user   User @relation(fields: [userId], references: [id])
   @@unique([linkId, userId], name: "Vote.linkId_userId_unique")
 }
```


