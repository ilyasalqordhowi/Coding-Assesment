package repository

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"context"

	"github.com/jackc/pgx/v5"
)

func GetTask(dataTask dtos.Task)([]dtos.Task,error){
db := lib.DB()
defer db.Close(context.Background())

sql := `SELECT * FROM task`
rows,err := db.Query(context.Background(),sql)

if err != nil {
	return []dtos.Task{},err
}

task ,err := pgx.CollectRows(rows,pgx.RowToStructByName[dtos.Task])

if err != nil {
	return []dtos.Task{},err
}

return task,nil

}