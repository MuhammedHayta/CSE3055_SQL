create procedure GiveParkingSlotToVehicle

    @VehicleID int

as

begin
    if (exists (select * from PARKING_SLOT ps where ps.status = 'Available'))
        begin
            -- get the first available parking slot and set status 'occupied' and set the occupied = @VehicleID
            update TOP(1) ps
            set ps.status = 'Occupied',
                ps.VehicleID = @VehicleID
            from PARKING_SLOT ps
            where ps.status = 'Available'
        end
end