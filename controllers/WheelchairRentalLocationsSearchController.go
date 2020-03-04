package controllers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/swkoubou/Hack_U_App/Applications"
	"net/http"
	"strconv"
	"strings"
)

const decimalNumber = 10
const bit32 = 32

type WheelchairRentalLocationsSearchController struct {
	app *Applications.WheelchairRentalLocationsSearchApplication
}

func NewWheelchairRentalLocationsSearchController(app *Applications.WheelchairRentalLocationsSearchApplication) *WheelchairRentalLocationsSearchController {
	return &WheelchairRentalLocationsSearchController{app: app}
}

func (controller *WheelchairRentalLocationsSearchController) SearchRange(c *gin.Context) {
	locations, err := controller.app.GetAllLocation()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"locations": locations,
	})
}

func (controller *WheelchairRentalLocationsSearchController) SearchTags(c *gin.Context) {
	tags, err := purseTags(c.Query("tags"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	locations, err := controller.app.SearchTag(tags)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"location": locations,
	})

}

func (controller *WheelchairRentalLocationsSearchController) GetAllTags(c *gin.Context) {
	tags, err := controller.app.GetAllTags()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"tags": tags,
	})
}

func purseTags(TagIdsQuery string) (TagIds []uint64, err error) {
	rowTagIds := strings.Split(TagIdsQuery, ",")
	for _, rowTagId := range rowTagIds {
		tagId, err := strconv.ParseUint(rowTagId, decimalNumber, bit32)
		if err != nil {
			if enum, ok := err.(*strconv.NumError); ok {
				switch enum.Err {
				case strconv.ErrRange:
					return nil, errors.New("値が自然数で無いか大きすぎる値です{" + rowTagId + "}")
				case strconv.ErrSyntax:
					return nil, errors.New("数値に変換できませんでした{" + rowTagId + "}")
				}
			}
		}
		TagIds = append(TagIds, tagId)
	}
	return TagIds, nil
}
