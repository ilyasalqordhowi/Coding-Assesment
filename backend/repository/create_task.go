package repository

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"context"

	"github.com/jackc/pgx/v5"
)


func CreateTask(dataTask dtos.Task)(dtos.Task,error){
db := lib.DB()
defer db.Close(context.Background())

sql := `INSERT INTO task ("title","descriptions","date","statusId") VALUES ($1,$2,$3,$4) RETURNING *`
row,err := db.Query(context.Background(),sql,dataTask.Title,dataTask.Descriptions,dataTask.Date,dataTask.StatusId)

if err != nil {
	return dtos.Task{},err
}

task, err := pgx.CollectOneRow(row,pgx.RowToStructByName[dtos.Task])

if err != nil {
	return dtos.Task{},err
}

return task ,nil

}