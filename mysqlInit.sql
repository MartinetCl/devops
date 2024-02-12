drop schema if exists `interator-db`;
create schema if not exists `interator-db`;
use `interator-db`;

drop table if exists interator;

create table interator (
    state int DEFAULT 0
);

insert into interator (state) values (0);
insert into interator (state) values (1);
insert into interator (state) values (2);
insert into interator (state) values (3);