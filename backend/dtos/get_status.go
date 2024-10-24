package dtos

type StatusTask struct{
	Id int`json:"id"`
	Status string`json:"status" db:"status" form:"status"`
}