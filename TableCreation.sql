CREATE TABLE PERSON(
    ID int identity(1,1) primary key ,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    Birthdate date NOT NULL,
    PhoneNumber int ,
    IdentityNumber int CHECK(IdentityNumber%2 = 0 AND LOG(IdentityNumber,10)<=11 AND LOG(IdentityNumber,10)>10 )
);

CREATE TABLE GUEST(
    ID int foreign key references PERSON(ID),
    Company varchar(100),
);

CREATE TABLE GUEST_MOVEMENT(
    ID int identity(1,1) primary key,
    EnterDate dateTime DEFAULT(GETDATE()) NOT NULL,
    LeaveDate dateTime ,
    VisitingReason varchar(255),
    WhoToVisit int foreign key references PERSON(ID),
    CardNumber varchar(12)

)

CREATE TABLE GUEST_CARD(
    ID int identity(1,1) primary key,
    CardNumber varchar(12),
    CardName varchar(50),
    CardStatus varchar(12) CHECK(CardStatus IN('Available', 'Busy', 'Lost')) DEFAULT('Available'),
    Issued int foreign key references GUEST_MOVEMENT(ID),
    --Vehicle int foreign key references VEHICLE(ID)
);



Create Table STAFF(
	StaffID int,
	foreign key (StaffID) references PERSON(ID),
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
	ID int identity(1,1),
	primary key (ID),
	Date date default getDate() check(Date <= getDate()),
	EntryTime Time default cast(getDate() as Time),
	ExitTime Time,
	StaffID int
	foreign key (StaffID) references PERSON(ID)
)

Create Table DEPARTMENT(
	DepartmentID int identity(1,1),
	Primary key(DepartmentID),
	DepartmentName nvarchar(500),
	Location nvarchar(500),
	StaffID int,
	foreign key (StaffID) references PERSON(ID),
	ManagerID int,
	foreign key (ManagerID) references PERSON(ID)
)

Create Table ANNUAL_LEAVE(
	ID int primary key,
	staffID int,
	foreign key (staffID) references PERSON(ID),
	Description nvarchar(500) default 'EMPTY',
	StartDate DateTime default getDate(),
	EndDate DateTime ,
	ApprovalStatus nvarchar(15) check(ApprovalStatus in('Denied', 'Approved')) default 'Denied'

)

CREATE TABLE MACHINE (
	ID INT PRIMARY KEY,
	DepartmentId INT REFERENCES DEPARTMENT(DepartmentID),
	Description VARCHAR(255) CHECK (LEN(Description) <= 255),  -- Check constraint for maximum length of Description);
	PurchaseDate DATE,
	SellDate DATE,
	PurchasePrice FLOAT,
	SellPrice FLOAT,
	ServiceTime FLOAT CHECK (ServiceTime >=0), -- Check constraint to ensure ServiceTime is non-negative,
	 
)

CREATE TABLE MALFUNCTION (
    ID INT PRIMARY KEY,
	StaffId INT REFERENCES PERSON(ID),
    MachineId INT REFERENCES MACHINE(ID),
    MalfunctionDefinition VARCHAR(255),
    StartDate DATETime,
    EndDate DATETime,
    FixedBy VARCHAR(100) DEFAULT NULL,
    PerformedProcess VARCHAR(255),
    Status VARCHAR(100) CHECK (Status IN ('Open', 'Closed', 'InProgress')), -- Example check constraint
	CONSTRAINT CHK_DefinitionLength CHECK (LEN(MalfunctionDefinition) <= 255) -- Check constraint for maximum length of Description);
);


CREATE TABLE VEHICLE ( 
	ID INT PRIMARY KEY,
	LicensePlate VARCHAR(100)
)


CREATE TABLE STAFF_MOVEMENT (
	ID INT PRIMARY KEY,
	VehicleID INT REFERENCES VEHICLE(ID),
	StaffId INT REFERENCES PERSON(ID),
	DeparturePlace VARCHAR(255),
	ArrivalPlace VARCHAR(255),
	Description VARCHAR(255),
	Date DATETime,
	CONSTRAINT CHK_DescriptionLength CHECK (LEN(Description) <= 255) -- Check constraint for maximum length of Description);
)
