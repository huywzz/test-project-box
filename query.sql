-- select users."id",users."username", keys."publicKey", keys."privateKey", keys."refreshToken",keys."id" as "keyId"
-- from users
-- INNER join keys
-- on users."id"=keys."userId"
-- where users.id=6 and keys."isOldRF"=false
-- select keys."userId" from keys
select * from keys
