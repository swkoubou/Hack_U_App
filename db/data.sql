USE hack_u_db;
insert into wheelchair_rental_Locations (name, location, address_supplement, address, phone_number, email, web_site_url)
values ( 'アミューあつぎ', POINT(35.442481,139.365727), '1階インフォメーション', '神奈川県厚木市中町2丁目12-15'
       , NULL, NULL, 'http://www.amyu-atsugi.jp/index.html'),
       ( 'ニトリ　厚木店', POINT(35.462673, 139.360349), '', '神奈川県厚木市妻田東3丁目25-39'
       , NULL, NULL, 'https://shop.nitori-net.jp/nitori/spot/detail?code=0000000102'),
       ( 'ダスキン　ヘルスレント　厚木ステーション', POINT(35.494369, 139.317379), '', '神奈川県厚木市上荻野270−1'
       , '046-243-3130', NULL, 'https://healthrent.duskin.jp/station/kanagawa/atsugi.html'),
       ( '小山株式会社　厚木事業所', POINT(35.426908, 139.367013), '', '神奈川県厚木市岡田4丁目5-10'
       , '045-580-2801', NULL, 'http://www.koyama-kk.co.jp/company/office/nursing_atsugi.html'),
       ( '近鉄スマイルライフ　東日本営業部', POINT(35.421117, 139.357062), '', '神奈川県厚木市酒井3028'
       , '046-280-6852', NULL, 'https://www.k-smile.com/hnippon.html'),
       ( '株式会社イノベイション オブ メディカル サービス厚木支社', POINT(35.428575, 139.356568), '', '神奈川県厚木市船子579-1'
       , '046-220-1171', NULL, NULL);


insert into tag (tag_name)
values ('無料'),
       ('1日限定'),
       ('長期貸出対応');


insert into wheelchair_rental_Locations_tag (Location_id, tag_id)
values (3, 3);
