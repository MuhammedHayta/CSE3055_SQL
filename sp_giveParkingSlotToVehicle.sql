create procedure GiveParkingSlotToVehicle

    @VehicleID int

as

begin
    IF @VehicleID IS NOT NULL
    BEGIN
    if (exists (select * from PARKING_SLOT ps where ps.Status = 'Available'))
        begin
            -- get the first available parking slot and set status 'occupied' and set the occupied = @VehicleID
            update TOP(1) ps
            set ps.Status = 'Occupied',
                ps.VehicleID = @VehicleID
            from PARKING_SLOT ps
            where ps.Status = 'Available'
        end
    end
end