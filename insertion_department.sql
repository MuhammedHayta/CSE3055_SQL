Create Table DEPARTMENT(
	DepartmentID int identity(1,1),
	Primary key(DepartmentID),
	DepartmentName nvarchar(500),
	Location nvarchar(500),
	ManagerID int,
	foreign key (ManagerID) references PERSON(ID)
)

CREATE TABLE MACHINE (
	ID INT PRIMARY KEY,
	DepartmentId INT REFERENCES DEPARTMENT(DepartmentID),
	Description VARCHAR(255) CHECK (LEN(Description) <= 255),  -- Check constraint for maximum length of Description);
	PurchaseDate DATE,
	SellDate DATE,
	PurchasePrice FLOAT,
	SellPrice FLOAT,
	ServiceTime FLOAT CHECK (ServiceTime >=0), 	 
)


INSERT INTO DEPARTMENT(DepartmentName, Location, ManagerID)
VALUES('Boyahane','Kestel organize sanayi bölgesi, 1.kat',x),
('Dokuma','Barak faki sanayi bölgesi, 1.kat',x),
('Kalite Kontrol','Kestel organize sanayi bölgesi, 2.kat',x),
('Mamül depo','Kestel organize sanayi bölgesi, 3.kat',x),
('Sevkiyat','Kestel organize sanayi bölgesi, Giriş kat',x),
('Apre','Kestel organize sanayi bölgesi, 1.kat',x),
('Büküm','Barak faki sanayi bölgesi, 3.kat',x),
('İplik depo','Barak faki sanayi bölgesi, 2.kat',x)
('Devere','Barak faki sanayi bölgesi, 1.kat',x)

INSERT INTO MACHINE(DepartmentId, Description, PurchaseDate, SellDate, PurchasePrice, SellPrice, ServiceTime)
VALUES
(1,'JET MAKINA - MGS 1',),
(1,'JET MAKINA - MGS 2',),
(1,'JET MAKINA - FONGS 1',),
(1,'YAŞ AÇMA',),
(1,'KURU AÇMA',),
(1,'YUMUŞATMA',),
(1,'RAM - MONFORCE'),
(1,'RAM - BRUCNER'),
(1,'RAM - DİLMENLER'),
(2,'HAVALI DOKUMA - PICANOL OMNI PLUS'),
(2,'ŞERİTLİ DOKUMA - PICANOL GAMMAX PLUS'),
(2,'KANCASIZ DOKUMA - PICANOL OPTIMAX PLUS'),
(2,'JAKAR - StÄUBLİ'),
(2,'TAHAR - SUPERVEGA'),
(2,'İŞBAĞI - StÄUBLİ'),
(9,'DEVERE - BENINGER'),
(9,'DEVERE - DEVSAN')
(7,'BÜKÜM ÇİN MALI 1'),
(7,'BÜKÜM ÇİN MALI 2'),
(7,'BÜKÜM ÇİN MALI 3'),
(7,'BÜKÜM ÇİN MALI 4'),
(7,'BÜKÜM ÇİN MALI 5'),
(7,'BÜKÜM ÇİN MALI 6'),
(7,'FİKSE - 1'),
(7,'FİKSE - 2'),
(7,'AKTARMA - 1'),
(7,'AKTARMA - 2'),

INSERT INTO GUEST(ID,Company)
VALUES(1,'POLYTEX'),
(2,'TEXLIFE İPLİK'),
(3,'GREEN KİMYASAL'),
(4,'ZARA'),
(5,'AYDINLI PIERRE CARDIN'),
(6,'Z TEX'),
(7,'MAS TEKSTİL'),
(8,'DS DAMAT'),
(9,'DEFACTO'),
(10,'HATEMOĞLU'),
(11,'SARAR'),
(12,'YUMURCAK BEBE'),
(13,'SÜVARİ'),
(14,'CEMSEL'),
(15,'ARMANİ'),
(16,'KAYA TEKSTİL'),
(17,'KARACA'),
(18,'AKNUR TEKSTİL'),
(19,'BERSHKA'),
(20,'UĞUR TEKSTİL'),
(21,'NEA TREND'),
(22,'FABRİCARTE'),
(23,'FAS'),
(24,'ELCORTE'),
(25,'CEMSEL')


