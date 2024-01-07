create Procedure sp_AvgWorkHours
	@pID int
	
	as
	begin
		
		if(exists(select * from PERSON p where p.ID = @pID))
		begin
			
			return (select sum(DATEDIFF(HOUR, w.EntryTime, w.ExitTime)) 
					from PERSON p
						inner join WORK_DAY w on w.StaffID = p.ID
					where p.ID = @pID)

		end
		else
		begin
			return 0
		end

	end