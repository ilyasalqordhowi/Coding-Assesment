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

sql := `UPDATE task set (title,descriptions,date,"statusId") = ($1,$2 ,$3,$4 ) where "id" = $5 returning *`
row ,err := db.Query(context.Background(),sql,dataTask.Title,dataTask.Descriptions,dataTask.Date,dataTask.StatusId,id)

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