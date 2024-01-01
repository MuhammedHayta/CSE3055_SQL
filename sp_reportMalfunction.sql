create procedure reportMalfunction 
    @MachineID int,
    @StartDate datetime = null,
    @MalfunctionDefinition varchar(250)


as 

begin
	if (@StartDate = NULL)
		begin
			set @StartDate = GETDATE()
		end
    insert into MALFUNCTION (MachineID, StartDate, MalfunctionDefinition, Status)
    values (@MachineID, @StartDate, @MalfunctionDefinition, 'Open')
end
