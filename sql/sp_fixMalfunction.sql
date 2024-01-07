create procedure FixMalfunction
    @MalfunctionID int,
    @EndDate datetime = null,
    @FixedBy varchar(50),
    @PerformedProcess varchar(250)

as 

begin

    if (@EndDate = NULL)
        begin
            set @EndDate = GETDATE()
        end

    update m
    set m.EndDate = @EndDate,
        m.FixedBy = @FixedBy,
        m.PerformedProcess = @PerformedProcess
    from MALFUNCTION m
    where m.ID = @MalfunctionID
end


exec FixMalfunction 1, '2019-01-01', 'John', 'Fixed'