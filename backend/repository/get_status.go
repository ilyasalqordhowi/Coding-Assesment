package repository

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"context"

	"github.com/jackc/pgx/v5"
)

func GetTaskStatus(dataTask dtos.StatusTask)([]dtos.StatusTask,error){
db := lib.DB()
defer db.Close(context.Background())

sql := `SELECT * FROM status_task`
rows,err := db.Query(context.Background(),sql)

if err != nil {
	return []dtos.StatusTask{},err
}

task ,err := pgx.CollectRows(rows,pgx.RowToStructByName[dtos.StatusTask])

if err != nil {
	return []dtos.StatusTask{},err
}

return task,nil

}