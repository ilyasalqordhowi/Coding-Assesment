package router

import (
	"coding-assesment/controller"

	"github.com/gin-gonic/gin"
)

func RouterTask(rg *gin.RouterGroup){
rg.POST("/create",controller.CreateTask)
rg.GET("/get",controller.GetTask)
rg.PUT("/put/:id",controller.PutTask)
rg.GET("/get/:id",controller.GetIdTask)
rg.DELETE("/delete/:id",controller.DeleteTask)
rg.GET("/get/status",controller.GetTaskStatus)
}