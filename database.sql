-- 1.create owners table
CREATE TABLE owners(
id serial primary key,
  first_name varchar(80),
  last_name varchar (80)
);

--2. create pets table
CREATE TABLE pets(
id serial primary key,
name varchar(80),
breed varchar (80),
color varchar (80),
owner_id integer references owners);

--3. create visits table
CREATE TABLE visits(
id serial primary key,
check_in_date date,
check_out_date date,
pets_id integer references pets);
