# Frontend Web

This is the frontend web application built with Vite and React.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run dev

# build for production
$ npm run build

# preview the production build
$ npm run preview
```

## Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:

    ```bash
    docker build -t frontweb .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 5174:5174 frontweb
    ```

## Tailwind CSS

This project uses Tailwind CSS for styling. To configure Tailwind, edit the `tailwind.config.js` file.

## PostCSS

This project uses PostCSS for processing CSS. To configure PostCSS, edit the `postcss.config.js` file.

## License

This project is [MIT licensed](LICENSE).