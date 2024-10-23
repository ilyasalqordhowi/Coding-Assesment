package repository

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

func PutTask(dataTask dtos.Task, id int)(dtos.Task,error){
db := lib.DB()

defer db.Close(context.Background())

sql := `UPDATE task set (title,descriptions,"statusId") = ($1,$2 ,$3 ) where "id" = $4 returning *`
row ,err := db.Query(context.Background(),sql,dataTask.Title,dataTask.Descriptions,dataTask.StatusId,id)

if err != nil {
	return dtos.Task{},err
}

task ,err := pgx.CollectOneRow(row ,pgx.RowToStructByName[dtos.Task])

if err != nil {
	fmt.Println(err)
	return dtos.Task{},err
}

return task,nil

}