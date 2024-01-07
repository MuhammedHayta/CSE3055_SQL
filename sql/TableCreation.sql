CREATE TABLE PERSON(
    ID int identity(1,1) primary key ,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    Birthdate date NOT NULL,
    PhoneNumber nvarchar(13) unique,
    IdentityNumber nvarchar(11) unique
);

CREATE TABLE GUEST(
	ID int identity(1,1) primary key,
    PersonID int foreign key references PERSON(ID),
    Company varchar(100),
);

CREATE TABLE VEHICLE ( 
	ID INT identity(1,1) PRIMARY KEY,
	LicensePlate VARCHAR(100)
)

CREATE TABLE GUEST_MOVEMENT(
    ID int identity(1,1) primary key,
	GuestID int foreign key references GUEST(ID),
	VehicleID int foreign key references VEHICLE(ID),
    EnterDate dateTime DEFAULT(GETDATE()) NOT NULL,
    LeaveDate dateTime ,
    VisitingReason varchar(255),
    WhoToVisit int foreign key references STAFF(ID),
    CardNumber varchar(12)
)

CREATE TABLE GUEST_CARD(
    ID int identity(1,1) primary key,
    GuestMovementID int foreign key references GUEST_MOVEMENT(ID),
    CardNumber varchar(12) unique NOT NULL,
    CardName varchar(50),
    CardStatus varchar(12) CHECK(CardStatus IN('Available', 'Busy', 'Lost')) DEFAULT('Available')
);

CREATE INDEX CardIndex ON GUEST_CARD(CardNumber);
CREATE INDEX IdentityNumberIndex ON PERSON(IdentityNumber);

Create Table STAFF(
	ID int primary key identity(1,1),
	PersonID int foreign key references PERSON(ID),
	BaseSalary float default 106.26,
	Password nvarchar(50) check(len(Password) > 0),
	UserPermission binary not null,
	MechanicPermission binary not null,
	GuestPermission binary not null,
	EmploymentDate date default getDate() check(EmploymentDate <= getDate()),
	TotalLaborTime int default 0,
	TotalSalary float default 17002.12
)

Create Table WORK_DAY(
	ID int primary key identity(1,1),
	StaffID int foreign key references STAFF(ID),
	Date date default getDate() check(Date <= getDate()),
	EntryTime Time default cast(getDate() as Time),
	ExitTime Time	
)

Create Table DEPARTMENT(
	ID int identity(1,1) primary key,
	DepartmentName nvarchar(500),
	Location nvarchar(500),
	ManagerID int foreign key references STAFF(ID),
)

Create Table ANNUAL_LEAVE(
	ID int identity(1,1) primary key,
	StaffID int foreign key references STAFF(ID),
	Description nvarchar(500) default 'EMPTY',
	StartDate DateTime default getDate(),
	EndDate DateTime ,
	ApprovalStatus nvarchar(15) check(ApprovalStatus in('Denied', 'Pending','Approved')) default 'Pending'

)

CREATE TABLE MACHINE (
	ID INT identity(1,1) PRIMARY KEY,
	DepartmentID INT REFERENCES DEPARTMENT(ID),
	Description VARCHAR(255) CHECK (LEN(Description) <= 255),  -- Check constraint for maximum length of Description);
	PurchaseDate DATE,
	SellDate DATE,
	PurchasePrice FLOAT,
	SellPrice FLOAT,
	ServiceTime FLOAT CHECK (ServiceTime >=0), -- Check constraint to ensure ServiceTime is non-negative,
	 
)

CREATE TABLE MALFUNCTION (
    ID INT identity(1,1) PRIMARY KEY,
	StaffID INT REFERENCES STAFF(ID),
    MachineID INT REFERENCES MACHINE(ID),
    MalfunctionDefinition VARCHAR(255),
    StartDate DATETime,
    EndDate DATETime,
    FixedBy VARCHAR(100) DEFAULT NULL,
    PerformedProcess VARCHAR(255),
    Status VARCHAR(100) CHECK (Status IN ('Open', 'Closed', 'InProgress')), -- Example check constraint
	CONSTRAINT CHK_DefinitionLength CHECK (LEN(MalfunctionDefinition) <= 255) -- Check constraint for maximum length of Description);
);

CREATE TABLE STAFF_MOVEMENT (
	ID INT identity(1,1) PRIMARY KEY,
	VehicleID INT REFERENCES VEHICLE(ID),
	StaffID INT REFERENCES STAFF(ID),
	DeparturePlace VARCHAR(255),
	ArrivalPlace VARCHAR(255),
	Description VARCHAR(255),
	Date DATETime,
	CONSTRAINT CHK_DescriptionLength CHECK (LEN(Description) <= 255) -- Check constraint for maximum length of Description);
)

CREATE TABLE PARKING_SLOT(
	ID INT identity(1,1) PRIMARY KEY,
	VehicleID INT REFERENCES VEHICLE(ID),
	Status VARCHAR(100) DEFAULT 'Available', -- Default constraint to set Status to 'Available' if not provided
	Category VARCHAR(100),
	CHECK (Status IN ('Available', 'Occupied', 'Reserved')) -- Check constraint for valid Status values
);