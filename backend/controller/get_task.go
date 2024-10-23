package controller

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"coding-assesment/repository"

	"github.com/gin-gonic/gin"
)

func GetTask(ctx *gin.Context){
	data := dtos.Task{}
	task,err := repository.GetTask(data)

	if err != nil {
		lib.HandlerBadRequest(ctx,"Invalid to Get")
		return
	}

	lib.HandlerOk(ctx,"Get Data Task Success!",task,nil)
}