
### Nombre del Proyecto

ESLIA

### Descripción del Proyecto

Permite generar hojas de vocabularios y ejercicios interactivos usando el SDK de vercel con OpenAI GPT 4.0 mini para estudiantes de ESL(English as a second langauge) basado en la dificultad y tema seleccionado por el usuario

![image](https://github.com/user-attachments/assets/77f1c080-22d1-4e19-a436-117c81012a4b)

Hojas de ejercicios
![image](https://github.com/user-attachments/assets/c5449aba-0219-4b45-8e7a-bafcf0aee7ba)
Vocabulario 
![image](https://github.com/user-attachments/assets/2f0cbb8a-911a-4c31-aaa3-476ec60a252e)
Ejercicios tipo 1
![image](https://github.com/user-attachments/assets/3d57c8f3-571e-4403-8f1b-2ce2419ed4e5)
Ejercicios tipo 2
![image](https://github.com/user-attachments/assets/c04a986f-b0d0-4d7c-a1bb-1159096ebaef)


### Repositorio de Código

https://github.com/latinrev/ESLIA

### Proyecto desplegado

https://www.esliafacil.com/

### Instrucciones de Configuración

Para ejecutarlo se requiere un archivo .env.local
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
OPENAI_API_KEY
```

Para crear la base de datos se debe crear un nuevo proyecto en supabase y  tener el Supabase CLI instalado luego correr el siguiente comando desde el root del proyecto 
`supabase db push --db-url "YOUR_DATABASE_CONNECTION_STRING" schema.sql` -- Ejecuta todas las migraciones

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el proyecto

