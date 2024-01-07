create proc sp_AvgAgeOfStaffWithDifferentPositions

as
begin
	
	select p.ID, p.FirstName, p.LastName, avg(DATEDIFF(YEAR, p.Birthdate, GETDATE())) avgAgeOfMechanics
	from STAFF s
		inner join PERSON p on p.ID = s.StaffID
	where s.MechanicPermission = 1
	group by p.ID, p.FirstName, p.LastName

	union

	select p.ID, p.FirstName, p.LastName, avg(DATEDIFF(YEAR, p.Birthdate, GETDATE())) avgAgeOfUser
	from STAFF s
		inner join PERSON p on p.ID = s.StaffID
	where s.UserPermission= 1
	group by p.ID, p.FirstName, p.LastName

	union

	select p.ID, p.FirstName, p.LastName, avg(DATEDIFF(YEAR, p.Birthdate, GETDATE())) avgAgeOfGuest
	from STAFF s
		inner join PERSON p on p.ID = s.StaffID
	where s.GuestPermission= 1
	group by p.ID, p.FirstName, p.LastName

end