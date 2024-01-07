create Procedure sp_AvgWorkHours
	@sID int
	
	as
	begin
		
		if(exists(select * from STAFF s where s.ID = @sID))
		begin
			
			return (select sum(DATEDIFF(HOUR, w.EntryTime, w.ExitTime)) 
					from STAFF s
						inner join WORK_DAY w on w.StaffID = s.ID
					where s.ID = @sID)

		end
		else
		begin
			return 0
		end

	end