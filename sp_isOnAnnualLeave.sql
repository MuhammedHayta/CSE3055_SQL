create Procedure sp_isPersonOnAnnualLeave
	@pID int
	
	AS
	
	begin

		if(exists(select * 
					from PERSON p 
						inner join ANNUAL_LEAVE a on a.ID = p.ID
					where p.ID = @pID and GETDATE() not between a.StartDate and a.EndDate ))
		begin
			return 1;
		end
		else
		begin
			return 0;
		end

	end;

