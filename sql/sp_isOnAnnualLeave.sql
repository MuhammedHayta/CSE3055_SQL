create Procedure sp_isPersonOnAnnualLeave
	@sID int
	
	AS
	
	begin

		if(exists(select * 
					from STAFF s 
						inner join ANNUAL_LEAVE a on a.StaffID = s.ID
					where s.ID = @sID and GETDATE() not between a.StartDate and a.EndDate ))
		begin
			return 1;
		end
		else
		begin
			return 0;
		end

	end;

