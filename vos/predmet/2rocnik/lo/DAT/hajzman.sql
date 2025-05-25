USE IF2_hajzmand;



-- 1. View s informacemi o albech a jejich interpretech
CREATE VIEW vw_AlbumArtists AS
SELECT a.Title AS AlbumTitle, ar.Name AS ArtistName
FROM sp.tbAlbum a
JOIN sp.tbArtistAlbum aa ON a.AlbumID = aa.AlbumID
JOIN sp.tbArtist ar ON ar.ArtistID = aa.ArtistID;

-- 2. View s písničkami a jejich délkou (nad 3 minuty)
CREATE VIEW vw_LongSongs AS
SELECT Title, Duration
FROM sp.tbSong
WHERE Duration > '00:03:00';

-- 3. View s vydavateli a jejich alby
CREATE VIEW vw_PublisherAlbums AS
SELECT p.Name AS PublisherName, a.Title AS AlbumTitle
FROM sp.tbPublisher p
JOIN sp.tbAlbum a ON a.AlbumID = p.AlbumID;


-- Nastavení ceny všem albům na 199
UPDATE sp.tbAlbum
SET Price = 199;

-- Změna žánru na 'Rock' pro alba s více než 10 skladbami
UPDATE sp.tbAlbum
SET Genre = 'Rock'
WHERE TrackAmount > 10;


-- Smazat skladby kratší než 1 minuta
DELETE FROM sp.tbSong
WHERE Duration < '00:01:00';


ALTER TABLE sp.tbArtist
ADD Website varchar(100);

ALTER TABLE sp.tbAlbum
ALTER COLUMN Duration varchar(10);

EXEC sp_rename 'tbPublisher.Location', 'Headquarters', 'COLUMN';


ALTER TABLE sp.tbAlbum
ADD CONSTRAINT chk_TrackAmount CHECK (TrackAmount BETWEEN 1 AND 50);


-- Vzestupně podle názvu alba
SELECT * FROM sp.tbAlbum
ORDER BY Title ASC;

-- Sestupně podle ceny
SELECT * FROM sp.tbAlbum
ORDER BY Price DESC;

SELECT Title, Genre FROM sp.tbAlbum
WHERE Genre = 'Rock'
ORDER BY Title;


SELECT DISTINCT Genre FROM sp.tbAlbum;


-- 1. Podle žánru
SELECT * FROM sp.tbAlbum WHERE Genre = 'Hard Rock';

-- 2. Podle ceny
SELECT * FROM sp.tbAlbum WHERE Price > 200;

-- 3. Podle data založení
SELECT * FROM sp.tbArtist WHERE Founded < '2000-01-01';

-- 4. LIKE
SELECT * FROM sp.tbArtist WHERE Name LIKE 'The%';

-- 5. NOT NULL
SELECT * FROM sp.tbArtist WHERE Tags IS NOT NULL;

-- 6. IN
SELECT * FROM sp.tbAlbum WHERE Genre IN ('Rock', 'Metal');

-- 7. BETWEEN
SELECT * FROM sp.tbAlbum WHERE Price BETWEEN 100 AND 300;

-- 8. NOT
SELECT * FROM sp.tbAlbum WHERE NOT Genre = 'Rock';


SELECT Genre FROM sp.tbAlbum
GROUP BY Genre;

SELECT Genre, COUNT(*) AS AlbumCount
FROM sp.tbAlbum
GROUP BY Genre;


-- Počet alb
SELECT COUNT(*) FROM sp.tbAlbum;

-- Průměrná cena
SELECT AVG(Price) FROM sp.tbAlbum;

-- Nejdelší název skladby
SELECT MAX(LEN(Title)) FROM sp.tbSong;


SELECT a.Title, ar.Name
FROM sp.tbAlbum a
INNER JOIN sp.tbArtistAlbum aa ON a.AlbumID = aa.AlbumID
INNER JOIN sp.tbArtist ar ON ar.ArtistID = aa.ArtistID;

SELECT a.Title, p.Name AS Publisher
FROM sp.tbAlbum a
LEFT JOIN sp.tbPublisher p ON a.AlbumID = p.AlbumID;

SELECT a.Title, p.Name AS Publisher
FROM sp.tbAlbum a
RIGHT JOIN sp.tbPublisher p ON a.AlbumID = p.AlbumID;

SELECT a1.Name AS Artist1, a2.Name AS Artist2, a1.Country
FROM sp.tbArtist a1
JOIN sp.tbArtist a2 ON a1.Country = a2.Country AND a1.ArtistID < a2.ArtistID;
