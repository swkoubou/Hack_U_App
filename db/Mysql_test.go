package db

import (
	"fmt"
	"github.com/swkoubou/Hack_U_App/Models"
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

func TestMysql_FindOneLocation(t *testing.T) {
	database := NewMysql()
	defer database.db.Close()
	location, err := database.FindOneLocation(1)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%v\n", location)
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

func TestMysql_FindTag(t *testing.T) {
	database := NewMysql()
	defer database.db.Close()
	location := Models.NewWheelchairRentalLocation()
	location.LocationId = 1
	result, err := database.FindTag(location)
	if err != nil {
		panic(err)
	}
	fmt.Println(len(result))
	for _, location := range result {
		fmt.Printf("%v\n", location)
	}
}
