package lib

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandlerOk (c *gin.Context, message string, TotalInfo any, data any) {
	c.JSON(http.StatusOK, Message{
		Success: true,
		Message: message,
		ResultsInfo: TotalInfo,
		Results: data,
	})
}


func HandlerNotFound (c *gin.Context, message string) {
	c.JSON(http.StatusNotFound, Message{
		Success: false,
		Message: message,
	})
}

func HandlerBadRequest (c *gin.Context, message string) {
	c.JSON(http.StatusBadRequest, Message{
		Success: false,
		Message: message,
	})
}
	func HandlerInternalServerError (c *gin.Context, message string) {
		c.JSON(http.StatusInternalServerError, Message{
			Success: false,
			Message: message,
		})
}
