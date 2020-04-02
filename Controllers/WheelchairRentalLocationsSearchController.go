package Controllers

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
const bit64 = 64

type WheelchairRentalLocationsSearchController struct {
	app *Applications.WheelchairRentalLocationsSearchApplication
}

func NewWheelchairRentalLocationsSearchController(app *Applications.WheelchairRentalLocationsSearchApplication) *WheelchairRentalLocationsSearchController {
	return &WheelchairRentalLocationsSearchController{app: app}
}

func (controller *WheelchairRentalLocationsSearchController) GetAllLocations(c *gin.Context) {
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
func (controller *WheelchairRentalLocationsSearchController) GetPage(c *gin.Context) {
	rowPageId := c.Query("p")
	pageId, err := strconv.ParseUint(rowPageId, decimalNumber, bit64)
	if err != nil {
		if enum, ok := err.(*strconv.NumError); ok {
			switch enum.Err {
			case strconv.ErrRange:
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": errors.New("値が自然数で無いか大きすぎる値です{" + rowPageId + "}"),
				})
				return
			case strconv.ErrSyntax:
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": errors.New("数値に変換できませんでした{" + rowPageId + "}"),
				})
				return
			}
		}
	}
	pageData, err := controller.app.GetLocationDetail(pageId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.HTML(http.StatusOK, "detail.html", gin.H{
		"Name":              pageData.Name,
		"Address":           pageData.Address,
		"AddressSupplement": pageData.AddressSupplement,
		"PhoneNumber":       pageData.StringPhoneNumber(),
		"Email":             pageData.StringEmail(),
		"WebSiteUrl":        pageData.StringWebSiteUrl(),
		"Tag":               pageData.Tag,
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
		"locations": locations,
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
