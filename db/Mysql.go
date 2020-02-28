package Infrastructure

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/swkoubou/Hack_U_App/Models"
	"os"
	"strconv"
	"strings"
	"unicode/utf8"
)

// IDatabaseServiceの実装
type Mysql struct {
	db *sql.DB
}

const decimalNumber = 10

func NewMysql() *Mysql {
	mysqlUser := os.Getenv("HACK_U_App_MYSQL_USER")
	if utf8.RuneCountInString(mysqlUser) == 0 {
		panic("環境変数が読み込めませんでした:" + mysqlUser)
	}
	mysqlPassword := os.Getenv("HACK_U_App_MYSQL_PASSWORD")
	if utf8.RuneCountInString(mysqlPassword) == 0 {
		panic("環境変数が読み込めませんでした:" + mysqlPassword)
	}
	mysqlHost := os.Getenv("HACK_U_App_MYSQL_HOST")
	if utf8.RuneCountInString(mysqlPassword) == 0 {
		panic("環境変数が読み込めませんでした:" + mysqlLocal)
	}
	src := fmt.Sprintf("%s:%s@tcp(%s:3306)/hack_u_db", mysqlUser, mysqlPassword, mysqlHost)
	db, err := sql.Open("mysql", src)
	if err != nil {
		panic(err)
	}
	return &Mysql{db: db}
}

// 北西 南東
func (mysql *Mysql) FindAllLocation() (locations []*Models.WheelchairRentalLocation, err error) {
	query := `SELECT location_id, name, x(location), y(location), address_supplement, address, phone_number, email, web_site_url
	FROM wheelchair_rental_Locations;`
	stmt, err := mysql.db.Prepare(query)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	rows, err := stmt.Query()
	defer rows.Close()
	for rows.Next() {
		location := Models.NewWheelchairRentalLocation()
		err := rows.Scan(
			&location.LocationId,
			&location.Name,
			&location.Location.Lng,
			&location.Location.Lat,
			&location.AddressSupplement,
			&location.Address,
			&location.PhoneNumber,
			&location.Email,
			&location.WebSiteUrl)
		if err != nil {
			return nil, err
		}
		locations = append(locations, location)
	}

	if err != nil {
		return nil, err
	}
	return locations, nil
}

func (mysql *Mysql) FindTags(tagIds []uint64) (locations []*Models.WheelchairRentalLocation, err error) {
	query := `SELECT distinct wheelchair_rental_Locations.location_id, name, x(location), y(location), address_supplement, address, phone_number, email, web_site_url
FROM wheelchair_rental_Locations
         JOIN wheelchair_rental_Locations_tag ON wheelchair_rental_Locations.Location_id = wheelchair_rental_Locations_tag.Location_id
         JOIN tag ON tag.tag_id = wheelchair_rental_Locations_tag.tag_id
WHERE tag.tag_id IN (?);`
	stmt, err := mysql.db.Prepare(query)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	rows, err := stmt.Query(tagQueryBuilder(tagIds))
	defer rows.Close()
	for rows.Next() {
		location := Models.NewWheelchairRentalLocation()
		err := rows.Scan(
			&location.LocationId,
			&location.Name,
			&location.Location.Lng,
			&location.Location.Lat,
			&location.AddressSupplement,
			&location.Address,
			&location.PhoneNumber,
			&location.Email,
			&location.WebSiteUrl)
		if err != nil {
			return nil, err
		}
		locations = append(locations, location)
	}

	if err != nil {
		return nil, err
	}
	return locations, nil
}

func (mysql *Mysql) FindAllTags() (tags []*Models.Tag, err error) {
	query := `SELECT * FROM tag`
	stmt, err := mysql.db.Prepare(query)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	rows, err := stmt.Query()
	defer rows.Close()
	for rows.Next() {
		tag := Models.NewTag()
		err := rows.Scan(
			&tag.TagId,
			&tag.Name)
		if err != nil {
			return nil, err
		}
		tags = append(tags, tag)
	}
	return tags, nil
}

func tagQueryBuilder(tagIds []uint64) (tagQuery string) {
	var sTagIds []string
	for _, tag := range tagIds {
		sTagIds = append(sTagIds, strconv.FormatUint(tag, decimalNumber))
	}
	return strings.Join(sTagIds, ",")
}
