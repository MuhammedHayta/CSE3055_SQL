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
('İplik depo','Barak faki sanayi bölgesi, 2.kat',)
('Devere','Barak faki sanayi bölgesi, 1.kat',10)

INSERT INTO MACHINE(DepartmentId, Description, PurchaseDate, SellDate, PurchasePrice, SellPrice, ServiceTime)
VALUES
(1,'JET MAKINA - MGS 1',  '22.11.2013',null,30000,null,0),
(1,'JET MAKINA - MGS 2','22.11.2013',null,30000,null,0),
(1,'JET MAKINA - FONGS 1','22.11.2013',null,30000,null,0),
(1,'YAŞ AÇMA','01.12.2013',null,45000,null,0),
(1,'KURU AÇMA','01.11.2013',null,25000,null,0),
(1,'YUMUŞATMA','03.04.2012',null,30000,null,0),
(1,'RAM - MONFORCE','11.11.2015',null,90000,null,0),
(1,'RAM - BRUCNER','10.11.2015',null,80000,null,0),
(1,'RAM - DİLMENLER','17.10.2012',null,50000,null,0),
(2,'HAVALI DOKUMA - PICANOL OMNI PLUS','03.02.2016',null,35000,null,0),
(2,'ŞERİTLİ DOKUMA - PICANOL GAMMAX PLUS','01.10.2016',null,33000,null,0),
(2,'KANCASIZ DOKUMA - PICANOL OPTIMAX PLUS','29.11.2017',null,98000,null,0),
(2,'JAKAR - StÄUBLİ','22.07.2015',null,45000,null,0),
(2,'TAHAR - SUPERVEGA','21.10.2015',null,50000,null,0),
(2,'İŞBAĞI - StÄUBLİ','10.10.2015',null,75000,null,0),
(9,'DEVERE - BENINGER','04.10.2015',null,75000,null,0),
(9,'DEVERE - DEVSAN','10.11.2012',null,60000,null,0)
(7,'BÜKÜM ÇİN MALI 1','21.10.2016',null,29000,null,0),
(7,'BÜKÜM ÇİN MALI 2','21.10.2016',null,29000,null,0),
(7,'BÜKÜM ÇİN MALI 3','21.10.2016',null,29000,null,0),
(7,'BÜKÜM ÇİN MALI 4','21.10.2016',null,29000,null,0),
(7,'BÜKÜM ÇİN MALI 5','21.10.2016',null,29000,null,0),
(7,'BÜKÜM ÇİN MALI 6','21.10.2016',null,29000,null,0),
(7,'FİKSE - 1','21.10.2016',null,30000,null,0),
(7,'FİKSE - 2','21.10.2016',null,30000,null,0),
(7,'AKTARMA - 1','21.10.2016',null,19000,null,0),
(7,'AKTARMA - 2','21.10.2016',null,19000,null,0),

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


CREATE TABLE VEHICLE ( 
	ID INT identity(1,1) PRIMARY KEY,
	LicensePlate VARCHAR(100)
)

INSERT INTO VEHICLE(LicensePlate)
VALUES
('16 ER 031'),
('16 ER 228'),
('16 ER 320'),
('16 ER 489'),
('16 ER 523'),
('16 ER 589'),
('16 AER 25'),
('16 ER 146'),
('16 ER 032'),
('16 AER 005'),
('16 ER 040'),
('16 ER 471'),
('16 ER 225'),
('16 ER 694'),
('16 ER 210'),
('16 ER 656'),
('16 ER 164'),
('16 ER 691'),
('16 ER 834'),
('16 ER 238'),
('16 ER 559'),
('16 ER 815'),
('16 AGN 34'),
('16 AER 99'),
('16 ER 438'),
('16 ER 776'),
('16 ER 229'),
('16 ER 827'),
('16 ER 071'),
('16 ER 612'),
('34 ER 5616'),
('16 ER 140'),
('16 EER 41'),
('16 AER 09'),
('16 EFE 56'),
('16 ER 064'),
('16 ER 583'),
('16 AER 088'),
('16 FA 600'),
('16 HER 20'),
('16 ER 876'),
('16 LYH 17'),
('16 LTU 32'),
('16 EER 12'),
('16 AOD 866'),
('34 ERT 18'),
('16 ANF 64')