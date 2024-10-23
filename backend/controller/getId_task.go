package controller

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"coding-assesment/repository"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetIdTask(ctx *gin.Context){
	data := dtos.Task{}
	param := ctx.Param("id")
	id,err := strconv.Atoi(param)
	if err != nil {
		lib.HandlerBadRequest(ctx, "Invalid not id")
		return
	}
	
	taskId,err := repository.GetIdTask(data, id)

	if err != nil {
		lib.HandlerInternalServerError(ctx, "Failed to Get Task Id")
		return
	}
	
	lib.HandlerOk(ctx, "Get Task Id Success!",taskId,nil)
}