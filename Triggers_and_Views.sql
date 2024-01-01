CREATE TRIGGER UpdateTotalSalaryAndWorkDays
ON WORK_DAY 
AFTER INSERT
AS
BEGIN
    UPDATE s
    SET TotalLaborTime = s.TotalLaborTime + DATEDIFF(MINUTE, i.EntryTime, ISNULL(i.ExitTime, i.EntryTime)),
        TotalSalary = s.TotalSalary + (DATEDIFF(MINUTE, i.EntryTime, ISNULL(i.ExitTime, i.EntryTime)) / 60.0) * s.BaseSalary / 60.0
    FROM STAFF s
    INNER JOIN INSERTED i ON s.StaffID = i.StaffID;
END;



CREATE VIEW CurrentlyMalfunctionedMachines
AS
SELECT
    m.ID AS MachineID,
    m.Description AS MachineDescription,
    ma.MalfunctionDefinition,
    ma.StartDate AS MalfunctionStartDate,
    ma.EndDate AS MalfunctionEndDate,
    ma.FixedBy,
    ma.PerformedProcess,
    ma.Status
FROM
    MACHINE m
JOIN
    MALFUNCTION ma ON m.ID = ma.MachineId
WHERE
    ma.Status = 'Open' -- or 'InProgress' depending on your definition of a malfunctioned machine
    AND GETDATE() BETWEEN ma.StartDate AND ISNULL(ma.EndDate, GETDATE());


CREATE VIEW StaffOnAnnualLeave
AS
SELECT
    p.ID AS StaffID,
    p.FirstName,
    p.LastName,
    al.Description AS AnnualLeaveDescription,
    al.StartDate AS LeaveStartDate,
    al.EndDate AS LeaveEndDate,
    al.ApprovalStatus
FROM
    PERSON p
JOIN
    ANNUAL_LEAVE al ON p.ID = al.ID
WHERE
    al.ApprovalStatus = 'Approved'
    AND GETDATE() BETWEEN al.StartDate AND ISNULL(al.EndDate, GETDATE());


CREATE VIEW EmptyParkingSlots
AS
SELECT
    v.ID AS ParkingSlotID,
    v.LicensePlate,
    CASE
        WHEN sm.VehicleID IS NOT NULL THEN 'Occupied'
        ELSE 'Empty'
    END AS ParkingStatus
FROM
    VEHICLE v
LEFT JOIN
    STAFF_MOVEMENT sm ON v.ID = sm.VehicleID
WHERE
    sm.ID IS NULL OR sm.Date < GETDATE();


CREATE VIEW GuestsNotLeft
AS
SELECT
    g.ID AS GuestID,
    g.FirstName,
    g.LastName,
    gm.EnterDate AS ArrivalDate,
    gm.LeaveDate AS ExpectedLeaveDate,
    gm.VisitingReason,
    gm.CardNumber
FROM
    PERSON g
JOIN
    GUEST_MOVEMENT gm ON g.ID = gm.WhoToVisit
WHERE
    gm.LeaveDate IS NULL
    OR gm.LeaveDate >= GETDATE();
