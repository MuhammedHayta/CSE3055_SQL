create proc sp_AvgAgeOfStaffWithDifferentPositions

as
begin
	
	select avg(DATEDIFF(YEAR, p.Birthdate, GETDATE())) avgAgeOfMechanics
	from STAFF s
		inner join PERSON p on s.PersonID = p.ID
	where s.MechanicPermission = 1

	union

	select avg(DATEDIFF(YEAR, p.Birthdate, GETDATE())) avgAgeOfUser
	from STAFF s
		inner join PERSON p on s.PersonID = p.ID
	where s.UserPermission= 1

	union

	select avg(DATEDIFF(YEAR, p.Birthdate, GETDATE())) avgAgeOfGuest
	from STAFF s
		inner join PERSON p on s.PersonID = p.ID 
	where s.GuestPermission= 1

end