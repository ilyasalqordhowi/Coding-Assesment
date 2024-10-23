package controller

import (
	"coding-assesment/dtos"
	"coding-assesment/lib"
	"coding-assesment/repository"
	"fmt"

	"github.com/gin-gonic/gin"
)

func CreateTask(ctx *gin.Context) {
	
	form := dtos.Task{}
	if err := ctx.ShouldBind(&form); err != nil {
		lib.HandlerBadRequest(ctx, "Invalid input data")
		fmt.Println(err)
		return
	}


	task, err := repository.CreateTask(form)
	if err != nil {
		fmt.Println("Error saat membuat task:", err)
		lib.HandlerBadRequest(ctx, "Task not uploaded")
		return
	}

	lib.HandlerOk(ctx, "Upload Task Success!", task, nil)
}
