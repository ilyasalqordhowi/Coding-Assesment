package dtos

type Task struct{
	Id int`json:"id"`
	Title string`json:"title" db:"title" form:"title"`
	Descriptions string`json:"descriptions" db:"descriptions" form:"descriptions"`
	Date string`json:"date" db:"date" form:"date"`
	StatusId int`json:"statusId" db:"statusId" form:"statusId"`
}