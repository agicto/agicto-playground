## View Demo

Open [https://agicto.com/playground/](https://agicto.com/playground/)

![CleanShot 2024-06-10 at 13 57 20@2x](https://github.com/agicto/agicto-playground/assets/9738969/df890020-a950-4bac-9468-e75d1570dfc4)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Run Docker
```
docker build . -t agicto/agicto-playground:latest
docker run --name agicto-playground -d -p 8890:8890  agicto/agicto-playground:latest
```
Open [http://localhost:8890](http://localhost:8890) with your browser to see the result.


## Run Docker-compose
```
docker-compose up -d

```
