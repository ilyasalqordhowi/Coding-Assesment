package repository

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

func DeleteTask(dataTask dtos.Task, id int)([]dtos.Task, error){
db := lib.DB()

defer db.Close(context.Background())

sql := `DELETE  FROM task WHERE "id" = $1 returning *`

row, err := db.Query(context.Background(),sql,id)

if err != nil {
	return []dtos.Task{},err
}

task, err := pgx.CollectRows(row, pgx.RowToStructByName[dtos.Task])

if err != nil {
	fmt.Println(err)
	return []dtos.Task{},err
}

return task,nil
}