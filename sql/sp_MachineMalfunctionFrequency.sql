create proc sp_MachineMalfunctionFrequency
--@machineID int

as
begin
	
	select m.ID, numOfMf/DATEDIFF(YEAR, m.PurchaseDate, GETDATE())
	from MACHINE m
		inner join (select m1.ID, COUNT(mf.ID) numOfMf
					from MACHINE m1
						inner join MALFUNCTION mf on mf.MachineId = m1.ID
					group by m1.ID) n on n.ID = m.ID
	where m.SellDate is null

	union

	select m.ID, numOfMf/DATEDIFF(YEAR, m.PurchaseDate, m.SellDate)
	from MACHINE m
		inner join (select m1.ID, COUNT(mf.ID) numOfMf
					from MACHINE m1
						inner join MALFUNCTION mf on mf.MachineId = m1.ID
					group by m1.ID) n on n.ID = m.ID
	where m.SellDate is not null

end
