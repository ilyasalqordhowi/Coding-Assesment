# GETTING STARTED FRONTEND

## 1. Clone the repository:

```bash
git clone https://github.com/ilyasalqordhowi/Coding-Assesment.git
cd <frontend>
```

## 2. Run the program in VSCode:

```sh
code .
```

## 3. Install dependencies:

npm install

## 4. Run the program:

```sh
  npm run dev
```

# Config / installation process BACKEND

## 1. Clone this repository

```sh
  git clone https://github.com/ilyasalqordhowi/Coding-Assesment.git
  cd <backend>
```

## 2. Open in VSCode

```sh
  code .
```

## 3. Install all the dependencies

```sh
  go mod tidy
```

## 4. Run the program

```sh
  go run main.go
```

| Parameter         | Type     | Description                           |
| :---------------- | :------- | :------------------------------------ |
| `task/get`        | `GET`    | `Get a list of tasks data`            |
| `task/:id`        | `GET`    | `Select task data according to ID`    |
| `task/create`     | `POST`   | `Create new task data`                |
| `task/put/:id`    | `PUT`    | `Edit selected task data by id`       |
| `task/delete/:id` | `DELETE` | `Remove the selected task data by id` |
| `task/status`     | `GET`    | `Get a list of status task`           |
