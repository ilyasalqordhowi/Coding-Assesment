package controller

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"coding-assesment/repository"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

func PutTask(ctx *gin.Context){
	param := ctx.Param("id")
	id, err := strconv.Atoi(param)
	if err != nil {
		lib.HandlerBadRequest(ctx,"invaild task Id")
	}
	
	data := dtos.Task{}
	if err := ctx.ShouldBind(&data); err != nil {
		lib.HandlerBadRequest(ctx,"Invaild Request Body")
		return
	}
	
	update ,err := repository.PutTask(data,id)
	
	if err != nil {
		fmt.Println(err)
		lib.HandlerInternalServerError(ctx,"Failed to update task")
		return
	}
		lib.HandlerOk(ctx,"Update Task Success!",update,nil)
}