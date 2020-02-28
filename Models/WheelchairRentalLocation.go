package Models

import "database/sql"

type WheelchairRentalLocation struct {
	LocationId        uint64
	Name              string          // 場所の名前
	Location          *Point          // 緯度経度
	AddressSupplement string          // 建物の２階の受付
	Address           string          // 住所
	PhoneNumber       *sql.NullString // 電話番号
	Email             *sql.NullString // メールアドレス
	WebSiteUrl        *sql.NullString // webサイト
}

func NewWheelchairRentalLocation() *WheelchairRentalLocation {
	return &WheelchairRentalLocation{
		LocationId:        0,
		Name:              "",
		Location:          &Point{},
		AddressSupplement: "",
		Address:           "",
		PhoneNumber:       &sql.NullString{},
		Email:             &sql.NullString{},
		WebSiteUrl:        &sql.NullString{},
	}
}
