DROP DATABASE IF EXISTS hack_u_db;
CREATE DATABASE hack_u_db;
USE hack_u_db;

CREATE TABLE `map`
(
    `map_id`             INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name`               VARCHAR(32)        NOT NULL, -- 場所の名前
    `location`           GEOMETRY           NOT NULL, -- 緯度経度
    `address_supplement` TEXT               NOT NULL, -- 建物の２階の受付
    `address`            TEXT               NOT NULL, -- 住所
    `phone_number`       VARCHAR(12)  DEFAULT NULL,   -- 電話番号
    `email`              VARCHAR(254) DEFAULT NULL,   -- メールアドレス
    `web_site_url`       TEXT         DEFAULT NULL    -- webサイト
) ENGINE = innodb
  DEFAULT CHARSET = utf8;

create table `tag`
(
    `tag_id`   INT         not null auto_increment primary key,
    `tag_name` varchar(10) not null
) engine = innodb
  default charset = utf8;

CREATE TABLE `map_tag`
(
    `map_id` INT,
    `tag_id` INT,
    FOREIGN KEY (map_id)
        REFERENCES map (map_id)
        ON DELETE SET NULL
        ON UPDATE RESTRICT,
    FOREIGN KEY (tag_id)
        REFERENCES tag (tag_id)
        ON DELETE SET NULL
        ON UPDATE RESTRICT,
    UNIQUE map_tag_id (map_id, tag_id)
) ENGINE = innodb
  DEFAULT CHARSET = utf8;
