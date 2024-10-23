package router

import "github.com/gin-gonic/gin"
func RouterCombine(r *gin.Engine){	
RouterTask(r.Group("/task"))
}