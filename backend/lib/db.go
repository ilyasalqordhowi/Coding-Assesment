package lib

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

func DB() *pgx.Conn {
	conn, err := pgx.Connect(
		context.Background(),
		"postgresql://postgres:1@localhost:5432/coding_assesment?sslmode=disable",
	)
	if err != nil {
		fmt.Println(err)
	}
	return conn 
}