create proc sp_AvgAnnualLeaveOfStaff

as
begin

select s.ID, p.FirstName, p.LastName, avg(DATEDIFF(DAY, a.StartDate, a.EndDate))
from STAFF s
	inner join ANNUAL_LEAVE a on a.StaffID = s.ID
	inner join PERSON p on p.ID = s.PersonID
	group by s.ID, p.FirstName, p.LastName

end