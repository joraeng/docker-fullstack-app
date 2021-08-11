DROP DATABASE IF EXISTS myapp;
-- 이미 이 DB가 있다면 드랍을 시킨다 (다시 만들게)

CREATE DATABASE myapp;
USE myapp;

CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
);