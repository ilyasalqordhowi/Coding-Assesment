package controller

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"coding-assesment/repository"

	"github.com/gin-gonic/gin"
)

func GetTaskStatus(ctx *gin.Context){
	data := dtos.StatusTask{}
	task,err := repository.GetTaskStatus(data)

	if err != nil {
		lib.HandlerBadRequest(ctx,"Invalid to Get")
		return
	}

	lib.HandlerOk(ctx,"Get Data Task Success!",task,nil)
}