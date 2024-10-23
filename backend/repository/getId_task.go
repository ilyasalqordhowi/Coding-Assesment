package repository

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"context"

	"github.com/jackc/pgx/v5"
)

func GetIdTask(dataTask dtos.Task,id int)(dtos.Task ,error){
db := lib.DB()

defer db.Close(context.Background())

sql := `SELECT * FROM task WHERE "id" =$1`
row ,err := db.Query(context.Background(),sql,id)

if err != nil {
	return dtos.Task{},err
}

task ,err := pgx.CollectOneRow(row ,pgx.RowToStructByName[dtos.Task])

if err != nil {
	return dtos.Task{},err
}

return task , nil

}