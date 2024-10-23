package controller

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"coding-assesment/repository"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

func DeleteTask(ctx *gin.Context){
	data := dtos.Task{}
	param := ctx.Param("id")
	id,err := strconv.Atoi(param)
	
	if err != nil {
		lib.HandlerBadRequest(ctx,"Invalid not Id")
		return
	}

	deleteTask ,err := repository.DeleteTask(data,id)

	if err != nil {
		fmt.Println(err)
		lib.HandlerInternalServerError(ctx,"Failed to delete task")
		return
	}

	lib.HandlerOk(ctx, "Delete Data Task Success!",deleteTask,nil)

}