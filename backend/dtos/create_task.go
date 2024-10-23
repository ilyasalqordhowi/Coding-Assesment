package dtos

type Task struct{
	Id int
	Title string`json:"title" db:"title" form:"title"`
	Descriptions string`json:"descriptions" db:"descriptions" form:"descriptions"`
	StatusId int`json:"statusId" db:"statusId" form:"statusId"`
}