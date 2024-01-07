create procedure reportMalfunction 
    @StaffID int,
    @MachineID int,
    @StartDate datetime = null,
    @MalfunctionDefinition varchar(250)


as 

begin
	if (@StartDate = NULL)
		begin
			set @StartDate = GETDATE()
		end
    insert into MALFUNCTION (StaffID, MachineID, StartDate, MalfunctionDefinition, Status)
    values (@StaffID, @MachineID, @StartDate, @MalfunctionDefinition, 'Open')
end
