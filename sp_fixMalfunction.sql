create procedure FixMalfunction

    @MalfunctionID int,
    @EndDate datetime,
    @FixedBy varchar(50),
    @PerformedProcess varchar(250)

as 

begin
    update m
    set m.EndDate = @EndDate,
        m.FixedBy = @FixedBy,
        m.PerformedProcess = @PerformedProcess
    from MALFUNCTION m
    where m.ID = @MalfunctionID
end