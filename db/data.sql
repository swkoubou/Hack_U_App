USE hack_u_db;
INSERT INTO WheelchairRentalLocations (name, location, address_supplement, address, phone_number, email, web_site_url)
VALUES ( 'hogehoge', POINT(36.3132613, 140.5670455), '2階の受付', '茨城県東茨城郡大洗町磯浜町'
       , NULL, 'hogehoge@aaamaile.com', NULL),
       ( 'niconico', POINT(35.7315028, 139.6422717), '1階カスタマーセンター', '東京都豊島区南池袋'
       , NULL, NULL, 'https://www.nicovideo.jp/'),
       ( 'docodoco', POINT(25.896408, 122.6403625), '3階', '沖縄県'
       , 08012775566, NULL, NULL);

INSERT INTO tag (tag_name)
VALUES ('無料'),
       ('1日限定'),
       ('長期貸出対応');


INSERT INTO map_tag (Location_id, tag_id)
VALUES (1, 2),
       (2, 2),
       (1, 3),
       (3, 1);
