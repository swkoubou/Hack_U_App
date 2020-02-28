package Infrastructure

import (
	"fmt"
	"testing"
)

func TestNewMysql(t *testing.T) {
	NewMysql()
}

func TestMysql_FindRange(t *testing.T) {

	database := NewMysql()
	defer database.db.Close()
	result, err := database.FindAllLocation()
	if err != nil {
		panic(err)
	}
	fmt.Println(len(result))
	for _, location := range result {
		fmt.Printf("%v\n", location)
	}
}

func TestMysql_FindTags(t *testing.T) {
	database := NewMysql()
	defer database.db.Close()

	result, err := database.FindTags([]uint64{2, 3})
	if err != nil {
		panic(err)
	}
	fmt.Println(len(result))
	for _, location := range result {
		fmt.Printf("%v\n", location)
	}
}

func TestMysql_FindAllTags(t *testing.T) {
	database := NewMysql()
	defer database.db.Close()

	result, err := database.FindAllTags()
	if err != nil {
		panic(err)
	}
	fmt.Println(len(result))
	for _, location := range result {
		fmt.Printf("%v\n", location)
	}
}
