create proc sp_AvgAnnualLeaveOfStaff

as
begin

select s.StaffID, p.FirstName, p.LastName, avg(DATEDIFF(DAY, a.StartDate, a.EndDate))
from STAFF s
	inner join ANNUAL_LEAVE a on a.staffID = s.StaffID
	inner join PERSON p on p.ID = s.StaffID
	group by s.StaffID, p.FirstName, p.LastName

end